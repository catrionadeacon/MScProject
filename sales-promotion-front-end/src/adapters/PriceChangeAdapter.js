import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";

export function GetPricebookProductOptions({id}) {

    const[productOptionsMap, setProductOptionsMap] = useState(new Map());

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
          fetch(`${BASE_URL}/api/pricebooks/search/findByCustomerCode?customerCode=${id} `, {
            headers: { 'Authorization' : token }
          })
            .then((response) => response.json())
            .then((data) => {
                  const products = data._embedded.pricebooks;
                  console.log(products);
                  const ProductOptions = new Map(products.map(p => [p.product.sku, p]));
                  setProductOptionsMap(ProductOptions);
              })
            .catch(error => console.error(error));
    }, [id]);
  
    return productOptionsMap;

}

export function FetchPriceChangeData({url}) {

    const [data, setData]= useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(url, {
          headers: { 'Authorization' : token }
        })
          .then((response) => response.json())
          .then((data) => setData(data._embedded.priceChanges))
          .catch(error => console.error(error));
      }, [url]);
    
    return data;
}

export function FetchPriceChangeProduct({url}) {

  const[data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
      fetch(url, {
        headers: { 'Authorization' : token }
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.product);
        })
        .catch(error => console.error(error));
  }, [url]);

  return data;
}

export function FetchPriceChangeCustomer({url}) {

  const[data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
      fetch(url, {
        headers: { 'Authorization' : token }
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.customer);
        })
        .catch(error => console.error(error));
  }, [url]);

  return data;
}

export function FetchPriceChangeAccountManager({url}) {

  const[data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
      fetch(url, {
        headers: { 'Authorization' : token }
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.accountManager);
        })
        .catch(error => console.error(error));
  }, [url]);

  return data;
}

export function FetchCustomerPrice({url}) {

  const[data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
      fetch(url, {
        headers: { 'Authorization' : token }
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data._embedded.pricebooks[0].customerListPrice);
        })
        .catch(error => console.error(error));
  }, [url]);

  return data;

}
