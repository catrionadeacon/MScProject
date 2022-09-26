import React from 'react';
import "../../styles/button.css";
import * as AiIcons from "react-icons/ai";

export function ApproveButton({onClick}) {
  return (
    <button className='approveButton' onClick={onClick}>
        <div className='buttonWithIcon'>
            <AiIcons.AiOutlineCheckSquare className='buttonIcon'/>
            <div>Approve</div>
        </div>
    </button>
  )
}

export function Button({text, onClick, type}) {
    return (
      <button className='button' onClick={onClick} type={type}>{text}</button>
    )
}

export function EditButton() {
    return (
      <button className='button'>
          <div className='buttonWithIcon'>
              <AiIcons.AiOutlineEdit className='buttonIcon'/>
              <div>Edit</div>
          </div>
      </button>
    )
}

export function RejectButton({onClick}) {
    return (
      <button className='rejectButton' onClick={onClick}>
          <div className='buttonWithIcon'>
              <AiIcons.AiOutlineCloseSquare className='buttonIcon'/>
              <div>Reject</div>
          </div>
      </button>
    )
}

export function RemoveButton({onClick}) {
    return (
      <AiIcons.AiOutlineDelete className='deleteButton' onClick={onClick}/>
    )
}

export function ViewButton() {
    return (
      <button className='button'>
          <div className='buttonWithIcon'>
              <AiIcons.AiOutlineEye className='buttonIcon'/>
              <div>View</div>
          </div>
      </button>
    )
}

export function LogoutButton({onClick}) {
  return (
    <button className='logoutButton' onClick={onClick}>
      <div className='buttonWithIcon'>
        <AiIcons.AiOutlineLogout className='logoutButtonIcon' style={{color: '#00bcd4'}}/>
        <div>Log Out</div>
      </div>
    </button>
  )
}
