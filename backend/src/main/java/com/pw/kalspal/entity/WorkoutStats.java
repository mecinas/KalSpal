package com.pw.kalspal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
public class WorkoutStats {

    public static Map<String, Double> caloriesPerSecond = Stream.of(new Object[][]{
            {"ride", 0.03},
            {"run", 0.02},
            {"other", 0.025},
    }).collect(Collectors.toMap(data -> (String) data[0], data -> (Double) data[1]));

    @Id
    @JsonIgnore
    private final String id = UUID.randomUUID().toString();

    @Nullable
    private Double totalDistance;

    @Nullable
    private Double totalTime;

    @Nullable
    private String timeString;

    @Nullable
    private Double maxElevation;

    @Nullable
    private Double minElevation;

    @Nullable
    private Double averageSpeed;

    @Nullable
    @JsonIgnore
    private Double startLongitude;

    @Nullable
    @JsonIgnore
    private Double startLatitude;

    @Nullable
    private Integer caloriesBurnedEstimate;

    public String getId() {
        return id;
    }

    public WorkoutStats() {

    }

    @Nullable
    public Double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(@Nullable Double totalDistance) {
        this.totalDistance = totalDistance;
    }

    @Nullable
    public Double getMaxElevation() {
        return maxElevation;
    }

    public void setMaxElevation(@Nullable Double maxElevation) {
        this.maxElevation = maxElevation;
    }

    @Nullable
    public Double getMinElevation() {
        return minElevation;
    }

    public void setMinElevation(@Nullable Double minElevation) {
        this.minElevation = minElevation;
    }

    @Nullable
    public Double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(@Nullable Double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }


    @Nullable
    public Integer getCaloriesBurnedEstimate() {
        return caloriesBurnedEstimate;
    }

    public void setCaloriesBurnedEstimate(@Nullable Integer caloriesBurnedEstimate) {
        this.caloriesBurnedEstimate = caloriesBurnedEstimate;
    }

    @Nullable
    public String getTimeString() {
        return timeString;
    }

    public void setTimeString(@Nullable String timeString) {
        this.timeString = timeString;
    }

    @Nullable
    public Double getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(@Nullable Double totalTime) {
        this.totalTime = totalTime;
    }

    @Nullable
    public Double getStartLongitude() {
        return startLongitude;
    }

    public void setStartLongitude(@Nullable Double startLongitude) {
        this.startLongitude = startLongitude;
    }

    @Nullable
    public Double getStartLatitude() {
        return startLatitude;
    }

    public void setStartLatitude(@Nullable Double startLatitude) {
        this.startLatitude = startLatitude;
    }
}
