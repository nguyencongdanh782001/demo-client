import React from "react";
import { SiZalo } from "react-icons/si";
import { MdPhone } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";
import { BsFillCreditCardFill } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="mt-auto w-full flex flex-col justify-center">
      <div className="flex flex-col justify-between  py-7 px-7 lg:flex-row border-b border-white  lg:py-5 lg:px-20 text-white bg-black">
        {/* lg:gap-x-20 gap-y-5 */}
        <div className="flex-1 lg:mr-10 my-3">
          <h3 className="uppercase tracking-wider text-xl font-semibold leading-8">
            Air Vape
          </h3>
          <div className="w-11 border-[1.5px] border-red-400 bg-red-400 mt-1 mb-4"></div>
          <div>
            <p className="text-base leading-6 tracking-wide font-normal mb-4">
              Air Vape là cửa hàng chính hãng cung cấp tinh dầu, thân máy, đầu
              đốt, phụ kiện vape với sự phục vụ chuyên nghiệp và uy tín hàng đầu
              Việt Nam.
            </p>
            <p className="mb-2 text-base leading-6 tracking-wide font-normal flex items-center gap-x-2">
              <MdPhone />
              Hotline: 0909685420
            </p>
            <p className="mb-2 text-base leading-6 tracking-wide font-normal flex items-center gap-x-2">
              <SiZalo />
              Zalo: 0909685420
            </p>
            <p className="mb-2 text-base leading-6 tracking-wide font-normal flex items-center gap-x-2">
              <IoStorefront />
              Địa chỉ: 168 Lê Thị Bạch Cát, Phường 11, Quận 11, Thành phố Hồ Chí
              Minh 70000, Việt Nam
            </p>
            <p className="mb-2 text-base leading-6 tracking-wide font-normal flex items-center gap-x-2">
              <BsFillCreditCardFill />
              Ngân hàng: 147631596 - VP Bank ( Việt Nam Thịnh Vượng )
            </p>
          </div>
        </div>
        <div className="flex-1 lg:w-[20%] lg:ml-10 my-3">
          <h3 className="uppercase tracking-wider text-xl font-semibold leading-8">
            fanpage facebook
          </h3>
          <div className="w-11 border-[1.5px] border-red-400 bg-red-400 mt-1 mb-4"></div>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fairvape3&tabs=timeline&width=280&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=270725018569589"
            width="280"
            height="130"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="airvape"
          ></iframe>
        </div>
        <div className="flex-1 lg:w-[20%] lg:ml-10 my-3">
          <h3 className="uppercase tracking-wider text-xl font-semibold leading-8">
            bản đồ
          </h3>
          <div className="w-11 border-[1.5px] border-red-400 bg-red-400 mt-1 mb-4"></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.582948140823!2d106.64628252196688!3d10.766590067789815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fcb7ad36f89%3A0x64d39a66b0e1727!2sAir%20Vape%20Store!5e0!3m2!1svi!2s!4v1653206040015!5m2!1svi!2s"
            width="280"
            height="130"
            style={{ border: "0" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="bg-black w-full py-4 text-white flex justify-center items-center">
        <p className="text-sm leading-6 tracking-wide font-normal">
          2022 - 2023 © Bản quyền thuộc Air Vape
        </p>
      </div>
    </footer>
  );
};

export default Footer;
