package com.example.salespromo.service;

import com.example.salespromo.repository.RoleRepository;
import com.example.salespromo.domain.User;
import com.example.salespromo.repository.UserRepository;
import com.example.salespromo.repository.UserRoleRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    RoleRepository roleRepository;


    public User saveUser(User user) {
        return userRepository.save(user);
    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("loadUserByUsername username: "+ username);
		
		Optional<User> user = userRepository.findByUsername(username);
		UserBuilder builder = null;
	
		if (user.isPresent()) {
			User currentUser = user.get();
			builder = org.springframework.security.core.userdetails.User.withUsername(username);
			builder.password(currentUser.getPassword());
			builder.roles("USER");

			System.out.println("loadUserByUsername loaded username: "+ currentUser.getUsername() + " password: " + currentUser.getPassword());
		} 
		else {
			throw new UsernameNotFoundException("User not found.");
		}
		return builder.build();          
	}
}
