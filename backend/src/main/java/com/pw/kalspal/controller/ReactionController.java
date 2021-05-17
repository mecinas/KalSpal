package com.pw.kalspal.controller;

import com.pw.kalspal.entity.Reaction;
import com.pw.kalspal.entity.User;
import com.pw.kalspal.entity.Workout;
import com.pw.kalspal.repository.UserRepository;
import com.pw.kalspal.repository.WorkoutRepository;
import com.pw.kalspal.util.AuthID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workout")
public class ReactionController {

    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;

    public ReactionController(UserRepository userRepository, WorkoutRepository workoutRepository) {
        this.userRepository = userRepository;
        this.workoutRepository = workoutRepository;
    }

    @PostMapping("/{id}/reactions")
    public ResponseEntity<?> postReaction(Authentication authentication, @PathVariable("id") String id) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));

        Workout workout = workoutRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workout id not found: " + id));

        List<Reaction> reactions = workout.getReactions();
        Optional<Reaction> reaction = reactions
                .stream()
                .filter((r) -> user.equals(r.getUser()))
                .findAny();

        if (reaction.isPresent()) {
            reactions.remove(reaction.get());
            reaction.get().setUser(null);
            reaction.get().setWorkout(null);
            workoutRepository.save(workout);
            return ResponseEntity.status(HttpStatus.CREATED).body(Boolean.FALSE);
        } else {
            reactions.add(new Reaction(user, workout));
            workoutRepository.save(workout);
            return ResponseEntity.status(HttpStatus.CREATED).body(Boolean.TRUE);
        }
    }

    @GetMapping("/{id}/reactions")
    public ResponseEntity<?> getComments(Authentication authentication, @PathVariable("id") String id) {
        Workout workout = workoutRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workout id not found: " + id));
        return ResponseEntity.ok(workout.getReactions());
    }
}
