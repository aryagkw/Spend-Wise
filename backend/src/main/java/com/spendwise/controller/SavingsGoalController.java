package com.spendwise.controller;

import com.spendwise.model.SavingsGoal;
import com.spendwise.service.SavingsGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class SavingsGoalController {

    @Autowired
    private SavingsGoalService savingsGoalService;

    @GetMapping
    public List<SavingsGoal> getAllGoals() {
        return savingsGoalService.getAllGoals();
    }

    @PostMapping
    public SavingsGoal createGoal(@RequestBody SavingsGoal goal) {
        return savingsGoalService.createGoal(goal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SavingsGoal> updateGoal(@PathVariable Long id, @RequestBody SavingsGoal goal) {
        SavingsGoal updatedGoal = savingsGoalService.updateGoal(id, goal);
        if (updatedGoal != null) {
            return ResponseEntity.ok(updatedGoal);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        savingsGoalService.deleteGoal(id);
        return ResponseEntity.ok().build();
    }
}
