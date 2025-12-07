package com.spendwise.service;

import com.spendwise.model.SavingsGoal;
import com.spendwise.repository.SavingsGoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SavingsGoalService {

    @Autowired
    private SavingsGoalRepository savingsGoalRepository;

    public List<SavingsGoal> getAllGoals() {
        return savingsGoalRepository.findAll();
    }

    public SavingsGoal createGoal(SavingsGoal goal) {
        return savingsGoalRepository.save(goal);
    }

    public SavingsGoal updateGoal(Long id, SavingsGoal goalDetails) {
        Optional<SavingsGoal> goalOptional = savingsGoalRepository.findById(id);
        if (goalOptional.isPresent()) {
            SavingsGoal goal = goalOptional.get();
            goal.setName(goalDetails.getName());
            goal.setTargetAmount(goalDetails.getTargetAmount());
            goal.setCurrentAmount(goalDetails.getCurrentAmount());
            goal.setDeadline(goalDetails.getDeadline());
            return savingsGoalRepository.save(goal);
        }
        return null; // Or throw exception
    }

    public void deleteGoal(Long id) {
        savingsGoalRepository.deleteById(id);
    }
}
