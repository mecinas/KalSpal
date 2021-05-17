package com.pw.kalspal.payload.response;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.pw.kalspal.entity.Workout;


public class WorkoutWithReactionInfoResponse {

    @JsonUnwrapped
    private Workout workout;

    private boolean reaction;

    private int reactionsNumber;

    public WorkoutWithReactionInfoResponse(Workout workout, boolean reaction, int reactionsNumber) {
        this.workout = workout;
        this.reaction = reaction;
        this.reactionsNumber = reactionsNumber;
    }

    public WorkoutWithReactionInfoResponse(Workout workout) {
        this.workout = workout;
    }

    public WorkoutWithReactionInfoResponse() {
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public boolean isReaction() {
        return reaction;
    }

    public void setReaction(boolean reaction) {
        this.reaction = reaction;
    }

    public int getReactionsNumber() {
        return reactionsNumber;
    }

    public void setReactionsNumber(int reactionsNumber) {
        this.reactionsNumber = reactionsNumber;
    }
}
