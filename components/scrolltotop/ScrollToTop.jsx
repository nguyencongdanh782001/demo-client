import React, { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = () => {
  const [hideHeader, setHideHeader] = useState("hidden");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHideHeader("block");
      } else {
        setHideHeader("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={handleScrollToTop}
      className={`${hideHeader} animate-bounce p-2 sm:p-3 shadow-md shadow-gray-800 hover:-translate-y-1 fixed z-50 rounded-full bottom-10 left-5 bg-white text-black flex justify-center items-center cursor-pointer`}
    >
      <i>
        <MdKeyboardArrowUp className="text-2xl sm:text-3xl" />
      </i>
    </div>
  );
};

export default ScrollToTop;
