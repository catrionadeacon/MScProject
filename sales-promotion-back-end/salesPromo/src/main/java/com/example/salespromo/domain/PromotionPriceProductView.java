package com.example.salespromo.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "PromotionPriceProductView", types = { PromotionPrice.class }) 
public interface PromotionPriceProductView {

    public double getPromoPrice();
    public int getPromoVol();
    public int getOffPromoVol();
    public double getRetroFunding();
    public String getPafReference();
    public String getProductSku();
    public double getCustomerListPrice();
    public ProductView getProduct();
}
