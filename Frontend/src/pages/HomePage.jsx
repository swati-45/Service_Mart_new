import React from "react";
// import PageWrapper from "../components/PageWrapper";
import HeroSection from "./components/HeroSection";
import ServicesGrid from "./components/ServicesGrid";
import TopProviders from "./components/TopProviders";
import HowItWorks from "./components/HowItWorks";
import PromoBanner from "./components/PromoBanner";

const HomePage = () => {
  return (
    <>
    {/* // <PageWrapper
    //   title="Trusted Home Services at Fixed Prices"
    //   description="Book verified electricians, plumbers, AC technicians and more across India. Fixed pricing, quality guaranteed."
    // > */}
      <HeroSection />
      <ServicesGrid />
      <PromoBanner />
      <HowItWorks />
      <TopProviders />
    {/* // </PageWrapper> */}
    </>
  );
};

export default HomePage;
