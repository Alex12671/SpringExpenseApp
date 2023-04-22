package com.example.codeengine.expense.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.codeengine.expense.model.User;

public interface UserRepository extends JpaRepository<User,Long> {
    List<User> findByEmailAndPassword(String email, String password);
    List<User> findByEmail(String email);
    Optional<User> findById(Long id);
}
