import React from "react";
import Nav from "../Navbar/Nav";
import { Outlet } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <section className="min-h-screen w-screen flex flex-col bg-slate-100">
        <Nav />
        <main className="mx-auto my-auto">
          <Outlet />
        </main>
      </section>
    </>
  );
}

export default LandingPage;
