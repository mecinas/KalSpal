package com.pw.kalspal.controller;

import com.pw.kalspal.entity.User;
import com.pw.kalspal.repository.UserRepository;
import com.pw.kalspal.util.AuthID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final UserRepository userRepository;

    public NotificationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllNotifications(Authentication authentication){
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        List<Object> list = new ArrayList<>();
        list.addAll(user.getInvitationsReceived());
        list.addAll(user.getChallengesReceived());
        return ResponseEntity.ok(list);
    }
}
