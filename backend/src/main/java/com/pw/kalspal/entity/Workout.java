package com.pw.kalspal.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
public class Workout {

    @Id
    private final String id = UUID.randomUUID().toString();

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @NotNull
    @Column(columnDefinition = "VARCHAR(MAX)")
    private String gpx;

    public Workout(@NotNull User user, @NotNull String gpx) {
        this.user = user;
        this.gpx = gpx;
    }

    public Workout() {
    }

    public String getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getGpx() {
        return gpx;
    }

    public void setGpx(String gpx) {
        this.gpx = gpx;
    }
}
