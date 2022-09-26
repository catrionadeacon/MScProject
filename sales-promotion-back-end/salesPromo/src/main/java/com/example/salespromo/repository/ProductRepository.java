package com.example.salespromo.repository;

import com.example.salespromo.domain.Product;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RepositoryRestResource()
public interface ProductRepository extends CrudRepository<Product, Long> {

	@Query("select p from Product p left join Pricebook pb on p.id=pb.product.id and pb.customerCode = :customerCode")
	public Iterable<Product> findViewByCustomerCode(String customerCode);

	@Query("select p from Product p left join Pricebook pb on p.id=pb.product.id where pb.customerCode = :customerCode and p.category = :productCategory and p.productGroup = :productGroup")
	public Iterable<Product> findByCustomerCodeAndCategoryAndGroup(String customerCode, String productCategory, String productGroup);

	public Optional<Product> findBySku(String sku);
}
