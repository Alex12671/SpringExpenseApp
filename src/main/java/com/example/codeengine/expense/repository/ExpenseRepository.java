package com.example.codeengine.expense.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.codeengine.expense.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {
	List<Expense> findByUser_id(Long id);

    @Query("SELECT SUM(price) AS totalPrice, category FROM Expense WHERE user = :id GROUP BY category_id")
    List<Expense>groupExpensesByUserAndCategories(@Param("id") Long id);
}
