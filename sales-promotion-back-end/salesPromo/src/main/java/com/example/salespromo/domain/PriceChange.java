package com.example.salespromo.domain;

import com.example.salespromo.enumtype.PromotionStatus;
import com.example.salespromo.enumtype.PriceType;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "price_change")
@TypeDef(
        name = "pgsql_enum",
        typeClass = PostgreSQLEnumType.class
)
public class PriceChange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "price_change_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_manager_id")
    private User accountManager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commercial_manager_id")
    private User commercialManager;

    @JsonFormat(pattern="dd/MM/yyyy")
    private Date date;

    @Column(name = "approval_status")
    private String status;

    @Column(name = "price_type")
    private String priceType;

    @Column(name = "new_price")
    private double price;

    public PriceChange(){}

    public PriceChange(long id, Product product, Customer customer, User accountManager, Date date, double price){
        this.id = id;
        this.product = product;
        this.customer = customer;
        this.accountManager = accountManager;
        this.date = date;
        this.price = price;
    }

    public PriceChange(long id, Product product, User accountManager, Date date, double price){
        this.id = id;
        this.product = product;
        this.accountManager = accountManager;
        this.date = date;
        this.price = price;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public User getAccountManager() {
        return accountManager;
    }

    public void setAccountManager(User accountManager) {
        this.accountManager = accountManager;
    }

    public User getCommercialManager() {
        return commercialManager;
    }

    public void setCommercialManager(User commercialManager) {
        this.commercialManager = commercialManager;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriceType() {
        return priceType;
    }

    public void setPriceType(String priceType) {
        this.priceType = priceType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof PriceChange otherPriceChange){
            result = (this.id == otherPriceChange.id);
        }
        return result;
    }
}
