import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './AdminPage.css'

function AdminPage() {
  return (
    <section>
        <h1 className='adminDash'>Admin Dashboard</h1>
        <NavLink to={"/signup"} className="linkToSignUp">SignUp</NavLink>
        <Outlet/>
    </section>
  )
}

export default AdminPage
