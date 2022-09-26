package com.example.salespromo.controller;

import com.example.salespromo.domain.Customer;
import com.example.salespromo.domain.Pricebook;
import com.example.salespromo.domain.Product;
import com.example.salespromo.domain.User;
import com.example.salespromo.repository.CustomerRepository;
import com.example.salespromo.repository.PricebookRepository;
import com.example.salespromo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PricebookRepository pricebookRepository;

    @RequestMapping("/products")
    public Iterable<Product> getProducts(){
        return productRepository.findAll();
    }

    @RequestMapping("/customers")
    public Iterable<Customer> getCustomers(){
        return customerRepository.findAll();
    }

    @RequestMapping("/pricebooks")
    public Iterable<Pricebook> getPricebooks(){
        return pricebookRepository.findAll();
    }

    @RequestMapping("/customers/{id}")
    public Optional<Customer> getCustomer(@PathVariable("id") long id){
        return customerRepository.findById(id);
    }

    @RequestMapping("/customers/{username}")
    public Iterable<Customer> getCustomersByManager(@PathVariable("username") String username){
        return customerRepository.findByManager_Username(username);
    }


}
