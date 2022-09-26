package com.example.salespromo.domain;

import java.time.LocalDate;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "PromotionCustomerView", types = { Promotion.class }) 
public interface PromotionCustomerView {
	
    public String getCustomerCode();
    public String getProductGroup();
    public String getPafRef();
    public String getPromotionRef();
    public String getPromotionType();
    public String getStatus();
    public LocalDate getSageStart();
    public LocalDate getSageEnd();
    public LocalDate getStoreStart();
    public LocalDate getStoreEnd();
    public String getMechanic();
    public LocalDate getEntryDate();

	public CustomerView getCustomer();
    public UserView getStockManager();
    public UserView getCommercialManager();
}
