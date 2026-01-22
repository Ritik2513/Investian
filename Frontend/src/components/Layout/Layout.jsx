import { useEffect } from "react";
import About from "../pages/About";
import Design from "../pages/Design";
import Dream from "../pages/Dream";
import Features from "../pages/Features";
import Footer from "../pages/Footer";
import Hero from "../pages/Hero";
import Impact from "../pages/Impact";
import Navbar from "../pages/Navbar";
import Voucher from "../pages/Voucher";
import Projects from "../Projects/Projects";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300); //slight delay ensure dom is ready
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <Dream />
      <Projects />
      <Design />
      <Impact />
      <About />
      <Features />
      <Voucher />
      <Footer />
    </>
  );
};

export default Layout;
