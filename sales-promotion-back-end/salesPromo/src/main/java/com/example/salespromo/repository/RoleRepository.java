package com.example.salespromo.repository;

import com.example.salespromo.domain.Role;
import com.example.salespromo.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
}
