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
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.DoubleStream;

@Service
@Transactional
public class WorkoutService {

    @Autowired
    WorkoutStatsRepository workoutStatsRepository;

    public void calculateWorkoutStats(Workout workout) {

        WorkoutStats workoutStats;
        if (workout.getWorkoutStats() == null) workoutStats = new WorkoutStats();
        else workoutStats = workout.getWorkoutStats();

        String gpxString = workout.getGpx();
        InputStream gpxStream = new ByteArrayInputStream(gpxString.getBytes(StandardCharsets.UTF_8));
        try {
            GPX gpx = GPX.read(gpxStream);

            List<WayPoint> wpts = gpx.getWayPoints();
            if (wpts.size() == 0)
                wpts = gpx.getTracks().get(0).getSegments().get(0).getPoints();

            //totalDistance
            try {
                double totalDistance = wpts.stream().collect(Geoid.WGS84.toPathLength()).doubleValue();
                workoutStats.setTotalDistance(totalDistance / 1000);
            } catch (Exception e) {
                System.out.println("Couldn't calculate totalDistance for workout " + workout.getId());
            }

            //totalTime avgSpeed
            try {
                LocalDateTime timeEnd = wpts.get(wpts.size() - 1).getTime().get().toLocalDateTime();
                LocalDateTime timeStart = wpts.get(0).getTime().get().toLocalDateTime();
                Duration duration = Duration.between(timeStart, timeEnd);
                String timeString = String.format("%02d", duration.toHours()) +
                        ":" +
                        String.format("%02d", duration.toMinutesPart()) +
                        ":" +
                        String.format("%02d", duration.toSecondsPart());
                workoutStats.setTimeString(timeString);
                workoutStats.setTotalTime(duration.toMillis() / 1000.);

                Double averageSpeed = workoutStats.getTotalDistance() / (duration.getSeconds() / 3600.);
                workoutStats.setAverageSpeed(averageSpeed);
            } catch (Exception e) {
                System.out.println("Couldn't calculate totalTime/averageSpeed for workout " + workout.getId());
            }

            //minElevation
            try {
                DoubleStream elevations = wpts.stream().mapToDouble(wpt -> wpt.getElevation().get().doubleValue());
                Double minElevation = elevations.min().getAsDouble();
                workoutStats.setMinElevation(minElevation);
            } catch (Exception e) {
                System.out.println("Couldn't calculate minElevation for workout " + workout.getId());
            }

            //maxElevation
            try {
                DoubleStream elevations = wpts.stream().mapToDouble(wpt -> wpt.getElevation().get().doubleValue());
                Double minElevation = elevations.max().getAsDouble();
                workoutStats.setMaxElevation(minElevation);
            } catch (Exception e) {
                System.out.println("Couldn't calculate maxElevation for workout " + workout.getId());
            }

            //caloriesBurnedEstimate
            try {
                double caloriesBurnedEstimate = workoutStats.getTotalDistance() * 1000 *
                        WorkoutStats.caloriesPerSecond.getOrDefault(workout.getType(), WorkoutStats.caloriesPerSecond.get("other"));
                workoutStats.setCaloriesBurnedEstimate((int) Math.round(caloriesBurnedEstimate));
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
