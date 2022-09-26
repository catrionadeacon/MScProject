package com.example.salespromo.repository;

import com.example.salespromo.domain.UserRole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
}
