package com.pw.kalspal.controller;

import com.pw.kalspal.entity.User;
import com.pw.kalspal.payload.request.CreateUserRequest;
import com.pw.kalspal.payload.request.PatchUserRequest;
import com.pw.kalspal.payload.response.MessageResponse;
import com.pw.kalspal.payload.response.WorkoutWithReactionInfoResponse;
import com.pw.kalspal.repository.UserRepository;
import com.pw.kalspal.service.UserService;
import com.pw.kalspal.util.AuthID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAuthenticatedUser(Authentication authentication) {
        String userId = AuthID.getID(authentication);
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName());
        }
        return ResponseEntity.ok(userRepository.findById(userId));
    }

    @PostMapping("/")
    public ResponseEntity<?> createNewUser(@RequestBody CreateUserRequest request, Authentication authentication) {
        String userId = AuthID.getID(authentication);
        if (userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Auth0 ID exists in database");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email exists in database");
        }
        User user = new User(userId, request.getFirstName(), request.getLastName(), request.getEmail(), request.getBirthDate());
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(user));
    }

    @PatchMapping("/")
    public ResponseEntity<?> patchUser(@RequestBody PatchUserRequest request, Authentication authentication) {
        String userId = AuthID.getID(authentication);
        userService.partialUpdate(userId, request);
        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteUser(Authentication authentication) {
        String userId = AuthID.getID(authentication);
        userRepository.deleteById(userId);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }

    @GetMapping("/check/registration")
    public ResponseEntity<?> checkRegistration(Authentication authentication) {
        String userId = AuthID.getID(authentication);
        if (userRepository.existsById(userId)) {
            return ResponseEntity.ok(new MessageResponse("Registered"));
        }
        return ResponseEntity.ok(new MessageResponse("Not registered"));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(Authentication authentication) {
        return ResponseEntity.ok(
                userRepository.findAll());
    }

    @GetMapping("/find/{name}")
    public ResponseEntity<?> findUsers(Authentication authentication, @PathVariable String name) {
        return ResponseEntity.ok(
                userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name));
    }

    @GetMapping("/{id}/friends")
    public ResponseEntity<?> getFriends(Authentication authentication, @PathVariable String id) {
        return ResponseEntity.ok(
                userRepository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"))
                        .getFriends());
    }

    @GetMapping("/{id}/workouts")
    public ResponseEntity<?> getWorkouts(Authentication authentication, @PathVariable String id) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));

        List<WorkoutWithReactionInfoResponse> response = userRepository.findById(id)
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
}
