package com.example.salespromo;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("andrewc01: " + encoder.encode("ThisIsAndrew"));
        System.out.println("kis01: " + encoder.encode("kisPassword"));
        System.out.println("phils01: " + encoder.encode("Sphil"));
        System.out.println("stephh01: " + encoder.encode("password2"));
        System.out.println("traceyw01: " + encoder.encode("MyPassword"));
    }
    
/*
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				System.out.println("addCorsMappings");
				registry.addMapping("/**").allowedOrigins("http://localhost:8080","http://192.168.1.45:8080");
//				registry.addMapping("/**").allowedOriginPatterns("*");
			}
		};
	}    
*/	
/*    
	@Component
	public class SpringDataRestConfig implements RepositoryRestConfigurer {

	  @Override
	  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

		System.out.println("configureRepositoryRestConfiguration");
		
		cors.addMapping("/**")
	        .allowedOrigins("*")
	        .allowedMethods("GET", "PUT", "DELETE")
	        .allowCredentials(false).maxAge(3600);
	  }
	}
	*/
}
