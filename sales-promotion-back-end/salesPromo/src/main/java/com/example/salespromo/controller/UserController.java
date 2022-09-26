package com.example.salespromo.controller;

import com.example.salespromo.domain.*;
import com.example.salespromo.repository.RoleRepository;
import com.example.salespromo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    @RequestMapping("/users")
    public Iterable<User> getUsers(HttpServletRequest request){
    	System.out.println("Origin: " + request.getHeader(HttpHeaders.ORIGIN));
        return userRepository.findAll();
    }

    @RequestMapping("/roles")
    public Iterable<Role> getRoles(){
        return roleRepository.findAll();
    }

    @RequestMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable("id") long id){
        return userRepository.findById(id);
    }

    @RequestMapping(value = "/users", params = "username")
    public Optional<User> getUserByUsername(@RequestParam("username") String username) {
        return userRepository.findByUsername(username);
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
    	
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    	Map<String, Role> newRoles = toRolesByCode(user.getRoles());
    	setRoles(user, newRoles);
    	if((user.getPassword() != null) && (user.getPassword().length() > 0)) {
    		user.setPassword(encoder.encode(user.getPassword()));
    	}
    	userRepository.save(user);
        return ResponseEntity.ok("resource saved");
    }

    // Return first value if not null or empty
    // Otherwise return 2nd value
    private String merge(final String newVal, final String oldVal) {
    	if((newVal != null) && newVal.length() > 0) {
    		return newVal;
    	}
    	return oldVal;
    }
    
    private Map<String, Role> toRolesByCode(final Iterable<Role> roles) {
    	Map<String, Role> roleMap = new TreeMap<String, Role>();
    	for(Role role : roles) {
    		roleMap.put(role.getCode(), role);
    	}
    	return roleMap;
    }
    
    private void setRoles(final User target, final Map<String, Role> updatedRoles) { 
    	Map<String, Role> validRoles = toRolesByCode(roleRepository.findAll());
    	
    	target.getRoles().clear();
    	for(Map.Entry<String, Role> updatedRole : updatedRoles.entrySet()) {
    		Role validRole = validRoles.get(updatedRole.getKey());
    		if(validRole != null) {
    			target.getRoles().add(validRole);
    		}
    	}
    }
    
    @PatchMapping("/users")
    public ResponseEntity<?> saveUser(@RequestBody User userUpdate) {
    	Optional<User> user = userRepository.findById(userUpdate.getId());
    	if(!user.isPresent()) {
        	userRepository.save(userUpdate);
    	}

    	user.get().setFirstName(merge(userUpdate.getFirstName(), user.get().getFirstName()));
    	user.get().setLastName(merge(userUpdate.getLastName(), user.get().getLastName()));
    	user.get().setEmail(merge(userUpdate.getEmail(), user.get().getEmail()));
    	user.get().setUsername(merge(userUpdate.getUsername(), user.get().getUsername()));
    	
    	userRepository.save(user.get());
    	
        return ResponseEntity.ok("resource saved");
    }

    @PatchMapping("/usersandroles")
    public ResponseEntity<?> saveUserAndRoles(@RequestBody User userUpdate) {
    	Optional<User> user = userRepository.findById(userUpdate.getId());
    	if(!user.isPresent()) {
        	userRepository.save(userUpdate);
    	}

    	user.get().setFirstName(merge(userUpdate.getFirstName(), user.get().getFirstName()));
    	user.get().setLastName(merge(userUpdate.getLastName(), user.get().getLastName()));
    	user.get().setEmail(merge(userUpdate.getEmail(), user.get().getEmail()));
    	user.get().setUsername(merge(userUpdate.getUsername(), user.get().getUsername()));
    	setRoles(user.get(), toRolesByCode(userUpdate.getRoles()));
    	
    	userRepository.save(user.get());
    	
        return ResponseEntity.ok("resource saved");
    }

    @DeleteMapping("/users")
    public ResponseEntity<?> deleteUser(@RequestBody User userUpdate) {
    	Optional<User> user = userRepository.findById(userUpdate.getId());
    	if(!user.isPresent()) {
        	userRepository.save(userUpdate);
    	}
    	
    	if(user.get().getUsername().equals(userUpdate.getUsername())) {
    		userRepository.delete(user.get());
    	}
    	
        return ResponseEntity.ok("resource saved");
    }

    @PutMapping("/usercredentials")
    public ResponseEntity<?> saveUserCredentials(@RequestBody UserCredentials credentials) {
    	Optional<User> user = userRepository.findByUsername(credentials.getUsername());
    	if(!user.isPresent()) {
    		ResponseEntity.notFound();
    	}
    	
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encryptedPassword = encoder.encode(credentials.getPassword());
        user.get().setPassword(encryptedPassword);
    	userRepository.save(user.get());
        return ResponseEntity.ok("resource saved");
    }
}
