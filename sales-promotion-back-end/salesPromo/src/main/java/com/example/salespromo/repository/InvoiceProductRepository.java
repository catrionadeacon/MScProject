package com.example.salespromo.repository;

import com.example.salespromo.domain.InvoiceProduct;
import com.example.salespromo.domain.PriceChange;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
public interface InvoiceProductRepository extends CrudRepository<InvoiceProduct, Long> {
}
