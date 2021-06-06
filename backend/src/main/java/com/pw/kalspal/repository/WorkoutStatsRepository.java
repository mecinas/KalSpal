package com.pw.kalspal.repository;

import com.pw.kalspal.entity.Workout;
import com.pw.kalspal.entity.WorkoutStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutStatsRepository extends JpaRepository<WorkoutStats, String> {
}
