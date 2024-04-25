import React from 'react'
import './StaffPage.css'
import { Outlet } from "react-router-dom";
import StaffSideBar from "./Components/SideBar/StaffSideBar";
import StaffTopNav from "./Components/TopNav/StaffTopNav";
import StaffMain from './Components/MainSection/StaffMainSection';

function StaffPage() {
  return (
    <section className="body">
      <StaffTopNav className="header" />
      <StaffSideBar className="sidebar" />
      <StaffMain className="main">
        <Outlet />
      </StaffMain>
    </section>
  )
}

export default StaffPage
