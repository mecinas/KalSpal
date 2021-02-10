package com.pw.kalspal.controller;

import com.pw.kalspal.entity.Avatar;
import com.pw.kalspal.entity.User;
import com.pw.kalspal.entity.Workout;
import com.pw.kalspal.payload.response.MessageResponse;
import com.pw.kalspal.payload.response.ResponseFile;
import com.pw.kalspal.repository.AvatarRepository;
import com.pw.kalspal.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/avatar")
public class AvatarController {

    private final AvatarRepository avatarRepository;
    private final UserRepository userRepository;

    public AvatarController(AvatarRepository avatarRepository, UserRepository userRepository) {
        this.avatarRepository = avatarRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/")
    public ResponseEntity<?> uploadAvatar(@RequestParam("file") MultipartFile file, Authentication authentication) {
        String userId = authentication.getName();
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        if(user.getAvatar() != null){
            Avatar avatar = user.getAvatar();
            user.setAvatar(null);
            user.setAvatarURL(null);
            userRepository.save(user);
            avatarRepository.delete(avatar);
        }
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Avatar avatar = new Avatar(fileName, file.getContentType(), file.getBytes());
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/avatar/")
                    .path(avatar.getId())
                    .toUriString();
            user.setAvatar(avatar);
            user.setAvatarURL(fileDownloadUri);
            avatar.setUser(user);
            userRepository.save(user);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            String message = "Could not upload the file: " + e.toString();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse((message)));
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<ResponseFile>> getAllAvatars() {
        List<ResponseFile> files = avatarRepository.findAll().stream().map(avatar -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/avatar/")
                    .path(avatar.getId())
                    .toUriString();

            return new ResponseFile(
                    avatar.getName(),
                    fileDownloadUri,
                    avatar.getType(),
                    avatar.getData().length);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping(value = "/{id}")
    public void getAvatar(@PathVariable String id, HttpServletResponse response) throws IOException {
        Avatar avatar = avatarRepository.findById(id).orElseThrow();
        response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
        response.getOutputStream().write(avatar.getData());
        response.getOutputStream().close();
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteAvatar(Authentication authentication){
        String userId = authentication.getName();
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User authenticated, but not found in database. ID: " + authentication.getName()));
        Avatar avatar = user.getAvatar();
        user.setAvatar(null);
        user.setAvatarURL(null);
        userRepository.save(user);
        avatarRepository.delete(avatar);
        return ResponseEntity.noContent().build();
    }
}
