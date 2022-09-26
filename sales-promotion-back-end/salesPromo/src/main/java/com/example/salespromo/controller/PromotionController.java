package com.example.salespromo.controller;

import com.example.salespromo.domain.Invoice;
import com.example.salespromo.domain.Promotion;
import com.example.salespromo.domain.PromotionPrice;
import com.example.salespromo.repository.InvoiceRepository;
import com.example.salespromo.repository.PromotionPriceRepository;
import com.example.salespromo.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PromotionController {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PromotionPriceRepository promotionPriceRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @RequestMapping("/promotions")
    public Iterable<Promotion> getPromotions(){
        return promotionRepository.findAll();
    }

    @RequestMapping("/promotionPrices/{promotion}")
    public Iterable<PromotionPrice> getPromotionPrices(@PathVariable("promotion") Promotion promotion){return promotionPriceRepository.findByPromotion(promotion);}

    @RequestMapping("/invoices")
    public Iterable<Invoice> getInvoices(){
        return invoiceRepository.findAll();
    }
}
