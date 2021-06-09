package com.pw.kalspal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "appusers")
public class User implements Serializable {

    @Id
    @NotNull
    private String id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String email;

    @NotNull
    private Date birthDate;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Workout> workouts;

    @OneToOne(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "user")
    @JsonIgnore
    private Avatar avatar;

    private String avatarURL;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "invitationAuthor")
    private List<FriendInvitation> invitationsSent;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "invited", orphanRemoval = true)
    private List<FriendInvitation> invitationsReceived;


    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinTable(name = "appusers_friends",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "friends_id", referencedColumnName = "id"))
    private Set<User> friends;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "invitationAuthor")
    private List<Challenge> challengesSent;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "invited", orphanRemoval = true)
    private List<Challenge> challengesReceived;

    public User(@NotNull String id, @NotNull String firstName, @NotNull String lastName, @NotNull String email, @NotNull Date birthDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
    }

    public User() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public List<Workout> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<Workout> workouts) {
        this.workouts = workouts;
    }

    public Avatar getAvatar() {
        return avatar;
    }

    public void setAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }

    public List<FriendInvitation> getInvitationsSent() {
        return invitationsSent;
    }

    public void setInvitationsSent(List<FriendInvitation> invitationsSent) {
        this.invitationsSent = invitationsSent;
    }

    public List<FriendInvitation> getInvitationsReceived() {
        return invitationsReceived;
    }

    public void setInvitationsReceived(List<FriendInvitation> invitationsReceived) {
        this.invitationsReceived = invitationsReceived;
    }

    public Set<User> getFriends() {
        return friends;
    }

    public void setFriends(Set<User> friends) {
        this.friends = friends;
    }

    public List<Challenge> getChallengesSent() {
        return challengesSent;
    }

    public void setChallengesSent(List<Challenge> challengesSent) {
        this.challengesSent = challengesSent;
    }

    public List<Challenge> getChallengesReceived() {
        return challengesReceived;
    }

    public void setChallengesReceived(List<Challenge> challengesReceived) {
        this.challengesReceived = challengesReceived;
    }
}

