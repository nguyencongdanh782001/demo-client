import React from "react";
import { BsMessenger } from "react-icons/bs";
import { ImPhone } from "react-icons/im";
const Message = () => {
  return (
    <div className="fixed z-50 bottom-10 right-5 sm:bottom-8 sm:right-8 flex flex-col">
      <div className="relative flex sm:hidden items-center justify-center mb-5">
        <a
          href="tel:0909685420"
          target="_blank"
          rel="noreferrer"
          aria-label="phone"
          className="p-2 sm:p-3 bg-gradient-to-tr from-lime-500 to-green-500 rounded-full shadow-lg shadow-gray-500"
        >
          <span className="left-1 right-1 top-1 bottom-1 sm:left-2 sm:right-2 sm:top-2 sm:bottom-2 animate-ping absolute inline-flex rounded-full bg-green-400 opacity-75"></span>
          <i>
            <ImPhone className="shake-lr text-2xl sm:text-3xl text-white" />
          </i>
        </a>
      </div>
      <div className="relative flex items-center justify-center">
        <a
          href="https://m.me/114255514603904"
          target="_blank"
          rel="noreferrer"
          aria-label="Message"
          className="p-2 sm:p-3 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-gray-500"
        >
          <span className="left-1 right-1 top-1 bottom-1 sm:left-2 sm:right-2 sm:top-2 sm:bottom-2 animate-ping absolute inline-flex rounded-full bg-cyan-400 opacity-75"></span>
          <i>
            <BsMessenger className="text-2xl sm:text-3xl text-white" />
          </i>
        </a>
      </div>
    </div>
  );
};

export default Message;
