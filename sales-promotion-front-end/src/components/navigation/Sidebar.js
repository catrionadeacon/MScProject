import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "../../styles/sidebar.css";
import { LogoutButton } from "../general/Button";
import {GetSidebarData} from "./SidebarData";
  
const Nav = styled.div`
  background: white;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 20px 7px #eff2f2;
  top: 0;
  z-index: 999;
`;
  
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 51px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LogoIcon = styled.span`
  margin-left: 210px;
  font-size: 27px;
  height: 55px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
  
const SidebarNav = styled.nav`
  background: #2795a4;
  width: 260px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
  
const SidebarWrap = styled.div`
  width: 100%;
`;

function handleLogout() {
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("username");
}

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    
    const showSidebar = () => setSidebar(!sidebar);

    const SidebarData = GetSidebarData();

    console.log(SidebarData);

    return (
      <>
        <IconContext.Provider value={{ color: "white" }}>
          <Nav>
            <div className="logoSidebarContainer">
              <NavIcon to="#">
                <AiIcons.AiOutlineMenuUnfold color= "#00bcd4" onClick={showSidebar} />
              </NavIcon>
              <LogoIcon>
                <FcIcons.FcComboChart/>
              </LogoIcon>
              <h1 className="header">
                SALES PROMOTION 
              </h1>
            </div>
            <Link to="/login">
              <LogoutButton onClick={handleLogout}/>
            </Link>
          </Nav>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap className="sidebar">
              <NavIcon to="#">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      </>
    );
  };
    
  export default Sidebar;
