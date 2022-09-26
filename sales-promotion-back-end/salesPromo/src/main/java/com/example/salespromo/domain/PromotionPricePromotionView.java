package com.example.salespromo.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "PromotionPricePromotionView", types = { PromotionPrice.class }) 
public interface PromotionPricePromotionView {

    public double getPromoPrice();
    public int getPromoVol();
    public int getOffPromoVol();
    public double getRetroFunding();
    public String getPafReference();
    public String getProductSku();
    public double getCustomerListPrice();
    public String getSageStatus();
    
	public PromotionCustomerView getPromotion();
}
