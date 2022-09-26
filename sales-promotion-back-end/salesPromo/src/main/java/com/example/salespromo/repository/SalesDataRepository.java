package com.example.salespromo.repository;

import com.example.salespromo.domain.SalesData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
public interface SalesDataRepository extends CrudRepository<SalesData, Long> {
}
