package com.example.salespromo.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userView", types = { User.class }) 
public interface UserView {

	public String getFirstName();
    public void setFirstName(String name);
    public String getLastName();
    public String getEmail();
    public String getUsername();
}
