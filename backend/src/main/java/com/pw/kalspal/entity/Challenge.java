package com.pw.kalspal.entity;



import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
public class Challenge {

    @Id
    private final String id = UUID.randomUUID().toString();

    @ManyToOne
    private User invited;

    @ManyToOne
    private User invitationAuthor;

    @NotNull
    private String text;

    public Challenge(User invited, User invitationAuthor, String text) {
        this.invited = invited;
        this.invitationAuthor = invitationAuthor;
        this.text = text;
    }

    public Challenge() {
    }

    public String getId() {
        return id;
    }

    public User getInvited() {
        return invited;
    }

    public void setInvited(User userInvited) {
        this.invited = userInvited;
    }

    public User getInvitationAuthor() {
        return invitationAuthor;
    }

    public void setInvitationAuthor(User userInviting) {
        this.invitationAuthor = userInviting;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
