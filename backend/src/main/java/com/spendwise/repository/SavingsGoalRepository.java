package com.spendwise.repository;

import com.spendwise.model.SavingsGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingsGoalRepository extends JpaRepository<SavingsGoal, Long> {
}
