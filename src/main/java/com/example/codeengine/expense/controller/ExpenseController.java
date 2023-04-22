package com.example.codeengine.expense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.codeengine.expense.model.Expense;
import com.example.codeengine.expense.repository.ExpenseRepository;

@RestController
@RequestMapping("/api")
public class ExpenseController {
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@GetMapping("/expenses")
	List<Expense> getExpenses(){
		return expenseRepository.findAll();
	}

	@GetMapping("/userExpenses/{id}")
	List<Expense> getExpensesByUser(@PathVariable Long id){
		return expenseRepository.findByUser_id(id);
	}

	@GetMapping("/getExpenseById/{id}")
	Optional<Expense> findExpense(@PathVariable Long id){
		return expenseRepository.findById(id);
	}

	@GetMapping("/getTotalPriceByCategory/{id}")
	List<Object> getExpensesPriceByCategory(@PathVariable String id){
		ZoneId zoneId = ZoneId.of ( "America/Montreal" );
		LocalDate today = LocalDate.now ( zoneId );
		LocalDate firstOfCurrentMonth = today.withDayOfMonth( 1 ) ;
		LocalDate lastOfCurrentMonth = today.with(TemporalAdjusters.lastDayOfMonth());
		return expenseRepository.groupExpensesByUserAndCategories(id,firstOfCurrentMonth.toString(),lastOfCurrentMonth.toString());
	}

	@DeleteMapping("/expenses/{id}")
	ResponseEntity<?>  deleteExpense(@PathVariable Long id){
		expenseRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/expenses")
	ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException{
		Expense result= expenseRepository.save(expense);
		return ResponseEntity.created(new URI("/api/expenses" + result.getId())).body(result);
	}
}
