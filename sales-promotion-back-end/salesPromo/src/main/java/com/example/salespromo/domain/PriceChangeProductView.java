package com.example.salespromo.domain;

import java.util.Date;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "PriceChangeProductView", types = { PriceChange.class }) 
public interface PriceChangeProductView {
	public Date getDate();
	public String getStatus();
	public double getPrice();

	public CustomerView getCustomer();
    public ProductView getProduct();
    public UserView getAccountManager();
    public UserView getCommercialManager();
}
