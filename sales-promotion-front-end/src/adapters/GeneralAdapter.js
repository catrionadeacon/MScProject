import { useEffect, useState } from 'react'

export function GetSelfReference({url}) {

    const[data, setData] = useState([]);
    
    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(url, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {
            setData(data._links.self.href);
          })
          .catch(error => console.error(error));
    }, [url]);

        return data;
}


export function DeleteData({url}) {

    const token = sessionStorage.getItem("jwt");

    fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization' : token },
    })
    .then((response) => response.json())
    .catch(error => console.error(error));
}

export function FetchData({url}) {

    const[data, setData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(url, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          })
          .catch(error => console.error(error));
    }, [url]);

    return data;

}


export function PatchUpdatedData({url, data}) {

    const token = sessionStorage.getItem("jwt");

    fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type':'application/json', 'Authorization' : token },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .catch(error => console.error(error));

}

export function PostData({url, data}){

    const token = sessionStorage.getItem("jwt");
    
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization' : token },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .catch(error => console.error(error));

}

export function PostDataReturnSelfHref({url, data}){

    const token = sessionStorage.getItem("jwt");

    const [response, setResponse] = useState([]);
    
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization' : token },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then(data => {
        setResponse(data._links.self.href);
    })
    .catch(error => console.error(error));

    return response;

}