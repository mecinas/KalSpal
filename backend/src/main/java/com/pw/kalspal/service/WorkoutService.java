package com.pw.kalspal.service;

import com.pw.kalspal.entity.Workout;
import com.pw.kalspal.entity.WorkoutStats;
import com.pw.kalspal.repository.WorkoutStatsRepository;
import io.jenetics.jpx.GPX;
import io.jenetics.jpx.WayPoint;
import io.jenetics.jpx.geom.Geoid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.DoubleStream;

@Service
@Transactional
public class WorkoutService {

    @Autowired
    WorkoutStatsRepository workoutStatsRepository;

    public void calculateWorkoutStats(Workout workout) {

        WorkoutStats workoutStats = new WorkoutStats();

        String gpxString = workout.getGpx();
        InputStream gpxStream = new ByteArrayInputStream(gpxString.getBytes(StandardCharsets.UTF_8));
        try {
            GPX gpx = GPX.read(gpxStream);

            //totalDistance
            try {
                double totalDistance = gpx.wayPoints().collect(Geoid.WGS84.toPathLength()).doubleValue();
                workoutStats.setTotalDistance(totalDistance);
            } catch (Exception e) {
                System.out.println("Couldn't calculate totalDistance for workout " + workout.getId());
            }

            //totalTime
            try {
                List<WayPoint> wpts = gpx.getWayPoints();
                LocalDateTime timeEnd = wpts.get(wpts.size() - 1).getTime().get().toLocalDateTime();
                LocalDateTime timeStart = wpts.get(0).getTime().get().toLocalDateTime();
                long timeDiff = ChronoUnit.MILLIS.between(timeStart, timeEnd);
                workoutStats.setTotalTime(timeDiff / 1000.);
            } catch (Exception e) {
                System.out.println("Couldn't calculate totalTime for workout " + workout.getId());
            }

            //minElevation
            try {
                DoubleStream elevations = gpx.wayPoints().mapToDouble(wpt -> wpt.getElevation().get().doubleValue());
                Double minElevation = elevations.min().getAsDouble();
                workoutStats.setMinElevation(minElevation);
            } catch (Exception e) {
                System.out.println("Couldn't calculate minElevation for workout " + workout.getId());
            }

            //maxElevation
            try {
                DoubleStream elevations = gpx.wayPoints().mapToDouble(wpt -> wpt.getElevation().get().doubleValue());
                Double minElevation = elevations.max().getAsDouble();
                workoutStats.setMaxElevation(minElevation);
            } catch (Exception e) {
                System.out.println("Couldn't calculate maxElevation for workout " + workout.getId());
            }

            //averageSpeed
            try {
                Double averageSpeed = workoutStats.getTotalDistance() / workoutStats.getTotalTime();
                workoutStats.setAverageSpeed(averageSpeed);
            } catch (Exception e) {
                System.out.println("Couldn't calculate averageSpeed for workout " + workout.getId());
            }

            //caloriesBurnedEstimate
            try {
                Double caloriesBurnedEstimate = workoutStats.getTotalDistance() * WorkoutStats.calories.get(workout.getType());
                workoutStats.setCaloriesBurnedEstimate(caloriesBurnedEstimate);
            } catch (Exception e) {
                System.out.println("Couldn't calculate caloriesBurnedEstimate for workout " + workout.getId());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        workoutStatsRepository.save(workoutStats);
        workout.setWorkoutStats(workoutStats);
    }

}
