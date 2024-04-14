import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SignUpForm from '../SignUP/SignUpForm'

function AdminPage() {
  return (
    <section>
        <h1>Admin Dashboard</h1>
        <NavLink to={"signup"} >Sign Up</NavLink>
        <Outlet/>
    </section>
  )
}

export default AdminPage
