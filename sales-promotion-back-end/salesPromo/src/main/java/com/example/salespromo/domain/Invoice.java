package com.example.salespromo.domain;

import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "invoice")
@TypeDef(
        name = "pgsql_enum",
        typeClass = PostgreSQLEnumType.class
)
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private long id;

    @Column(name = "invoice_reference")
    private String invoiceReference;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @Column(name = "matched_status")
    private String matchedStatus;

    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "invoice_date")
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date invoiceDate;

    @Column(name = "entry_date")
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date entryDate;

    @Column(name = "period_invoiced_start")
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date periodStart;

    @Column(name = "period_invoiced_end")
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date periodEnd;

    @Column(name = "total_invoiced")
    private double totalInvoiced;

    public Invoice(){}

    public Invoice(long id, String invoiceReference, Date invoiceDate, Date entryDate, Date periodStart, Date periodEnd){
        this.id = id;
        this.invoiceReference = invoiceReference;
        this.invoiceDate = invoiceDate;
        this.entryDate = entryDate;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getInvoiceReference() {
        return invoiceReference;
    }

    public void setInvoiceReference(String invoiceReference) {
        this.invoiceReference = invoiceReference;
    }

    public Promotion getPromotion() {
        return promotion;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
    }

    public String getMatchedStatus() {
        return matchedStatus;
    }

    public void setMatchedStatus(String matchedStatus) {
        this.matchedStatus = matchedStatus;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public Date getPeriodStart() {
        return periodStart;
    }

    public void setPeriodStart(Date periodStart) {
        this.periodStart = periodStart;
    }

    public Date getPeriodEnd() {
        return periodEnd;
    }

    public void setPeriodEnd(Date periodEnd) {
        this.periodEnd = periodEnd;
    }

    public double getTotalInvoiced() {
        return totalInvoiced;
    }

    public void setTotalInvoiced(double totalInvoiced) {
        this.totalInvoiced = totalInvoiced;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof Invoice otherInvoice){
            result = (this.id == otherInvoice.id);
        }
        return result;
    }

}
