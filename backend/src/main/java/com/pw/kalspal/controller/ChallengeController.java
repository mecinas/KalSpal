package com.pw.kalspal.controller;

import com.pw.kalspal.entity.Challenge;
import com.pw.kalspal.entity.User;
import com.pw.kalspal.payload.request.ChallengeRequest;
import com.pw.kalspal.repository.ChallengeRepository;
import com.pw.kalspal.repository.UserRepository;
import com.pw.kalspal.util.AuthID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;

    public ChallengeController(UserRepository userRepository, ChallengeRepository challengeRepository) {
        this.userRepository = userRepository;
        this.challengeRepository = challengeRepository;
    }

    @PostMapping("/")
    public ResponseEntity<?> inviteToChallenge(@RequestBody ChallengeRequest challengeRequest, Authentication authentication) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        User userInvited = userRepository.findById(challengeRequest.getInvited()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot invite. Given id does not belong to any user."));
        Challenge challenge = new Challenge(userInvited, user, challengeRequest.getText());
        return ResponseEntity.status(HttpStatus.CREATED).body(challengeRepository.save(challenge));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChallenge(Authentication authentication, @PathVariable("id") String id) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        Challenge challenge = challengeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Challenge not found"));
        if (!challenge.getInvited().equals(user) && !challenge.getInvitationAuthor().equals(user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not allowed to delete this challenge");
        }
        challengeRepository.delete(challenge);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/sent")
    public ResponseEntity<?> getChallengesSent(Authentication authentication){
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        return ResponseEntity.ok(user.getChallengesSent());
    }

    @GetMapping("/received")
    public ResponseEntity<?> getChallengesReceived(Authentication authentication){
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        return ResponseEntity.ok(user.getChallengesReceived());
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllChallenges(Authentication authentication){
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        return ResponseEntity.ok(challengeRepository.findByInvitationAuthorOrInvited(user, user));
    }
}
