package com.spendwise.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    
    private BigDecimal amount;
    
    private LocalDate date;
    
    @Enumerated(EnumType.STRING)
    private TransactionType type;

    public enum TransactionType {
        INCOME, EXPENSE
    }
}
