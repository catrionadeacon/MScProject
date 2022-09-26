import { useEffect, useState } from "react";

export function FetchPromotionPricesData({url}) {

    const[data, setData] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(url, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {setData(data._embedded.promotionPrices);
          })
          .catch(error => console.error(error));
    }, [url]);

    return data;

}