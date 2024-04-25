import React from 'react'
import './ResidentsPage.css'
import { Outlet } from "react-router-dom";
import ResidentsSideBar from "./Components/SideBar/ResidentsSideBars";
import ResidentsTopNav from "./Components/TopNav/ResidentsTopNav";
import ResidentsMain from './Components/MainSection/ResidentsMainSection';

function ResidentsPage() {
  return (
    <section className="body">
      <ResidentsTopNav className="header" />
      <ResidentsSideBar className="sidebar" />
      <ResidentsMain className="main">
        <Outlet />
      </ResidentsMain>
    </section>
  )
}

export default ResidentsPage
