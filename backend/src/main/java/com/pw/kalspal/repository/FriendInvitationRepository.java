package com.pw.kalspal.repository;

import com.pw.kalspal.entity.FriendInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendInvitationRepository extends JpaRepository<FriendInvitation, String> {
}
