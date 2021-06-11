package com.pw.kalspal.payload.request;

import javax.validation.constraints.NotNull;

public class FindWorkoutRequest {

    @NotNull
    private Double latitude;
    @NotNull
    private Double longitude;
    @NotNull
    private Double range;
    @NotNull
    private Double distance;

    public FindWorkoutRequest(Double latitude, Double longitude, Double range, Double distance) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.range = range;
        this.distance = distance;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getRange() {
        return range;
    }

    public void setRange(Double range) {
        this.range = range;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }
}
