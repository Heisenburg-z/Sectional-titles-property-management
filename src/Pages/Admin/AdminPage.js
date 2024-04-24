import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminPage.css";
import { useAuth } from "../../utils/auth";

function AdminPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const logout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <section>
      <h1 className="adminDash">Admin Dashboard</h1>
      <NavLink to={"signup"} className="linkToSignUp">
        SignUp
      </NavLink>
      <button onClick={logout}>logout</button>
      <Outlet />
    </section>
  );
}

export default AdminPage;
