package com.example.codeengine.expense.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.codeengine.expense.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {
	List<Expense> findByUser(Long id);

    @Query("SELECT SUM(price) AS totalPrice, category FROM Expense WHERE user_id = :id AND expensedate BETWEEN :date AND :endDate GROUP BY category_id")
    List<Object> groupExpensesByUserAndCategories(@Param("id") String id, @Param("date") String date,@Param("endDate") String endDate);

    @Query("SELECT SUM(price) AS totalPrice FROM Expense WHERE user_id = :id AND expensedate BETWEEN :date AND :endDate")
    Integer getMonthlyExpenses(@Param("id") String id, @Param("date") Date date,@Param("endDate") Date endDate);

    @Query("SELECT SUM(price) AS totalPrice FROM Expense WHERE user_id = :id AND expensedate BETWEEN :date AND :endDate")
    Integer getLastMonthExpenses(@Param("id") String id, @Param("date") Date date,@Param("endDate") Date endDate);

    @Query("SELECT e FROM Expense e WHERE user_id = :id AND expensedate BETWEEN :date AND :endDate")
    List<Expense> getExpensesFromCurrentMonth(@Param("id") String id, @Param("date") Date fecha,@Param("endDate") Date fecha2);
}
