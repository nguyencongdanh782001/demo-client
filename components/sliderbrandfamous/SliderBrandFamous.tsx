import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return <div className="hidden"></div>;
};

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return <div className="hidden"></div>;
};

const SliderBrandFamous = ({ data }: any) => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 0,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };
  return (
    <section
      className={`w-full border-y-[3px] border-white relative top-0 from-[rgb(29,54,64)] bg-gradient-to-tr to-[rgb(73,181,223)] pt-2 mt-20 mb-5`}
    >
      <Slider {...settings}>
        {data.map((item: any, index: any) => (
          <div className="w-full" key={index}>
            <img
              src={item.image.url}
              alt=""
              className="object-cover h-[100px] w-[100px]"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SliderBrandFamous;
