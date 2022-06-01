import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavBarMobile from "./components/NavBarMobile";
import NavBarPc from "./components/NavBarPc";

interface PropsType {
  scrollNavBar: string;
  data: any;
}

const NavBar = ({ scrollNavBar, data }: PropsType) => {
  const [hideHeader, setHideHeader] = useState("block bg-white");
  const [isMobile, setIsMobile] = useState(false);
  const prevScroll = useRef<number>(0);
  const router = useRouter();
  const moblie = useMediaQuery({ maxWidth: "1023px" });
  useEffect(() => {
    setIsMobile(moblie);
  }, [moblie]);

  useEffect(() => {
    const handleScroll = () => {
      if (prevScroll.current === 0 || window.scrollY === 0) {
        setHideHeader("block bg-white");
      } else if (prevScroll.current < window.scrollY) {
        setHideHeader("animate-hideHeader");
      } else {
        setHideHeader(
          "block animate-showHeader bg-white shadow-md shadow-gray-400"
        );
      }
      prevScroll.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        scrollNavBar === "scroll" ? hideHeader : "block"
      } w-full text-black fixed top-0 right-0 z-20`}
    >
      {isMobile ? <NavBarMobile data={data} /> : <NavBarPc data={data} />}
    </header>
  );
};

export default NavBar;
