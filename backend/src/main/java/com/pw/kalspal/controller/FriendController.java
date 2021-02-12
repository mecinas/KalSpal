package com.pw.kalspal.controller;

import com.pw.kalspal.entity.User;
import com.pw.kalspal.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/friend")
public class FriendController {

    private final UserRepository userRepository;

    public FriendController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllFriends(Authentication authentication) {
        String userId = authentication.getName();
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        return ResponseEntity.ok(user.getFriends());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFriend(@PathVariable String id, Authentication authentication) {
        String userId = authentication.getName();
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        User friend = userRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Friend ID not found."));

        user.getFriends().remove(friend);
        friend.getFriends().remove(user);
        userRepository.save(user);
        return ResponseEntity.noContent().build();
    }
}
