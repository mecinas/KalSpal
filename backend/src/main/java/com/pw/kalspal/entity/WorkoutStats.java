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
            {"running", 0.195},
            {"walking", 0.093},
            {"other", 0.1},
    }).collect(Collectors.toMap(data -> (String) data[0], data -> (Double) data[1]));

    @Id
    @JsonIgnore
    private final String id = UUID.randomUUID().toString();

    @Nullable
    private Double totalDistance;

    @Nullable
    private Double totalTime;

    @Nullable
    private Double maxElevation;

    @Nullable
    private Double minElevation;

    @Nullable
    private Double averageSpeed;

    @Nullable
    private Double caloriesBurnedEstimate;

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
    public Double getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(@Nullable Double totalTime) {
        this.totalTime = totalTime;
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
    public Double getCaloriesBurnedEstimate() {
        return caloriesBurnedEstimate;
    }

    public void setCaloriesBurnedEstimate(@Nullable Double caloriesBurnedEstimate) {
        this.caloriesBurnedEstimate = caloriesBurnedEstimate;
    }
}
