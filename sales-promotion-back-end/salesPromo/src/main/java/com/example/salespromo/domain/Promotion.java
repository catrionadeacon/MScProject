package com.example.salespromo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "promotion")
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotion_id")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "commercial_manager_id")
    private User commercialManager;

    @Column(name = "customer_code")
    private String customerCode;

    @Column(name = "product_group")
    private String productGroup;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_manager_id")
    private User stockManager;

    @Column(name = "paf_reference")
    private String pafRef;

    @Column(name = "promotion_reference")
    private String promotionRef;

    @Column(name = "promotion_type")
    private String promotionType;

    @Column(name = "approval_status")
    private String status;

    @Column(name = "sage_start_date")
    @JsonFormat(pattern="dd/MM/yyyy")
    private LocalDate sageStart;

    @Column(name = "sage_end_date")
    @JsonFormat(pattern="dd/MM/yyyy")
    private LocalDate sageEnd;

    @Column(name = "store_start_date")
    @JsonFormat(pattern="dd/MM/yyyy")
    private LocalDate storeStart;

    @Column(name = "store_end_date")
    @JsonFormat(pattern="dd/MM/yyyy")
    private LocalDate storeEnd;

    private String mechanic;

    @Column(name = "entry_date")
    @JsonFormat(pattern="dd/MM/yyyy")
    private LocalDate entryDate;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "promotion")
    private List<PromotionPrice> promotionPrices;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "promotion")
    private List<Invoice> invoices;

    public Promotion(){}

    public Promotion(long id, Customer customer, String customerCode, String productGroup, User commercialManager, User stockManager, String pafRef, String promotionRef, String promotionType, String status,
                     LocalDate sageStart, LocalDate sageEnd, LocalDate storeStart, LocalDate storeEnd, String mechanic, LocalDate entryDate){
        this.id = id;
        this.customer = customer;
        this.customerCode = customerCode;
        this.productGroup = productGroup;
        this.commercialManager = commercialManager;
        this.stockManager = stockManager;
        this.pafRef = pafRef;
        this.promotionRef = promotionRef;
        this.promotionType = promotionType;
        this.status = status;
        this.sageStart = sageStart;
        this.sageEnd = sageEnd;
        this.storeStart = storeStart;
        this.storeEnd = storeEnd;
        this.mechanic = mechanic;
        this.entryDate = entryDate;
    }

    public List<PromotionPrice> getPromotionPrices() {
        return promotionPrices;
    }

    public void setPromotionPrices(List<PromotionPrice> promotionPrices) {
        this.promotionPrices = promotionPrices;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<Invoice> invoices) {
        this.invoices = invoices;
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

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getProductGroup() {
        return productGroup;
    }

    public void setProductGroup(String productGroup) {
        this.productGroup = productGroup;
    }

    public User getCommercialManager() {
        return commercialManager;
    }

    public void setCommercialManager(User commercialManager) {
        this.commercialManager = commercialManager;
    }

    public User getStockManager() {
        return stockManager;
    }

    public void setStockManager(User stockManager) {
        this.stockManager = stockManager;
    }

    public String getPafRef() {
        return pafRef;
    }

    public void setPafRef(String pafRef) {
        this.pafRef = pafRef;
    }

    public String getPromotionRef() {
        return promotionRef;
    }

    public void setPromotionRef(String promotionRef) {
        this.promotionRef = promotionRef;
    }

    public String getPromotionType() {
        return promotionType;
    }

    public void setPromotionType(String promotionType) {
        this.promotionType = promotionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getSageStart() {
        return sageStart;
    }

    public void setSageStart(LocalDate sageStart) {
        this.sageStart = sageStart;
    }

    public LocalDate getSageEnd() {
        return sageEnd;
    }

    public void setSageEnd(LocalDate sageEnd) {
        this.sageEnd = sageEnd;
    }

    public LocalDate getStoreStart() {
        return storeStart;
    }

    public void setStoreStart(LocalDate storeStart) {
        this.storeStart = storeStart;
    }

    public LocalDate getStoreEnd() {
        return storeEnd;
    }

    public void setStoreEnd(LocalDate storeEnd) {
        this.storeEnd = storeEnd;
    }

    public String getMechanic() {
        return mechanic;
    }

    public void setMechanic(String mechanic) {
        this.mechanic = mechanic;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof Promotion otherPromotion){
            result = (Objects.equals(this.id, otherPromotion.id));
        }
        return result;
    }
}
