package com.example.salespromo.repository;

import com.example.salespromo.domain.Promotion;
import com.example.salespromo.domain.PromotionCustomerView;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;



@Repository
@RepositoryRestResource(excerptProjection = PromotionCustomerView.class)
public interface PromotionRepository extends CrudRepository<Promotion, Long> {
                         	
	// Find approved promotions
	public Iterable<Promotion> findByStatus(String status);

	// Find NOT approved promotions
	public Iterable<Promotion> findByStatusNot(String status);

	// Find NOT approved promotions by accountmanager
	public Iterable<Promotion> findByStatusNotAndCustomer_Manager_Username(String status, String username);

	// Find running promotions not rejected
	public Iterable<Promotion> findByStatusNotAndStoreStartLessThanEqualAndStoreEndGreaterThanEqual(String status,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate start,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" }) 
			LocalDate end);

	// Find upcoming promotions not rejected
	public Iterable<Promotion> findByStatusNotAndStoreStartGreaterThanEqualAndStoreStartLessThanEqual(String status,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate start,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" }) 
			LocalDate end);

	// Find approved promotions
	public Iterable<Promotion> findByCommercialManagerNotNullAndStockManagerNotNull();
	
	// Find unapproved promotions
	public Iterable<Promotion> findByCommercialManagerIsNullAndStockManagerIsNull();
	
	// Find promotions still requiring commercial approval
	public Iterable<Promotion> findByCommercialManagerIsNull();

	// Find promotions still requiring stock approval
	public Iterable<Promotion> findByStatusAndStockManagerIsNull(String status);

	// Find promotions with stock approval
	public Iterable<Promotion> findByStatusAndStockManagerIsNotNull(String status);

	// Find promotion by pafRef
	public Optional<Promotion> findByPafRef(String pafRef);	
}
