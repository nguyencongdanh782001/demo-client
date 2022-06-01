import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const Category = ({ cat }: any) => {
  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
  }, []);

  return (
    <section className="w-full flex justify-center items-center mt-10">
      <div className="max-w-screen-2xl overflow-hidden">
        <div className="flex justify-center items-center flex-wrap max-w-full">
          {/* gap-6 */}
          {cat?.map((item: any, index: any) => (
            <Link
              href={`/${item?.genre?.slug}/${item?.category?.slug}?page=1`}
              key={index}
              passHref
            >
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={`${index - 1}`}
                className="shadow-md shadow-gray-900 w-[45%] sm:w-[29%] md:w-[30%] lg:w-[29%] xl:w-[30%] 2xl:w-[25%] relative flex items-center cursor-pointer justify-center overflow-hidden rounded-lg m-2 md:m-3 lg:mx-4 lg:my-3"
              >
                <div className="w-screen group h-[110px] sm:h-[200px] md:h-[140px] lg:h-[160px] xl:h-[210px] 2xl:h-[220px]">
                  <img
                    loading="lazy"
                    src={`${item?.image.url}`}
                    alt={item?.category.name}
                    className="group-hover:scale-105 h-full w-full rounded-lg object-cover transition-all duration-200 ease-linear"
                  />
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-20 group-hover:opacity-50 transition-all duration-200"></div>
                </div>

                <div className="absolute flex justify-center lg:justify-between items-center m-auto transition-all w-full left-0 right-0 z-10 px-3 lg:bottom-2">
                  <h4
                    className="text-center uppercase font-semibold text-white text-base md:text-2xl lg:text-xl xl:text-2xl tracking-wide leading-7 md:leading-10"
                    style={{ textShadow: "2px 2px 2px #000" }}
                  >
                    {item?.category.name}
                  </h4>
                  <div className="hidden lg:flex bg-white cursor-pointer relative group lg:h-8 lg:w-20 xl:h-8 xl:w-24  items-center overflow-hidden rounded-sm">
                    <p className="z-10 absolute left-0 right-0 m-auto text-center font-semibold lg:text-xs xl:text-sm text-white group-hover:text-black">
                      Mua ngay
                    </p>
                    <div className="absolute left-0 top-0 right-0 bottom-0 bg-gray-600 z-0 group-hover:scale-x-0 origin-left ease-linear transition-all duration-200"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
