package com.example.salespromo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.salespromo.domain.UserCredentials;
import com.example.salespromo.service.JwtService;

@RestController
public class LoginController {
	
	  @Autowired
	  private JwtService jwtService;

	  @Autowired      
	  AuthenticationManager authenticationManager;

	  @RequestMapping(value="/login", method=RequestMethod.POST)
	  public ResponseEntity<?> getToken(@RequestBody 
			  UserCredentials credentials) {

		  System.out.println("\nLogin: " + credentials.getUsername() + " pwd: " + credentials.getPassword());
		  
		  // Generate token and send it in the response Authorization header
		  
		  UsernamePasswordAuthenticationToken creds =
				  new UsernamePasswordAuthenticationToken(credentials.getUsername(),credentials.getPassword());      

		  try {
			  Authentication auth = authenticationManager.authenticate(creds);

			  // Generate token
			  String jwts = jwtService.getToken(auth.getName());
			  System.out.println("\njwts: " + jwts);

			  // Build response with the generated token
			  return ResponseEntity.ok()
					  .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
					  .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS,"Authorization")
					  .build();		  
		  }
		  catch(Throwable t) {
			  t.printStackTrace();
			  throw t;
		  }
	  }
}
