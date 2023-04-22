package com.example.codeengine.expense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.example.codeengine.expense.model.User;
import com.example.codeengine.expense.repository.UserRepository;

@RestController
@SessionAttributes("userCredentials")
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;

	public UserController(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	@GetMapping("/users")
	Collection<User> users(){
		return userRepository.findAll();
	}

	@GetMapping("/getUserById/{id}")
	Optional<User> findUser(@PathVariable Long id){
		return userRepository.findById(id);
	}
			
	@PostMapping("/users")
	ResponseEntity<User> createUser(@Valid @RequestBody User user) throws URISyntaxException{
		User result= userRepository.save(user);
		return ResponseEntity.created(new URI("/api/user" + result.getId())).body(result); 
	
	}	
		
	@PutMapping("/users/{id}")
	ResponseEntity<User> updateUser(@Valid @RequestBody User user){
		User result= userRepository.save(user);
		return ResponseEntity.ok().body(result);
	}
			
	@DeleteMapping("/users/{id}")
	ResponseEntity<?> deleteUser(@PathVariable Long id){
		userRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/users/checkIfExists")
	ResponseEntity<List<User>> findUser(@RequestBody User user) throws URISyntaxException{
		String email = user.getEmail();
		String password = user.getPassword();
		List<User> users = userRepository.findByEmailAndPassword(email, password);
		if(users.size() == 1) {
			return new ResponseEntity<>(userRepository.findByEmailAndPassword(email, password), HttpStatus.OK);
		}
		return new ResponseEntity<>(userRepository.findByEmailAndPassword(email, password), HttpStatus.OK);
	}
}
