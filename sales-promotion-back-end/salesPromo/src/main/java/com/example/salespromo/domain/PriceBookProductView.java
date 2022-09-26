package com.example.salespromo.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "priceBookProductView", types = { Pricebook.class }) 
public interface PriceBookProductView {

    public double getCustomerListPrice();
    public ProductView getProduct();
}
