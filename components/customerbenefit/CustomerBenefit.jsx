import React from "react";
import { GrTrophy } from "react-icons/gr";
import { FiTruck } from "react-icons/fi";
import { RiShieldStarLine } from "react-icons/ri";
const CustomerBenefit = () => {
  return (
    <section
      data-aos="zoom-in-up"
      className="bg-black hidden md:flex justify-around items-center py-10 mt-10 overflow-hidden"
    >
      <div
        data-aos="fade-right"
        data-aos-duration="1500"
        data-aos-delay="100"
        className="flex-[1]"
      >
        <h1 className="uppercase font-extrabold md:text-lg lg:text-2xl 2xl:text-3xl tracking-wide text-center text-white">
          why shop with us?
        </h1>
      </div>
      <ul className="flex-[2] flex justify-around items-center">
        <li
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-delay="100"
          className="flex flex-col justify-center items-center lg:max-w-[180px] max-w-[220px]"
        >
          <i>
            <GrTrophy className="md:text-xl lg:text-2xl xl:text-3xl mb-2 text-white" />
          </i>
          <p className="uppercase md:text-[0.6rem] lg:text-[0.65rem] xl:text-xs text-center leading-5 tracking-wider font-semibold text-white">
            our best prices online
          </p>
        </li>
        <li
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-delay="300"
          className="flex flex-col justify-center items-center max-w-[220px]"
        >
          <i>
            <FiTruck className="md:text-xl lg:text-2xl xl:text-3xl mb-2 text-white" />
          </i>
          <p className="uppercase md:text-[0.6rem] lg:text-[0.65rem] xl:text-xs text-center leading-5 tracking-wider font-semibold text-white">
            free delivery
          </p>
        </li>
        <li
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-delay="500"
          className="flex flex-col justify-center items-center max-w-[220px]"
        >
          <i>
            <RiShieldStarLine className="md:text-xl lg:text-2xl xl:text-3xl mb-2 text-white" />
          </i>
          <p className="uppercase md:text-[0.6rem] lg:text-[0.65rem] xl:text-xs text-center leading-5 tracking-wider font-semibold text-white">
            100% money back guarantee
          </p>
        </li>
      </ul>
    </section>
  );
};

export default CustomerBenefit;
