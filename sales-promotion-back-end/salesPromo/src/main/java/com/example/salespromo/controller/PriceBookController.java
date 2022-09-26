package com.example.salespromo.controller;

import com.example.salespromo.repository.PricebookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PriceBookController {
    @Autowired
    private PricebookRepository pricebookRepository;


}
