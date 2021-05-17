package com.pw.kalspal.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.pw.kalspal.entity.FriendInvitation;
import com.pw.kalspal.entity.User;
import com.pw.kalspal.payload.request.RespondToInvitationRequest;
import com.pw.kalspal.repository.FriendInvitationRepository;
import com.pw.kalspal.repository.UserRepository;
import com.pw.kalspal.util.AuthID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/friend/invitation")
public class FriendInvitationController {

    private final UserRepository userRepository;
    private final FriendInvitationRepository friendInvitationRepository;

    public FriendInvitationController(UserRepository userRepository, FriendInvitationRepository friendInvitationRepository) {
        this.userRepository = userRepository;
        this.friendInvitationRepository = friendInvitationRepository;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendInvitation(@RequestBody JsonNode id, Authentication authentication) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        User userInvited = userRepository.findById(id.get("user_id").textValue()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot invite. Given id does not belong to any user."));
        if (user.getInvitationsSent().stream().anyMatch(friendInvitation -> friendInvitation.getInvited().equals(userInvited))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User has already been invited.");
        }
        FriendInvitation friendInvitation = new FriendInvitation(user, userInvited);
        friendInvitationRepository.save(friendInvitation);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/send")
    public ResponseEntity<?> getSentInvitations(Authentication authentication) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        return ResponseEntity.ok(user.getInvitationsSent());
    }

    @GetMapping("/received")
    public ResponseEntity<?> getReceivedInvitations(Authentication authentication) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        return ResponseEntity.ok(user.getInvitationsReceived());
    }

    @PostMapping("/respond")
    public ResponseEntity<?> respondToInvitation(@RequestBody @Valid RespondToInvitationRequest request, Authentication authentication) {
        String userId = AuthID.getID(authentication);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        FriendInvitation invitation = user.getInvitationsReceived().stream()
                .filter(friendInvitation -> friendInvitation.getId().equals(request.getInvitation_id()))
                .findAny().orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invitation ID not found"));
        switch (request.getAction()) {
            case "accept":
                user.getFriends().add(invitation.getInvitationAuthor());
                invitation.getInvitationAuthor().getFriends().add(user);
                user.getInvitationsReceived().remove(invitation);
                userRepository.save(user);
                break;
            case "reject":
                user.getInvitationsReceived().remove(invitation);
                userRepository.save(user);
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action");
        }
        return ResponseEntity.ok().build();
    }
}
