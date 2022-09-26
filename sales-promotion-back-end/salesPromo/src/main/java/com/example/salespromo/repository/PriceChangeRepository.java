package com.example.salespromo.repository;

import com.example.salespromo.domain.PriceChange;
import com.example.salespromo.domain.PriceChangeProductView;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
@RepositoryRestResource(excerptProjection = PriceChangeProductView.class)
public interface PriceChangeRepository extends CrudRepository<PriceChange, Long> {
	
	// Find price changes by status
	public Iterable<PriceChange> findByStatus(String status);

	// Find price changes by status with no customer
	public Iterable<PriceChange> findByStatusAndCustomerIsNull(String status);

	public Iterable<PriceChange> findByCustomerIsNull();

	// Find price changes by status with customer
	public Iterable<PriceChange> findByStatusAndCustomerIsNotNull(String status);

	public Iterable<PriceChange> findByCustomerIsNotNull();

	public Optional<PriceChange> findByProduct_SkuAndCustomerIsNull(String sku);

	public Optional<PriceChange> findByCustomer_CustomerCodeAndProduct_SkuAndCustomerIsNotNull(String customerCode, String sku);
}
