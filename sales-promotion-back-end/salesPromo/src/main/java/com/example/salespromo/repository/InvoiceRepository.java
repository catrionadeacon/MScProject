package com.example.salespromo.repository;

import com.example.salespromo.domain.Invoice;
import com.example.salespromo.domain.Promotion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Long> {
    List<Invoice> findByPromotion(Promotion promotion);

    public Iterable<Invoice> findByApprovalStatus(String approvalStatus);

    public Optional<Invoice> findByInvoiceReference(String invoiceReference);

}
