package com.pw.kalspal.payload.request;

import javax.validation.constraints.NotNull;

public class CreateWorkoutRequest {

    @NotNull
    private String workout;

    public CreateWorkoutRequest(String workout) {
        this.workout = workout;
    }

    public CreateWorkoutRequest() {
    }

    public String getWorkout() {
        return workout;
    }

    public void setWorkout(String workout) {
        this.workout = workout;
    }
}
