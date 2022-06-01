import Link from "next/link";
import React, { memo } from "react";
import { FaCartPlus } from "react-icons/fa";

// interface PropsType {
//   data: {
//     _id: string;
//     name: string;
//     category: {
//       _id: string;
//       name: string;
//       slug: string;
//     };
//     brand: {
//       _id: string;
//       name: string;
//     };
//     desc: string;
//     capacity: string;
//     nicotine: string;
//     instock: boolean;
//     price: number;
//     sale: number;
//     image: [
//       {
//         name: string;
//         instock: boolean;
//         image: string;
//       }
//     ];
//   };
// }

const ProductDetailItem = ({ data }: any) => {
  return (
    <Link href={`/san-pham/${data._id}`} passHref>
      <div className="w-[46%] sm:w-[30%] lg:w-[30%] xl:w-[22.5%] 2xl:w-[22.5%] mx-[7px] my-[7px] sm:mx-[10px] sm:my-[15px] flex flex-col justify-center items-center cursor-pointer group border border-solid border-gray-300 rounded overflow-hidden bg-white">
        <div className="overflow-hidden relative">
          <img
            loading="lazy"
            src={data?.image[0].image.url}
            alt=""
            className="w-screen h-[170px] sm:h-[220px] lg:h-[225px] xl:h-[230px] 2xl:h-[270px] object-cover group-hover:scale-110 transition-all duration-200"
          />
          <i className="w-9 h-9 bg-black rounded-full flex justify-center items-center absolute opacity-0 -bottom-1 left-[45%] group-hover:-translate-y-5 group-hover:opacity-100 transition-all duration-500">
            <FaCartPlus className="text-white text-base" />
          </i>
          {data?.instock ? (
            data?.sale > 0 && (
              <div className="absolute right-0 top-0 px-2 bg-black flex items-center justify-center">
                <p className="text-white text-center text-sm sm:text-base uppercase tracking-widest font-thin">
                  -{(data?.sale * 100) / data?.price}%
                </p>
              </div>
            )
          ) : (
            <div className="absolute left-0 right-0 top-[42%] h-10 bg-black flex items-center justify-center">
              <p className="text-white text-center text-xl uppercase tracking-widest font-light">
                Hết hàng
              </p>
            </div>
          )}
        </div>
        <div className="w-full px-2 sm:px-3 flex flex-col justify-center items-center pt-3 pb-2 bg-white">
          <h5 className="name-product-item-limit text-center uppercase font-semibold text-xs lg:text-sm tracking-wide leading-6 min-h-[50px] lg:min-h-[42px] max-w-[140px] sm:max-w-[150px] lg:max-w-[230px]">
            {data?.name}
          </h5>
          <div className="flex flex-col sm:flex-row justify-start sm:justify-center items-center min-h-[47px]">
            {data?.sale > 0 && (
              <span className="sm:mr-2 text-red-500 text-center uppercase font-semibold text-sm tracking-wide leading-6 sm:leading-7 max-w-[120px] lg:max-w-[225px] overflow-hidden">
                {(Math.round(data?.price - data?.sale) * 1000)
                  .toLocaleString()
                  .replace(/\,/g, ".")}
                ₫
              </span>
            )}
            <span
              className={`${
                data?.sale > 0 ? "text-gray-300 line-through" : "text-red-500"
              } text-center font-semibold text-sm tracking-wide leading-6 sm:leading-7 max-w-[120px] lg:max-w-[225px] overflow-hidden`}
            >
              {(data?.price * 1000).toLocaleString().replace(/\,/g, ".")}₫
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductDetailItem);
