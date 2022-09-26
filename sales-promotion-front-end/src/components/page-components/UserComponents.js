import { useState } from "react";
import { FetchData, PatchUpdatedData } from "../../adapters/GeneralAdapter";
import "../../styles/component.css";
import { Button } from "../general/Button";
import { FormInput } from "../general/FormInput";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import { FetchUserRoles } from "../../adapters/UserAdapter";
import { BASE_URL } from "../../Constants";

export function EditDetailsComponent() {

    const username = sessionStorage.getItem("username");

    const url = `${BASE_URL}/users?username=${username}`;

    const data = FetchData({url});

    const [user, setUser] = useState({
        id : data.id,
        firstName : data.firstName,
        lastName : data.lastName,
        username : data.username,
        email : data.email
    });

    const handleChange = (event) => {

        event.preventDefault();
    
        setUser({...user,
            [event.target.name] : event.target.value
        });
    
    }

    function HandleUpdate(){
    
        const patchUrl = `${BASE_URL}/users`;
    
        const updatedUser = user;
    
        PatchUpdatedData({patchUrl, updatedUser});

    }
    
    return (
        <div className='component' style={{width: '600px'}}>
            <div className='titleContainer'>
                <AiIcons.AiOutlineForm className='componentTitleIcon'/>
                <h3 className='componentTitle'>Edit</h3>
            </div>
            <form className="form">
                <FormInput label="First Name" name="firstName" type="text" placeholder={data.firstName} defaultValue={data.firstName} onChange={handleChange}/>
                <FormInput label="Last Name" name="lastName" type="text" placeholder={data.lastName} defaultValue={data.lastName} onChange={handleChange}/>
                <FormInput label="Username" name="username" type="text" placeholder={data.username} defaultValue={data.username} onChange={handleChange}/>
                <FormInput label="Email" name="email" type="email" placeholder={data.email} defaultValue={data.email} onChange={handleChange}/>
            </form>
            <div className="buttonContainer">
                <Button text="Update User" onClick={HandleUpdate}/>
            </div>
        </div>

    )
}

export function UserDetailsComponent() {

    const username = sessionStorage.getItem("username");

    const url = `${BASE_URL}/users?username=${username}`

    const data = FetchData({url});

    const roles = FetchUserRoles({username});
    
    console.log(data);

    return (
        <div className='component' style={{width: '450px'}}>
            <div className='titleContainer'>
                <AiIcons.AiOutlineAlignLeft className='componentTitleIcon'/>
                <h3 className='componentTitle'>Details</h3>
            </div>
            <div className='content'>
              <div className='detailsTop'>
                <span className='detailsTitle'>USER INFORMATION</span>
                <ul className='detailsList'>
                  <li className='detailsItem'>
                    <MdIcons.MdPermIdentity className="detailsItemIcon"/>
                    <span className='detailsItemText'>{data.firstName} {data.lastName}</span>
                  </li>
                  <li className='detailsItem'>
                    <MdIcons.MdPermIdentity className="detailsItemIcon"/>
                    <span className='detailsItemText'>{data.username}</span>
                  </li>
                  <li className='detailsItem'>
                    <AiIcons.AiOutlineMail className="detailsItemIcon"/>
                    <span className='detailsItemText'>{data.email}</span>
                  </li>
                </ul>
                <div className='detailsTitleContainer'>
                  <span className='detailsTitle'>USER PERMISSIONS</span>
                </div>
                <ul className='detailsList'>
                  {
                    roles.map((item) =>
                      {
                        return (
                        <li className='detailsItem'>
                          <AiIcons.AiOutlineUnlock className="detailsItemIcon"/>
                          <span className='detailsItemText'>{item.description}</span>
                        </li>
                      )}
                    )
                  }
                </ul>
              </div>
            </div>
            <div className="buttonContainer">
                <Link to="/user/change_password">
                    <Button text="Change Password"/>
                </Link>
            </div>
        </div>
    )

}

export function ChangePasswordForm() {

    const username = sessionStorage.getItem("username");

    const url = `${BASE_URL}/users?username=${username}`;

    const data = FetchData({url});

    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        const newPassword = password;
        console.log(newPassword);
    }

    return (
        <div className='component' style={{width: '500px', marginTop: "30px"}}>
            <div className='titleContainer'>
                <AiIcons.AiOutlineUser className='componentTitleIcon'/>
                <h3 className='componentTitle'>{data.username}</h3>
            </div>
            <form className="form">
                <FormInput label="Enter Current Password" type="password"/>
                <FormInput label="Enter New Password" type="password" onChange={handleChange}/>
            </form>
            <div className="buttonContainer">
                <Button text={"Change Password"} onClick={handleSubmit}/>
            </div>
        </div>
    )


}
