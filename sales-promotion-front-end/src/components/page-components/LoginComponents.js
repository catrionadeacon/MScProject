import React, { useState } from 'react';
import "../../styles/component.css"
import Snackbar from '@mui/material/Snackbar';
import * as AiIcons from "react-icons/ai";
import { FormInput } from "../general/FormInput";
import { Button } from "../general/Button";
import { GetUserData, UserLogin } from '../../adapters/LoginAdapter';
import { useNavigate } from 'react-router-dom';

export function LoginComponent() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [isAuthenticated, setAuth] = useState(false);

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        setUser({...user,
            [event.target.name] : event.target.value})
    }

    console.log(user);

    const userLogin = (e) => {
        e.preventDefault();

        UserLogin({user})

        const jwtToken = sessionStorage.getItem("jwt")
        const username = sessionStorage.getItem("username")

        if(jwtToken !== null) {
            GetUserData({username, jwtToken})
            setAuth(true)
        }
        else {
            setOpen(true)
        }
    }

    if(isAuthenticated) {
        navigate("/")
    }
    else {
        return (
            <div>
                <div className="loginComponent">
                    <div className="titleContainer">
                        <AiIcons.AiOutlineUser className='componentTitleIcon'/>
                        <h3 className='componentTitle'>Login</h3>
                    </div>
                    <div className='formContainer'>
                        <form>
                            <FormInput 
                                name="username" 
                                label="Username" 
                                type="text"  
                                onChange={handleChange}
                            />
                            <FormInput 
                                name="password" 
                                label="Password" 
                                type="password" 
                                onChange={handleChange}
                            />
                            <div className="buttonContainer">
                                <Button text="Log In" onClick={userLogin}/>
                            </div>
                        </form>
                    </div>
                </div>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login failed: Check your username and password"
                />
            </div>
        )
    }
}