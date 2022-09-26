package com.example.salespromo;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.salespromo.service.UserService;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserService userDetailsService;
	
	@Autowired
	private AuthenticationFilter authenticationFilter;
	
	@Autowired
	private AuthEntryPoint exceptionHandler;
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		System.out.println("\nconfigureGlobal auth: "+ auth);
		System.out.println("UserService: "+ userDetailsService + "\n");
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Bean
	public AuthenticationManager getAuthenticationManager() throws Exception {
		  
		return authenticationManager();
	}
	  
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		System.out.println("\nconfigure(HttpSecurity http)\n");

		http.csrf().disable()
			.cors().and()
	    	.sessionManagement()
	    	.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
	    	.authorizeRequests()

	    	// POST request to /login endpoint is not secured
	    	.antMatchers(HttpMethod.POST, "/login").permitAll()

	    	// All other requests are secured
	    	.anyRequest().authenticated().and()
	    	.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
	    	.addFilterBefore(authenticationFilter,UsernamePasswordAuthenticationFilter.class);
	  }	  
	
	// Add Global CORS filter to allow all origins for now
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("*"));
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(false);
		config.applyPermitDefaultValues();

		source.registerCorsConfiguration("/**", config);
		return source;
	}     	
}
