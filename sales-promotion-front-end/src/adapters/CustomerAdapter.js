import { useEffect, useState } from "react";

export function FetchCustomerData({url}) {

  const[data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
      fetch(url, {
        headers: { 'Authorization' : token }
      })
      .then((response) => response.json())
      .then((data) => {
        setData(data._embedded.customers);
      })
      .catch(error => console.error(error));
  }, [url]);

  return data;

}

export function FetchPricebookData({url}) {

  const[data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
      fetch(url, {
        headers: { 'Authorization' : token }
      })
      .then((response) => response.json())
      .then((data) => {
        setData(data._embedded.pricebooks);
      })
      .catch(error => console.error(error));
  }, [url]);

  return data;

}