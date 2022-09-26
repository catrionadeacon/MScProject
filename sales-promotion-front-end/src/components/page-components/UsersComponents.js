import { FetchData, PostData } from "../../adapters/GeneralAdapter";
import Table from "../general/Table";
import { UserColumns } from "../../datagrid-columns/UserDatagridColumns";
import { useState } from "react";
import { Button } from "../general/Button";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { FormCheckbox, FormInput } from "../general/FormInput";
import { FetchRoleOptions, FetchUserRoles } from "../../adapters/UserAdapter";
import "../../styles/component.css";
import { useNavigate } from "react-router-dom/dist";
import { BASE_URL } from "../../Constants";

export function UsersList() {

    const url = `${BASE_URL}/users`;

    const data = FetchData({url});

    return (
        <Table data={data} columns={UserColumns}/>
    )
}

export function UsersDetails({id}) {

    const url = `${BASE_URL}/users/${id}`;

    const data = FetchData({url});

    const username = data.username;

    const roles = FetchUserRoles({username});

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
        </div>
      ) 
    
    
}

export function EditUsersDetails({id}) {

    const url = `${BASE_URL}/users/${id}`;

    const data = FetchData({url});

    const Options = [
        {value: "accountManager", text: "Account Manager"},
        {value: "commercialManager", text: "Commercial Manager"},
        {value: "stockManager", text: "Stock Manager"},
        {value: "accountingManager", text: "Accounting Manager"},
        {value: "systemAdministrator", text: "System Administrator"}
    ];

    const [checkSelection, setCheckSelection] = useState([]);

    const handleChange = (e) => {
        if (e.currentTarget.checked) {
        setCheckSelection([...checkSelection, e.target.value]);
        } else {
        const newArr = checkSelection.filter((item) => item !== e.target.value);
        setCheckSelection(newArr);
        }
    }

    return (
        <div className='component'>
          <div className='titleContainer'>
            <AiIcons.AiOutlineForm className='componentTitleIcon'/>
            <h3 className='componentTitle'>Edit</h3>
          </div>
          <div className="detailsSectionContainer">    
                <form className="form">
                <FormInput label="First Name" type="text" placeholder={data.firstName}/>
                <FormInput label="Last Name" type="text" placeholder={data.lastName}/>
                <FormInput label="Username" type="text" placeholder={data.username}/>
                <FormInput label="Email" type="email" placeholder={data.email}/>
                </form>
                <div className="detailsSection">
                <form className="form">
                    <FormCheckbox 
                    label="Select Roles" 
                    options={Options} 
                    onChange={handleChange}
                    />
                </form>   
                </div>
          </div>
          <div className="buttonContainer">
            <Button text={"Update Details"}/>
          </div>
        </div>
      )
}

export function NewUserForm() {

    const navigate = useNavigate();

    const roles = FetchRoleOptions();

    const RoleOptions = Array.from(roles.values()).map((r) => {return {value: r.code, text: r.description}});

    const [userRoles, setUserRoles] = useState(new Map());

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        roles: []
    })

    function handleChangeRole(e) {

        const rolesMap = new Map(userRoles);

        const role = {code: e.target.value};

        if (e.currentTarget.checked) {
            rolesMap.set(e.target.value, role);
        } else {
            rolesMap.delete(e.target.value);
        }

        setUserRoles(rolesMap);

        const newRoles = Array.from(rolesMap.values());

        let newUser = {...user};

        newUser.roles = newRoles;

        setUser(newUser);
    }

    const handleChangeUser = (e) => {
        e.preventDefault();
        setUser({...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        
        const newUser = user;

        const url = `${BASE_URL}/users`;

        PostData({url, newUser});

        navigate(-1);
    }

    return (
        <div className='component'>
            <div className='titleContainer'>
                <AiIcons.AiOutlineAlignLeft className='componentTitleIcon'/>
                <h3 className='componentTitle'>New User Details</h3>
            </div>
            <div className="detailsSectionContainer">
                
                <form className="form">
                    <FormInput name="firstName" label="First Name" type="text" onChange={handleChangeUser}/>
                    <FormInput name="lastName" label="Last Name" type="text" onChange={handleChangeUser}/>
                    <FormInput name="email" label="Email" type="email" onChange={handleChangeUser}/>
                    <FormInput name="username" label="Username" type="text" onChange={handleChangeUser}/>
                    <FormInput name="password" label="Password" type="password" onChange={handleChangeUser}/>
                </form>
                
                <div className="detailsSection">
                    <form className="form">
                        <FormCheckbox 
                            label="Select Roles" 
                            options={RoleOptions} 
                            onChange={handleChangeRole}
                        />
                    </form>   
                </div>

            </div>
            <div className="buttonContainer">
                <Button text="Add New User" onClick={handleSubmit}/>
            </div>
        </div>
    )

}
