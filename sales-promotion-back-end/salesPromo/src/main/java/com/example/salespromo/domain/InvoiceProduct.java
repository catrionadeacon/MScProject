package com.example.salespromo.domain;
import javax.persistence.*;

@Entity
@Table(name = "invoice_product")
public class InvoiceProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_product_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    @Column(name = "customer_reference")
    private String reference;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "units_sold_total")
    private int totalUnits;

    @Column(name = "units_sold_promotion")
    private int promoUnits;

    @Column(name = "charge_per_unit")
    private double unitCharge;

    @Column(name = "total_cost")
    private double totalCost;

    @Column(name = "vat")
    private double vat;

    @Column(name = "cases_sold_on_promotion")
    private int promoCases;

    public InvoiceProduct(){}

    public InvoiceProduct(long id, Invoice invoice, String reference, int totalUnits, int promoUnits, double unitCharge, double totalCost, double vat, int promoCases){
        this.id = id;
        this.invoice = invoice;
        this.reference = reference;
        this.totalUnits = totalUnits;
        this.promoUnits = promoUnits;
        this.unitCharge = unitCharge;
        this.totalCost = totalCost;
        this.vat = vat;
        this.promoCases = promoCases;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public int getTotalUnits() {
        return totalUnits;
    }

    public void setTotalUnits(int totalUnits) {
        this.totalUnits = totalUnits;
    }

    public int getPromoUnits() {
        return promoUnits;
    }

    public void setPromoUnits(int promoUnits) {
        this.promoUnits = promoUnits;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public double getUnitCharge() {
        return unitCharge;
    }

    public void setUnitCharge(double unitCharge) {
        this.unitCharge = unitCharge;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public double getVat() {
        return vat;
    }

    public void setVat(double vat) {
        this.vat = vat;
    }

    public int getPromoCases() {
        return promoCases;
    }

    public void setPromoCases(int promoCases) {
        this.promoCases = promoCases;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof InvoiceProduct otherInvoiceProduct){
            result = (this.id == otherInvoiceProduct.id);
        }
        return result;
    }
}
