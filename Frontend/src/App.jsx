import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import Layout from "./components/Layout/Layout";
import Policy from "./components/Privacy/Policy";
import Terms from "./components/Privacy/Terms";
import Contact from "./components/Contact/Contact";
import ProjectDetails from "./components/Projects/ProjectDetails";
import Cart from "./components/Projects/Cart/Cart";
import Checkout from "./components/Projects/Checkout/Checkout";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import FogotPassword from "./components/Auth/FogotPassword";
import DashboardLayout from "./components/Dashboard/layout/DashboardLayout";
import Dashboard from "./components/Dashboard/pages/Dashboard";
import Project from "./components/Dashboard/pages/Project/Project";
import Vouchers from "./components/Dashboard/pages/Vouchers";
import Reports from "./components/Dashboard/pages/Reports";
export const serverUrl = "https://investian.onrender.com";
import { ProjectsProvider } from "./components/Projects/Context/ProjectsContext";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), //easing
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <ProjectsProvider>
        <Routes>
          <Route path="/" element={<Layout />} />
          {/* Projects */}
          <Route path="/projects/:slug" element={<ProjectDetails />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Auth */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<FogotPassword />} />

          {/* Dashboard */}
          <Route path="/admin-dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Project />} />
            <Route path="vouchers" element={<Vouchers />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Policy */}
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="contact-us" element={<Contact />} />
        </Routes>
      </ProjectsProvider>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
};

export default App;
