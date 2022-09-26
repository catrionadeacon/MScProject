import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";

export function FetchUserRoles({username}) {

    const[data, setData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(`${BASE_URL}/users?username=${username}`, {
            headers: { 'Authorization' : token }
          })
          .then((response) => response.json())
          .then((data) => {
            setData(data.roles);
          })
          .catch(error => console.error(error));
    }, [username]);

    return data;
}

export function FetchRoleOptions() {

  const[roles, setRoles] = useState(useState(new Map()));

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
      fetch(`${BASE_URL}/api/roles`, {
        headers: { 'Authorization' : token }
      })
      .then((response) => response.json())
      .then((data) => {
        const roles = data._embedded.roles;
        const RoleOptions = new Map(roles.map(r => [r.code, r]));
        setRoles(RoleOptions);
      })
      .catch(error => console.error(error));
  }, []);

  return roles;

}