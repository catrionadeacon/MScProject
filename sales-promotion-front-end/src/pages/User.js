import * as RiIcons from "react-icons/ri";
import { ChangePasswordForm, EditDetailsComponent, UserDetailsComponent } from "../components/page-components/UserComponents";
import "../styles/page.css";

export function User() {
    return (
        <div className='page'>
            <div className='pageTop'>
                <RiIcons.RiFileUserLine className='pageTitleIcon'/>
                <h2 className='pageTitle'>USER INFORMATION</h2>
            </div>
            <div className='pageCentre'>
                <UserDetailsComponent/>
                <EditDetailsComponent/>
            </div>
        </div>

    )
}

export function ChangePassword() {
    return (
        <div className='page'>
          <div className='pageTop'>
            <RiIcons.RiLockPasswordLine className='pageTitleIcon'/>
            <h2 className='pageTitle'>CHANGE PASSWORD</h2>
          </div>
          <div className='pageCentre'>
            <ChangePasswordForm/>
          </div>
        </div>
      )
    
}