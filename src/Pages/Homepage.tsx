import React from "react";
import MainCarousel from "../components/Carousel/MainCarousel";
import Header from "../components/Header";
import Footer from "../components/Footer";





const Homepage = () => {
 
  return (
    <>
    <Header/>
    <div className="mt-20">
    <MainCarousel/>
    
  
    </div>
    <Footer/>
   

    
      
    </>
  );
};

export default Homepage;