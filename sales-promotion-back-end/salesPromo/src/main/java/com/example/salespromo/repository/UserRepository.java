package com.example.salespromo.repository;

import com.example.salespromo.domain.User;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource()
public interface UserRepository extends CrudRepository<User, Long> {
	Optional<User> findByUsername(String username);
}
