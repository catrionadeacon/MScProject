package com.example.salespromo.repository;

import com.example.salespromo.domain.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {

    public Iterable<Customer> findByManager_Username(String username);

    public Optional<Customer> findByCustomerCode(String customerCode);

}
