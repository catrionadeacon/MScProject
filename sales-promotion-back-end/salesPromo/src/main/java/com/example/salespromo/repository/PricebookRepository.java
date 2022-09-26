package com.example.salespromo.repository;

import com.example.salespromo.domain.Pricebook;
import com.example.salespromo.domain.PriceBookProductView;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
@RepositoryRestResource(excerptProjection = PriceBookProductView.class)
public interface PricebookRepository extends CrudRepository<Pricebook, Long> {

    List<Pricebook> findByCustomerCode(String customerCode);
    List<Pricebook> findByCustomerCodeAndProduct_Sku(String customerCode, String sku);
    List<Pricebook> findByCustomerCodeAndProduct_CategoryAndProduct_ProductGroup(String customerCode, String productCategory, String productGroup);

}
