import React from "react";
import Footer from "../footer/Footer";
import Message from "../message/Message";
import NavBar from "../navbar/NavBar";
import SideBar from "../sidebar/SideBar";
import Warning from "../warning/Warning";

const LayoutProduct = ({ children, scrollNavBar, data }: any) => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-white">
      <Warning />
      <Message />
      <NavBar scrollNavBar={scrollNavBar} data={data} />
      <main className="pt-[82px] lg:pt-[201.4px] flex justify-center items-start w-[90%] 2xl:max-w-screen-2xl">
        <div className="flex-[1] sticky top-[201.4px] left-0 hidden lg:block">
          <SideBar data={data} />
        </div>
        <div className="flex-[4]">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default LayoutProduct;
