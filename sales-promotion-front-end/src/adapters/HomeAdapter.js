import { useEffect, useState } from 'react';

export function GetDashboardPromotionsData({url}) {

    const[data, setData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(url, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => setData(data._embedded.promotions))
          .catch(error => console.error(error));
    }, [url]);

    return data;
}

