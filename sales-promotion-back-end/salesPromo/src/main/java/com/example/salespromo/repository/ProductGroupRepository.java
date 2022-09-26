package com.example.salespromo.repository;

import com.example.salespromo.domain.ProductGroup;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductGroupRepository extends CrudRepository<ProductGroup, Long> {
}
