import Link from "next/link";
import React, { memo, useEffect } from "react";
import ProductItem from "./components/ProductItem";

// interface PropsType {
//   heading: string;
//   link: string;
//   data: [
//     {
//       _id: string;
//       name: string;
//       category: {
//         _id: string;
//         name: string;
//         slug: string;
//       };
//       brand: {
//         _id: string;
//         name: string;
//       };
//       desc: string;
//       capacity: string;
//       nicotine: string;
//       instock: boolean;
//       price: number;
//       sale: number;
//       image: [
//         {
//           name: string;
//           instock: boolean;
//           image: string;
//         }
//       ];
//     }
//   ];
// }
const ListProduct = ({ heading, data, link }: any) => {
  return (
    <section className="w-full flex items-center justify-center mt-16 ">
      <div className="max-w-7xl flex flex-col items-center justify-center">
        <div className="mb-7 relative flex items-center justify-center w-[300px] sm:w-[500px] lg:w-[650px]">
          <h2 className="uppercase text-center font-semibold text-xl sm:text-2xl px-3 bg-white lg:text-3xl tracking-wider leading-10 text-black z-10">
            {heading}
          </h2>
          <div className="border-[0.5px] left-0 right-0 absolute h-[2px] bg-black border-black"></div>
        </div>
        {data.length < 1 ? (
          <div>
            <p className="text-black font-medium text-lg">Chưa có sản phẩm</p>
          </div>
        ) : (
          <>
            <div
              className="max-w-7xl flex justify-center flex-wrap items-start "
              data-aos="fade-up"
            >
              {/* gap-7 */}
              {data?.length > 4
                ? data
                    ?.splice(0, 4)
                    .map((item: any, index: any) => (
                      <ProductItem key={index} data={item} index={index} />
                    ))
                : data?.map((item: any, index: any) => (
                    <ProductItem key={index} data={item} index={index} />
                  ))}
            </div>
            <div className="mt-8">
              <Link href={`/${link}?page=1`} passHref>
                <a className="border border-black border-solid rounded-sm py-2 px-4 text-center text-black font-medium hover:bg-gray-50 hover:text-black transition-all duration-200 ">
                  Xem thêm
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default memo(ListProduct);
