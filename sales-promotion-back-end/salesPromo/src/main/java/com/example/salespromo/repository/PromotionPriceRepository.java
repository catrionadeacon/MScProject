package com.example.salespromo.repository;

import com.example.salespromo.domain.Promotion;
import com.example.salespromo.domain.PromotionPrice;
import com.example.salespromo.domain.PromotionPriceProductView;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@RepositoryRestResource(excerptProjection = PromotionPriceProductView.class)
public interface PromotionPriceRepository extends CrudRepository<PromotionPrice, Long> {

    List<PromotionPrice> findByPromotion(Promotion promotion);
    
	@Query("SELECT pp FROM PromotionPrice pp WHERE pp.promotion.status = :status and pp.promotion.customerCode = :customerCode and ((pp.promotion.storeStart <= :startDate and pp.promotion.storeEnd >= :startDate) or (pp.promotion.storeStart <= :endDate and pp.promotion.storeEnd >= :endDate))")
	public Iterable<PromotionPrice> findInvoiceDetailsByStatusCustomerAndDate(String status, String customerCode,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate startDate, 
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate endDate);
    
	@Query("SELECT pp FROM PromotionPrice pp WHERE pp.promotion.customerCode = :customerCode and ((pp.promotion.storeStart <= :startDate and pp.promotion.storeEnd >= :startDate) or (pp.promotion.storeStart <= :endDate and pp.promotion.storeEnd >= :endDate))")
	public Iterable<PromotionPrice> findInvoiceDetailsByCustomerAndDate(String customerCode,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate startDate, 
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate endDate);
    
	@Query("SELECT pp FROM PromotionPrice pp WHERE pp.productSku in :productSkus and pp.promotion.customerCode = :customerCode and ((pp.promotion.storeStart <= :startDate and pp.promotion.storeEnd >= :startDate) or (pp.promotion.storeStart <= :endDate and pp.promotion.storeEnd >= :endDate))")
	public Iterable<PromotionPrice> findInvoiceDetailsByCustomerDateAndSku(String customerCode, 
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate startDate, 
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate endDate, 
			List<String> productSkus);

	@Query("SELECT pp FROM PromotionPrice pp WHERE pp.productSku in :productSkus and pp.promotion.status = :status and pp.promotion.customerCode = :customerCode and ((pp.promotion.storeStart <= :startDate and pp.promotion.storeEnd >= :startDate) or (pp.promotion.storeStart <= :endDate and pp.promotion.storeEnd >= :endDate))")
	public Iterable<PromotionPrice> findInvoiceDetailsByStatusCustomerDateAndSku(String status, String customerCode, 
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate startDate, 
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE, fallbackPatterns = { "dd/MM/yyyy" })
			LocalDate endDate, 
			List<String> productSkus);
	
	@Query("SELECT pp FROM PromotionPrice pp WHERE pp.productSku in :productSkus and pp.promotion.customerCode = :customerCode")
	public Iterable<PromotionPrice> findByInvoiceDetails(List<String> productSkus, String customerCode);

	public Iterable<PromotionPrice> findBySageStatusNotAndPromotion_StatusAndPromotion_PromotionType(String sageStatus, String status, String promotionType);

	public Iterable<PromotionPrice> findBySageStatusAndPromotion_StatusAndPromotion_PromotionType(String sageStatus, String status, String promotionType);
}
