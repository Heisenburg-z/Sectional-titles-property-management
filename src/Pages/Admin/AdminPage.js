import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

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
