package com.pw.kalspal.service;

import com.pw.kalspal.entity.User;
import com.pw.kalspal.payload.request.PatchUserRequest;
import com.pw.kalspal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    UserRepository userRepository;

    public void partialUpdate(String userId, PatchUserRequest patchUserRequest) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (patchUserRequest.getFirstName() != null) user.setFirstName(patchUserRequest.getFirstName());
            if (patchUserRequest.getLastName() != null) user.setLastName(patchUserRequest.getLastName());
            if (patchUserRequest.getBirthDate() != null) user.setBirthDate(patchUserRequest.getBirthDate());
            userRepository.save(user);
        }
    }

}
