package com.example.salespromo.domain;


import javax.persistence.*;

@Entity
@Table(name = "pricebook")
public class Pricebook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pricebook_id")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "customer_list_price")
    private double customerListPrice;

    @Column(name = "customer_product_id")
    private String customerReference;

    @Column(name = "product_sku")
    private String productSku;

    @Column(name = "customer_code")
    private String customerCode;

    public Pricebook(){}

    public Pricebook(long id, Customer customer, Product product, double customerListPrice, String customerReference, String productSku, String customerCode){
        this.id = id;
        this.customer = customer;
        this.product = product;
        this.customerListPrice = customerListPrice;
        this.customerReference = customerReference;
        this.productSku = productSku;
        this.customerCode = customerCode;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public double getCustomerListPrice() {
        return customerListPrice;
    }

    public void setCustomerListPrice(double customerListPrice) {
        this.customerListPrice = customerListPrice;
    }

    public String getCustomerReference() {
        return customerReference;
    }

    public void setCustomerReference(String customerReference) {
        this.customerReference = customerReference;
    }

    public String getProductSku() {
        return productSku;
    }

    public void setProductSku(String productSku) {
        this.productSku = productSku;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof Pricebook otherPricebook){
            result = (this.id == otherPricebook.id);
        }
        return result;
    }
}
