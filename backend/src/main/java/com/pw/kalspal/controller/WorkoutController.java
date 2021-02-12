package com.pw.kalspal.controller;

import com.pw.kalspal.entity.User;
import com.pw.kalspal.entity.Workout;
import com.pw.kalspal.payload.request.CreateWorkoutRequest;
import com.pw.kalspal.repository.UserRepository;
import com.pw.kalspal.repository.WorkoutRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/workout")
public class WorkoutController {

    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;

    public WorkoutController(UserRepository userRepository, WorkoutRepository workoutRepository) {
        this.userRepository = userRepository;
        this.workoutRepository = workoutRepository;
    }

    @PostMapping("/")
    public ResponseEntity<?> createNewWorkout(@RequestBody CreateWorkoutRequest request, Authentication authentication) {
        String userId = authentication.getName();
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        Workout workout = new Workout(user, request.getWorkout());
        workoutRepository.save(workout);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/")
    public ResponseEntity<?> getAuthenticatedUserWorkouts(Authentication authentication) {
        String userId = authentication.getName();
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        return ResponseEntity.ok(user.getWorkouts());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkout(Authentication authentication, @PathVariable("id") String id) {
        String userId = authentication.getName();
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
}
