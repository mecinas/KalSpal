package com.pw.kalspal.controller;

import com.pw.kalspal.entity.User;
import com.pw.kalspal.payload.request.CreateUserRequest;
import com.pw.kalspal.payload.response.MessageResponse;
import com.pw.kalspal.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAuthenticatedUser(Authentication authentication) {
        String userId = authentication.getName();
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName());
        }
        return ResponseEntity.ok(userRepository.findById(userId));
    }

    @PostMapping("/")
    public ResponseEntity<?> createNewUser(@RequestBody CreateUserRequest request, Authentication authentication) {
        String userId = authentication.getName();
        if (userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Auth0 ID exists in database");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email exists in database");
        }
        User user = new User(userId, request.getFirstName(), request.getLastName(), request.getEmail(), request.getBirthDate());
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(user));
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteUser(Authentication authentication) {
        String userId = authentication.getName();
        userRepository.deleteById(userId);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }

    @GetMapping("/check/registration")
    public ResponseEntity<?> checkRegistration(Authentication authentication) {
        String userId = authentication.getName();
        if (userRepository.existsById(userId)) {
            return ResponseEntity.ok(new MessageResponse("Registered"));
        }
        return ResponseEntity.ok(new MessageResponse("Not registered"));
    }
}
