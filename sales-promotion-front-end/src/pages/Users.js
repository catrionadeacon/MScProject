import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import { useParams } from "react-router-dom";
import { EditUsersDetails, NewUserForm, UsersDetails, UsersList } from "../components/page-components/UsersComponents";
import "../styles/page.css";

export function Users() {
    return (
        <div className='page'>
            <div className='pageTop'>
                <FiIcons.FiUsers className='pageTitleIcon'/>
                <h2 className='pageTitle'>USERS</h2>
            </div>
            <div className='pageCentre'>
                <UsersList/>
            </div>
        </div>

    )
}

export function EditUser() {

    const {id} = useParams();

    return (
        <div className='page'>
          <div className='pageTop'>
            <AiIcons.AiOutlineForm className='pageTitleIcon'/>
            <h2 className='pageTitle'>EDIT USER</h2>
          </div>
          <div className='pageCentre'>
            <UsersDetails id={id}/>
            <EditUsersDetails id={id}/>
          </div>
        </div>

    )
}

export function NewUser() {
    return (
        <div className='page'>
            <div className='pageTop'>
                <AiIcons.AiOutlineUserAdd className='pageTitleIcon'/>
                <h2 className='pageTitle'>NEW USER</h2>
            </div>
            <div className='pageCentre'>
                <NewUserForm/>
            </div>
        </div>

    )
}