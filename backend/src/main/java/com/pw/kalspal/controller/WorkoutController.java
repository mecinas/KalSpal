package com.pw.kalspal.controller;

import com.pw.kalspal.entity.User;
import com.pw.kalspal.entity.Workout;
import com.pw.kalspal.payload.response.WorkoutWithReactionInfoResponse;
import com.pw.kalspal.repository.UserRepository;
import com.pw.kalspal.repository.WorkoutRepository;
import com.pw.kalspal.service.WorkoutService;
import com.pw.kalspal.util.AuthID;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workout")
public class WorkoutController {

    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;

    public WorkoutController(UserRepository userRepository, WorkoutRepository workoutRepository) {
        this.userRepository = userRepository;
        this.workoutRepository = workoutRepository;
    }

    @Autowired
    WorkoutService workoutService;

    @PostMapping("/")
    public ResponseEntity<?> createNewWorkout(@RequestBody Workout workout, Authentication authentication) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));

        String fileDownloadUri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/workout/gpx/")
                .path(workout.getId())
                .toUriString() + ".gpx";

        workoutService.calculateWorkoutStats(workout);
        workout.setGpxUrl(fileDownloadUri);
        workout.setUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(workoutRepository.save(workout));
    }

    @GetMapping("/")
    public ResponseEntity<?> getAuthenticatedUserWorkouts(Authentication authentication) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));

        List<WorkoutWithReactionInfoResponse> response = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"))
                .getWorkouts()
                .stream()
                .map(WorkoutWithReactionInfoResponse::new).collect(Collectors.toList());

        response.forEach(w -> {
            w.setReaction(w.getWorkout().getReactions().stream().anyMatch(r -> user.equals(w.getWorkout().getUser())));
            w.setReactionsNumber(w.getWorkout().getReactions().size());
        });
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkout(Authentication authentication, @PathVariable("id") String id) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        Workout workout = workoutRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Workout not found"));
        if (!workout.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Given workout does not belong to authenticated user");
        }
        workoutRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/gpx/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public void getGpx(Authentication authentication, @PathVariable("id") String id, HttpServletResponse response) throws IOException {
        Workout workout = workoutRepository.findById(id.substring(0, id.length() - 4)).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "GPX not found"));
        response.getOutputStream().write(workout.getGpx().getBytes());
        response.getOutputStream().close();
    }

    // dev only
    @PostMapping("/dev/all_workouts")
    public ResponseEntity<?> dev_all_workouts() {
        List<Workout> workouts = workoutRepository.findAll();
        workouts.forEach(x -> {
            workoutService.calculateWorkoutStats(x);
            workoutRepository.save(x);
        });
        return ResponseEntity.status(HttpStatus.OK).body(workouts);
    }

}
