import React from "react";
import { Outlet } from "react-router-dom";
import "./AdminPage.css";
import SideBar from "./Components/SideBar/SideBar";
import TopNav from "./Components/TopNav/TopNav";
import AdminMain from "./Components/MainSection/AdminMainSection";

function AdminPage() {
  return (
    <section className="body">
      <TopNav />
      <SideBar />
      <AdminMain>
        <Outlet />
      </AdminMain>
    </section>
  );
}

export default AdminPage;
