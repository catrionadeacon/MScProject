package com.example.salespromo.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "customerView", types = { Customer.class }) 
public interface CustomerView {

    public String getCustomerCode();
    public String getName();
}
