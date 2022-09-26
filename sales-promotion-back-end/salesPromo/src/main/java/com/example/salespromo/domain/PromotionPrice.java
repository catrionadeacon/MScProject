package com.example.salespromo.domain;

import javax.persistence.*;

@Entity
@Table(name = "promotion_price")
public class PromotionPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotion_price_id")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @Column(name = "product_sku")
    private String productSku;
    
    @Column(name = "promotion_reference")
    private String pafRef;
    
    @Column(name = "promotional_price")
    private double promoPrice;

    @Column(name = "volumes_promoting")
    private int promoVol;

    @Column(name = "volumes_not_promoting")
    private int offPromoVol;

    @Column(name = "retro_funding_per_case")
    private double retroFunding;

    @Column(name = "expected_claim")
    private double expectedClaim;

    @Column(name = "customer_list_price")
    private double customerListPrice;

    @Column(name = "sage_status")
    private String sageStatus;

    public PromotionPrice(){}

    public PromotionPrice(long id, Product product, Promotion promotion, double promoPrice, int promoVol, int offPromoVol, double retroFunding, String sageStatus){
        this.id = id;
        this.product = product;
        this.promotion = promotion;
        this.promoPrice = promoPrice;
        this.promoVol = promoVol;
        this.offPromoVol = offPromoVol;
        this.retroFunding = retroFunding;
        this.sageStatus = sageStatus;
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

    public Promotion getPromotion() {
        return promotion;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
    }

    public double getPromoPrice() {
        return promoPrice;
    }

    public void setPromoPrice(double promoPrice) {
        this.promoPrice = promoPrice;
    }

    public int getPromoVol() {
        return promoVol;
    }

    public void setPromoVol(int promoVol) {
        this.promoVol = promoVol;
    }

    public int getOffPromoVol() {
        return offPromoVol;
    }

    public void setOffPromoVol(int offPromoVol) {
        this.offPromoVol = offPromoVol;
    }

    public double getRetroFunding() {
        return retroFunding;
    }

    public void setRetroFunding(double retroFunding) {
        this.retroFunding = retroFunding;
    }

    public String getPafReference() { 
    	return this.pafRef;
    }
    
    public void setPafReference(String pafRef) { 
    	this.pafRef = pafRef;
    }
    
    public String getProductSku() { 
    	return this.productSku;
    }
    
    public void setProductSku(String productSku) { 
    	this.productSku = productSku;
    }
    
    public double getCustomerListPrice() {
        return customerListPrice;
    }

    public void setCustomerListPrice(double customerListPrice) {
        this.customerListPrice = customerListPrice;
    }

    public String getPafRef() {
        return pafRef;
    }

    public void setPafRef(String pafRef) {
        this.pafRef = pafRef;
    }

    public String getSageStatus() {
        return sageStatus;
    }

    public void setSageStatus(String sageStatus) {
        this.sageStatus = sageStatus;
    }

    public double getExpectedClaim() {
        return expectedClaim;
    }

    public void setExpectedClaim(double expectedClaim) {
        this.expectedClaim = expectedClaim;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof PromotionPrice otherPromotionPrice){
            result = (this.id == otherPromotionPrice.id);
        }
        return result;
    }
}
