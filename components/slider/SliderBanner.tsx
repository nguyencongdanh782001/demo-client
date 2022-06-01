import React, { memo, useEffect, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="absolute left-2 sm:left-3 md:left-5 z-10 top-0 bottom-0 flex justify-center items-center">
      <div
        onClick={onClick}
        className="group h-7 w-7 sm:h-8 sm:w-8 md:w-10 md:h-10 bg-gray-300 flex justify-center items-center rounded-full hover:bg-gray-200 opacity-50 cursor-pointer"
      >
        <i>
          <MdOutlineArrowBackIos className="text-gray-500 text-lg sm:text-2xl md:text-3xl group-hover:text-gray-400" />
        </i>
      </div>
    </div>
  );
};

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="absolute right-2 sm:right-3 md:right-5 z-10 top-0 bottom-0 flex justify-center items-center">
      <div
        onClick={onClick}
        className="group h-7 w-7 sm:h-8 sm:w-8 md:w-10 md:h-10 bg-gray-300 flex justify-center items-center rounded-full hover:bg-gray-200 opacity-50 cursor-pointer"
      >
        <i>
          <MdOutlineArrowForwardIos className="text-gray-500 text-lg sm:text-2xl md:text-3xl group-hover:text-gray-400" />
        </i>
      </div>
    </div>
  );
};

const SliderBanner = ({ banner }: any) => {
  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1300,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section
      className={`w-full relative top-0 flex justify-center items-center overflow-hidden mt-10`}
    >
      <div className="w-full">
        <Slider {...settings}>
          {banner.map((item: any, index: any) => (
            <div className="w-full" key={index}>
              <img
                src={item.image.url}
                alt=""
                className="h-[130px] w-[260px] sm:w-screen sm:h-[290px] lg:h-[383px] xl:h-[422px] 2xl:h-[490px] object-fill"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default memo(SliderBanner);
