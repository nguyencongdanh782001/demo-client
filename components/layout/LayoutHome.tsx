import React from "react";
import Footer from "../footer/Footer";
import Message from "../message/Message";
import NavBar from "../navbar/NavBar";
import Warning from "../warning/Warning";
import ScrollToTop from "../scrolltotop/ScrollToTop";
const LayoutHome = ({ children, scrollNavBar, data }: any) => {
  return (
    <div className="min-h-screen bg-white">
      <Warning />
      <Message />
      <ScrollToTop />
      <NavBar scrollNavBar={scrollNavBar} data={data} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutHome;
