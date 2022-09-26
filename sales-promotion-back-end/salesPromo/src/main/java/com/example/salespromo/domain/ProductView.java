package com.example.salespromo.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "productView", types = { Product.class }) 
public interface ProductView {

    public String getSku();
    public String getDescription();
    public String getCategory();
    public String getProductGroup();
    public int getUnits();
    public double getLandedCost();
    public double getStandardPrice();
}
