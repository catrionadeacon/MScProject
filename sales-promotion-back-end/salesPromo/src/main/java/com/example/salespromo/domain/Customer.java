package com.example.salespromo.domain;


import javax.persistence.*;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private long id;


    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "account_manager_id")
    private User manager;

    private String customerCode;
    private String name;

    public Customer(){}

    public Customer(long id, User manager, String name){
        this.id = id;
        this.manager = manager;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof Customer otherCustomer){
            result = this.id == otherCustomer.id;
        }
        return result;
    }
}
