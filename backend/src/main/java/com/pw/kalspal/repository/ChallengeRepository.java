package com.pw.kalspal.repository;

import com.pw.kalspal.entity.Challenge;
import com.pw.kalspal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, String> {

    List<Challenge> findByInvitationAuthorOrInvited(User userInvited, User userInviting);
}
