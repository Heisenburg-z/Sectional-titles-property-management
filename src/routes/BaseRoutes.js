import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../Pages/Home/LandingPage/LandingPage";
import About from "../Pages/About/About";
import LoginForm from "../Pages/Login/LoginForm";
import Error404 from "../Pages/Errors/Error404";
import Hero from "../Pages/Home/Hero/Hero";

const baseRoute = (
  <Route>
    <Route path="/" element={<LandingPage />}>
      <Route path="" element={<Hero />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  </Route>
);

export default baseRoute;
