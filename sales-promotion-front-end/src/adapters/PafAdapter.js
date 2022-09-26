import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";

export function PafCategoryOptions(){
    
    const CategoryOptions = [];

    const[categories, setCategories] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(`${BASE_URL}/api/productCategories`, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => setCategories(data._embedded.productCategories))
          .catch(error => console.error(error));
    }, []);

    categories.map((item) => {
        return (
            CategoryOptions.push({
                value: item.descr,
                text: item.descr
            })   
        )
    })

    return CategoryOptions;
}

export function PafGroupOptions(){

    const GroupOptions = [];

    const[groups, setGroups] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(`${BASE_URL}/api/productGroups`, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => setGroups(data._embedded.productGroups))
          .catch(error => console.error(error));
    }, []);

    groups.map((item) => {
        return (
            GroupOptions.push({
                value: item.descr,
                text: item.descr
            })   
        )
    })

    return GroupOptions;
}


export function PafCustomerOptions() {

    const username = sessionStorage.getItem("username");

    const[customers, setCustomers] = useState(new Map());
    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(`${BASE_URL}/api/customers/search/findByManager_Username?username=${username}`, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {
                const customers = data._embedded.customers;
                const CustomerOptions = new Map(customers.map(c => [c.customerCode, c]));
                setCustomers(CustomerOptions)
          })
          .catch(error => console.error(error));
    }, [username]);

    return customers;
}

export function PafProductOptions({uri}) {

    const[skus, setSkus] = useState(new Map());

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(uri, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {
               const pricebooks = data._embedded.pricebooks;
               const pricebookMap = new Map(pricebooks.map(pb => [pb.product.sku, pb]));
               setSkus(pricebookMap)
           })
          .catch(error => console.error(error));

    }, [uri])

    return skus;

}

export function FetchPromotionsData({uri}) {

    const [data, setData]= useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
    
        fetch(uri, {
          headers: { 'Authorization' : token }
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data._embedded.promotions);
            console.log(data);
        })
        .catch(error => console.error(error));
    }, [uri]);

    console.log(data);
    
    return data;
}

export function FetchCommercialManager({uri}){

    const[data, setData] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(uri, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {setData(data);
            setData(data.commercialManager.firstName);
          })
          .catch(error => console.error(error));
    }, [uri]);

    return data;

}

export function FetchStockManager({uri}){

    const[data, setData] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(uri, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {setData(data);
            setData(data.stockManager.firstName);
          })
          .catch(error => console.error(error));
    }, [uri]);

    return data;

}

export function FetchPromotionPricesHref({url}){

    const[data, setData] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(url, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {setData(data);
            setData(data._links.promotionPrices.href);
          })
          .catch(error => console.error(error));
    }, [url]);

    return data;

}

export function FetchPafProducts({url}) {

    const[data, setData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(url, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {
                const products = data._embedded.promotionPrices;
                setData(products);
          })
          .catch(error => console.error(error));
    }, [url]);

    return data;

}
