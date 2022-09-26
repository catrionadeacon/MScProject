import { useEffect, useState } from 'react';
import { BASE_URL } from "../Constants";

export function GetInvoicesData({url}) {

    const[data, setData] = useState([]);
    
    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(url, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => setData(data._embedded.invoices))
          .catch(error => console.error(error));
    }, [url]);

    return data;

}

export function GetInvoiceCustomerOptions() {

    const[customers, setCustomers] = useState(new Map());

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(`${BASE_URL}/api/customers`, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {
                const customers = data._embedded.customers;
                const CustomerOptions = new Map(customers.map(c => [c.customerCode, c]));
                setCustomers(CustomerOptions)
          })
          .catch(error => console.error(error));
    }, []);

    return customers;
}

export function InvoiceFetchCustomerProducts({customerCode}) {

    const token = sessionStorage.getItem("jwt");

    const encodedCustomerCode = encodeURIComponent(customerCode);

    var uri = `${BASE_URL}/api/pricebooks/search/findByCustomerCode?customerCode=${encodedCustomerCode}&projection=PriceBookProductView`;

    const [customerProducts, setCustomerProducts] = useState(new Map());

    fetch(uri, {
        headers: { 'Authorization' : token }
        })
        .then((response) => response.json())
        .then((data) => {
            const pricebooks = data._embedded.pricebooks;
            const newCustomerProducts = new Map(pricebooks.map(pb => [pb.product.sku, pb.product]));            
            setCustomerProducts(newCustomerProducts);
        })
        .catch(error => console.error(error));

    return customerProducts;

}

export function PostInvoiceLines({newInvoiceLine}) {

    const token = sessionStorage.getItem("jwt");

    const [invoiceLinesBySku, setInvoiceLinesBySku] = useState([]);

    fetch(`${BASE_URL}/api/invoiceProducts`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization' : token },
        body: JSON.stringify(newInvoiceLine)
    })
    .then((response) => response.json())
    .then((data) => {
        const newInvoiceLinesBySku = new Map(invoiceLinesBySku)
        newInvoiceLinesBySku.set(data.reference, data);
        setInvoiceLinesBySku(newInvoiceLinesBySku);
    })
    .catch(error => console.error(error));

    return invoiceLinesBySku;

}

export function GetMatchingPromotions({url}) {

    const token = sessionStorage.getItem("jwt");

    const [matchingPromotions, setMatchingPromotions] = useState([]);

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type':'application/json', 'Authorization' : token }
      })
      .then((response) => response.json())
      .then((data) => {
          let promotionPrices = data._embedded.promotionPrices;
          let promotionsByPafRef = new Map(promotionPrices.map(pp => [pp.promotion.pafRef, pp.promotion]));
          let promotions = Array.from(promotionsByPafRef.values());
          console.log(promotions);
          setMatchingPromotions(promotions);
      })
      .catch(error => console.error(error));

    return matchingPromotions;

}
