package com.example.salespromo.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private long id;

    @Column(name = "product_sku")
    private String sku;

    private String description;

    private String category;

    @Column(name = "product_group")
    private String productGroup;

    @Column(name = "units_per_case")
    private int units;

    @Column(name = "landed_cost")
    private double landedCost;

    @Column(name = "standard_price")
    private double standardPrice;

    public Product(){}

    public Product(long id, String description, String category, String productGroup, int units, double landedCost, double standardPrice){
        this.id = id;
        this.description = description;
        this.category = category;
        this.productGroup = productGroup;
        this.units = units;
        this.landedCost = landedCost;
        this.standardPrice = standardPrice;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProductGroup() {
        return productGroup;
    }

    public void setProductGroup(String productGroup) {
        this.productGroup = productGroup;
    }

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public double getLandedCost() {
        return landedCost;
    }

    public void setLandedCost(double landedCost) {
        this.landedCost = landedCost;
    }

    public double getStandardPrice() {
        return standardPrice;
    }

    public void setStandardPrice(double standardPrice) {
        this.standardPrice = standardPrice;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof Product otherProduct){
            result = (Objects.equals(this.id, otherProduct.id));
        }
        return result;
    }
}
