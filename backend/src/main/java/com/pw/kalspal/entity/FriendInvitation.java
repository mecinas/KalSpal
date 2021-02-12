package com.pw.kalspal.entity;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class FriendInvitation {

    @Id
    private String id = UUID.randomUUID().toString();

    @ManyToOne
    private User invitationAuthor;

    @ManyToOne
    private User invited;

    public FriendInvitation() {
    }

    public FriendInvitation(User invitationAuthor, User invited) {
        this.invitationAuthor = invitationAuthor;
        this.invited = invited;
    }

    public String getId() {
        return id;
    }

    public User getInvitationAuthor() {
        return invitationAuthor;
    }

    public void setInvitationAuthor(User invitationAuthor) {
        this.invitationAuthor = invitationAuthor;
    }

    public User getInvited() {
        return invited;
    }

    public void setInvited(User invited) {
        this.invited = invited;
    }
}
