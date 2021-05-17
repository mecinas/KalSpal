package com.pw.kalspal.controller;

import com.pw.kalspal.entity.Comment;
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

@RestController
@RequestMapping("/api/workout")
public class CommentController {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    public CommentController(WorkoutRepository workoutRepository, UserRepository userRepository) {
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }


    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addComment(Authentication authentication, @PathVariable("id") String id, @RequestBody Comment comment) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));

        Workout workout = workoutRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workout id not found: " + id));
        comment.setUser(user);
        comment.setWorkout(workout);
        workout.getComments().add(comment);
        workoutRepository.save(workout);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getComments(Authentication authentication, @PathVariable("id") String id) {
        Workout workout = workoutRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workout id not found: " + id));
        return ResponseEntity.ok(workout.getComments());
    }

    @DeleteMapping("/{id}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(Authentication authentication, @PathVariable("id") String id, @PathVariable("commentId") String commentId) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        Workout workout = workoutRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workout id not found: " + id));
        Comment comment = workout
                .getComments()
                .stream()
                .filter((c) -> c.getId().equals(commentId))
                .findAny()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment id not found: " + commentId));

        if (!comment.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Given comment does not belong to authenticated user");
        }
        workout.getComments().remove(comment);
        workoutRepository.save(workout);
        return ResponseEntity.noContent().build();
    }
}
