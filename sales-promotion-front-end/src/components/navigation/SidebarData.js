import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as TbIcons from "react-icons/tb";

export function GetSidebarData(){

    var rolesJson = localStorage.getItem("roles");
    var userRoleCode = new Set();
    if(rolesJson !== "[object Set]") {
      userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }

    console.log(userRoleCode)
  
    let Sidebar = [
        {
          title: "Dashboard",
          path: "/",
          icon: <AiIcons.AiFillHome />,
        },
    
        {
          title: "User",
          path: "/user",
          icon: <FaIcons.FaRegUserCircle />,
          iconClosed: <RiIcons.RiArrowDownSFill />,
          iconOpened: <RiIcons.RiArrowUpSFill />,
    
          subNav: [
            {
              title: "Change Password",
              path: "/user/change_password",
              icon: <RiIcons.RiLockPasswordLine />,
            },
          ],
        }
    ]
    
    if(userRoleCode.has("AccM")){
        Sidebar.push({
          title: "PAF",
          path: "/paf",
          icon: <AiIcons.AiOutlineForm />,
        },
        {
          title: "Invoice Requests",
          path: "/invoice_requests",
          icon: <TbIcons.TbFileInvoice />,
        },
        {
          title: "Paf Requests",
          path: "/my_paf_requests",
          icon: <BsIcons.BsQuestionCircle />,
        },
        {
          title: "Price Change Requests",
          path: "/price_change_requests",
          icon: <IoIcons.IoIosRefresh />,
        }
  
        )
    }
    
    if(userRoleCode.has("FinM")){
        Sidebar.push({
          title: "Invoice",
          path: "/invoice",
          icon: <TbIcons.TbFileInvoice />,
        },
        {
          title: "Off Invoice Price Changes",
          path: "/off_invoice_price_changes",
          icon: <IoIcons.IoIosRefresh />,
        })
    }
    
    if(userRoleCode.has("CommM")){
        Sidebar.push({
          title: "Price Change Requests",
          path: "/price_change_requests",
          icon: <IoIcons.IoIosRefresh />,
        }
      )
    }
    
    if(userRoleCode.has("CommM") || userRoleCode.has("StkM")){
        Sidebar.push({
          title: "PAF Requests",
          path: "/paf_requests",
          icon: <IoIcons.IoIosPaper />,
        })
    }
    
    if(userRoleCode.has("CommM") || userRoleCode.has("FinM") || userRoleCode.has("AccM")){
        Sidebar.push({
          title: "Promotions",
          path: "/promotions",
          icon: <BsIcons.BsGraphUp />,
        },
        {
          title: "Products",
          path: "/products",
          icon: <AiIcons.AiOutlineShopping />,
        },
        {
          title: "Customer Pricebook",
          path: "/customers",
          icon: <RiIcons.RiPriceTag2Line />,
        })
    }
  
    if(userRoleCode.has("SysAdm")){
        Sidebar.push({
          title: "Users",
          path: "/users",
          icon: <FiIcons.FiUsers />,
          iconClosed: <RiIcons.RiArrowDownSFill />,
          iconOpened: <RiIcons.RiArrowUpSFill />,
      
          subNav: [
            {
              title: "Add New User",
              path: "/new_user",
              icon: <AiIcons.AiOutlineUserAdd />,
            },
          ],
        })
    }
    
    return Sidebar;
}  
