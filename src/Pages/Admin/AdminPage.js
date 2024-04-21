import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './AdminPage.css'
import { useAuth } from '../../utils/auth';


function AdminPage() {

  const auth = useAuth();
  const navigate = useNavigate();
  const logout= ()=>{

    auth.logout();
    navigate('/');

  }
  return (
    <section>
        <h1 className='adminDash'>Admin Dashboard</h1>
        <NavLink to={"/signup"} className="linkToSignUp">SignUp</NavLink>
        <Outlet/>

        <button onClick={logout}>logout</button>
    </section>
  )
}

export default AdminPage
