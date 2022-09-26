package com.example.salespromo.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "sales_data")
public class SalesData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sales_data_id")
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    private Date date;

    @Column(name = "cases_sold")
    private int casesSold;

    public SalesData(){}

    public SalesData(int id, Customer customer, Product product, Date date, int casesSold){
        this.id = id;
        this.customer = customer;
        this.product = product;
        this.date = date;
        this.casesSold = casesSold;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCasesSold() {
        return casesSold;
    }

    public void setCasesSold(int casesSold) {
        this.casesSold = casesSold;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof SalesData otherSalesData){
            result = (this.id == otherSalesData.id);
        }
        return result;
    }
}
