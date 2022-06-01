import Link from "next/link";
import React, { memo } from "react";
import ProductItemRelate from "./components/ProductItemRelate";
import "aos/dist/aos.css";

const ListProductRelate = ({ heading, data, link }: any) => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="max-w-7xl flex flex-col items-center justify-center">
        {data.length < 1 ? (
          <div>
            <p className="text-white font-medium text-lg">Chưa có sản phẩm</p>
          </div>
        ) : (
          <div className="max-w-7xl flex justify-start flex-wrap items-start ">
            {/* gap-7 */}
            {data?.length > 4
              ? data
                  ?.splice(0, 4)
                  .map((item: any, index: any) => (
                    <ProductItemRelate key={index} data={item} />
                  ))
              : data?.map((item: any, index: any) => (
                  <ProductItemRelate key={index} data={item} />
                ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(ListProductRelate);
