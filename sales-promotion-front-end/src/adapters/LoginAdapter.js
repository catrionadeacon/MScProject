import { BASE_URL } from "../Constants";

export function UserLogin({user}) {

    console.log(user)

    fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(user)
    })

    .then(res => {
        const jwtToken = res.headers.get('Authorization');

        if(jwtToken !== null) {
            sessionStorage.setItem("jwt", jwtToken);
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("fetchBaseUrl", "http://localhost:8080")
        }
    })
    .catch(err => console.error(err))

}

export function GetUserData({username, jwtToken}) {

    fetch(`${BASE_URL}/api/users/search/findByUsername?username=${username}`, {
        headers: { 'Authorization' : jwtToken }
    })
    .then((response) => response.json())
    .then((data) => {
        sessionStorage.setItem("userLink", data._links.self.href);

        fetch(data._links.roles.href, {
            headers: { 'Authorization' : jwtToken }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("inside fetch user roles");
                console.log(data);
                const roleCodes = data._embedded.roles.map(r => r.code);
                console.log(roleCodes);
                console.log(JSON.stringify(roleCodes));
                localStorage.setItem("roles", JSON.stringify(roleCodes));
            })
            .catch(error => console.error(error));
    })
    .catch(error => console.error(error));

}