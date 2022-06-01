import parse from "html-react-parser";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LayoutHome from "../../components/layout/LayoutHome";
import ListProductRelate from "../../components/listproductrelate/ListProductRelate";
import MarkdownIt from "markdown-it";
import mila from "markdown-it-link-attributes";
import markdownItVideo from "markdown-it-video";
import "react-markdown-editor-lite/lib/index.css";

export const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
  langPrefix: "language-",
})
  .use(mila, {
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  })
  .use(markdownItVideo, {
    youtube: { width: 640, height: 390 },
    vimeo: { width: 500, height: 281 },
    vine: { width: 600, height: 600, embed: "simple" },
    prezi: { width: 550, height: 400 },
  });

export const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute left-0 sm:left-0 md:left-0 lg:left-[2px] 2xl:left-[17px] z-10 top-0 bottom-0 flex justify-center items-center">
      <div
        onClick={onClick}
        className="group w-10 h-10 flex justify-center items-center rounded-full hover:opacity-100 opacity-50 cursor-pointer transition-all duration-150 ease-linear"
      >
        <i>
          <MdOutlineArrowBackIos className="text-gray-400 text-lg sm:text-2xl md:text-3xl group-hover:text-black" />
        </i>
      </div>
    </div>
  );
};

export const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute right-0 sm:right-0 md:right-0 lg:right-0 2xl:right-[17px] z-10 top-0 bottom-0 flex justify-center items-center">
      <div
        onClick={onClick}
        className="group  w-10 h-10 flex justify-center items-center rounded-full hover:opacity-100 opacity-50 cursor-pointer transition-all duration-150 ease-linear"
      >
        <i>
          <MdOutlineArrowForwardIos className="text-gray-400 text-lg sm:text-2xl md:text-3xl group-hover:text-black" />
        </i>
      </div>
    </div>
  );
};

const ChiTietSanPham = ({
  product,
  relatedProduct,
  danhMuc,
  loaiSanPham,
  thuongHieu,
}) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [filterRelated, setFilterRelated] = useState([]);
  const [category, setcategory] = useState({
    genre: {
      slug: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    setFilterRelated(
      relatedProduct?.relateProduct.filter(
        (item) => item._id !== router.query.id
      )
    );
    setcategory(
      loaiSanPham.find((item, index) => item._id == product.category._id)
    );
  }, [router.query.id, relatedProduct]);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settings2 = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <LayoutHome data={{ danhMuc, loaiSanPham, thuongHieu }}>
      <Head>
        <title className="capitalize">Sản Phẩm {product.name}</title>
        <meta name="description" content={`${parse(product.desc)}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content={product.name} />
        <meta property="og:title" content={product.name} />
        <meta
          property="og:url"
          content={`https://air-vape.vercel.app/san-pham/${product._id}`}
        />
        <meta
          property="og:image:alt"
          content={`https://air-vape.vercel.app/san-pham/${product._id}`}
        />
        <meta property="og:image" content={`${product.image[0].image.url}`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <div className="flex items-center justify-center pt-[82.7px] lg:pt-[201.9px]">
        <div className="max-w-[370px] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-md xl:min-w-max xl:max-w-screen-xl">
          <div className="py-2 mb-4 mt-4 rounded w-[370px] sm:w-[640px] md:w-[768px] lg:w-[768px] xl:w-[1000px] 2xl:w-[1280px]">
            <div className="flex text-black">
              <Link href="/" passHref>
                <a className="hover:underline text-base font-normal capitalize">
                  Trang chủ
                </a>
              </Link>
              <p>&nbsp;/&nbsp;</p>
              <Link
                href={`/${category.genre.slug}/${product.category.slug}?page=1`}
                passHref
              >
                <a className="hover:underline text-base font-normal capitalize">
                  {product.category.name}
                </a>
              </Link>
              <p>&nbsp;/&nbsp;</p>
              <p color="text.primary" className="font-semibold capitalize">
                {product.name}
              </p>
            </div>
          </div>

          <div className="sm:py-5 rounded h-full w-[370px] sm:w-[640px] md:w-[768px] lg:w-[768px] xl:w-[1000px] 2xl:w-[1280px]">
            <div className="w-full flex flex-col sm:flex-row">
              <div
                className={`${
                  product.image.length > 1
                    ? "h-[452px] sm:h-[472px] lg:h-[502px] xl:h-[522px] 2xl:h-[602px]"
                    : "h-[302px] sm:h-[322px] lg:h-[352px] xl:h-[372px] 2xl:h-[452px]"
                } md:mr-[20px] xl:mx-[20px] 2xl:ml-[100px] w-full sm:px-0 sm:min-w-[20rem] sm:max-w-[20rem] md:min-w-[23rem] md:max-w-[23rem] lg:min-w-[24rem] lg:max-w-[24rem] 2xl:min-w-[30rem] 2xl:max-w-[30rem]`}
              >
                {product.image.length > 1 ? (
                  <div className="">
                    <div>
                      <Slider
                        asNavFor={nav2}
                        ref={(slider1) => setNav1(slider1)}
                        {...settings}
                      >
                        {product.image.map((item, index) => (
                          <div key={index} className="relative">
                            <Zoom>
                              <img
                                src={item.image.url}
                                alt=""
                                className="w-screen h-[300px] sm:h-[320px] lg:h-[350px] xl:h-[370px] 2xl:h-[450px] object-fill"
                                loading="lazy"
                              />
                            </Zoom>
                            {item?.instock === false && (
                              <div className="absolute top-0 right-0 px-3 h-10 z-10 bg-black flex items-center justify-center">
                                <p className="text-black text-center text-base uppercase tracking-widest font-thin">
                                  Hết hàng
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </Slider>
                    </div>
                    <div className="mt-3">
                      <Slider
                        asNavFor={nav1}
                        ref={(slider2) => setNav2(slider2)}
                        slidesToShow={
                          product.image.length < 3 ? product.image.length : 3
                        }
                        swipeToSlide={true}
                        {...settings2}
                        focusOnSelect={true}
                        className={``}
                      >
                        {product.image.map((item, index) => (
                          <div key={index} className="mx-[6px]">
                            <img
                              src={item.image.url}
                              alt=""
                              className="w-[109px] sm:w-[110px] lg:w-[105px] xl:w-[109px] h-[7rem] object-cover cursor-pointer border border-gray-200"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                ) : (
                  <div className="w-full sm:px-0 h-auto">
                    <div>
                      {product.image.map((item, index) => (
                        <div key={index} className="relative w-full">
                          <Zoom>
                            <img
                              src={item.image.url}
                              alt=""
                              className="w-screen h-[300px] sm:h-[320px] lg:h-[350px] xl:h-[370px] 2xl:h-[450px] object-fill"
                              loading="lazy"
                            />
                          </Zoom>
                          {item?.instock === false && (
                            <div className="absolute top-0 right-0 px-3 h-10 z-10 bg-black flex items-center justify-center">
                              <p className="text-black text-center text-base uppercase tracking-widest font-thin">
                                Hết hàng
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-auto px-1 pt-5 sm:pt-0 sm:px-0 2xl:mr-[100px]">
                <div className="mt-2">
                  <h1 className="pb-2 border-b border-dotted border-gray-300 text-xl text-black font-semibold mb-2 leading-8 tracking-wider text-left capitalize">
                    {product.name}
                  </h1>
                  <div className="flex justify-start items-center pb-2 pt-1 mb-2 border-b border-dotted border-gray-300">
                    {product.sale > 0 && (
                      <h1 className="mr-2 text-lg font-semibold leading-8 tracking-wider text-left text-red-500">
                        {(Math.round(product.price - product.sale) * 1000)
                          .toLocaleString()
                          .replace(/\,/g, ".")}
                        ₫
                      </h1>
                    )}
                    <h1
                      className={`${
                        product.sale > 0
                          ? "text-gray-300 line-through text-base"
                          : "text-red-500 text-lg"
                      } font-semibold leading-8 tracking-wider text-left`}
                    >
                      {(product.price * 1000)
                        .toLocaleString()
                        .replace(/\,/g, ".")}
                      ₫
                    </h1>
                  </div>
                  {product.introduce && (
                    <div className="flex justify-start items-center pb-2 pt-1 mb-2 border-b border-dotted border-gray-300">
                      <p className="mb-1 text-sm font-normal text-black tracking-wide leading-7 mr-1">
                        {parse(`${product.introduce}`)}
                      </p>
                    </div>
                  )}

                  <div className="flex pt-1 pb-2 border-b border-dotted border-gray-300 h-full">
                    {/* gap-2 */}
                    {category.genre.slug === "tinh-dau" ||
                    category.genre.slug === "pod-mot-lan" ? (
                      <p className="mb-1 text-sm font-normal text-black tracking-wide leading-7 mr-1">
                        Vị:
                      </p>
                    ) : (
                      <p className="mb-1 text-sm font-normal text-black tracking-wide leading-7 mr-1">
                        Màu:
                      </p>
                    )}
                    <div className="flex flex-wrap" aria-hidden="true">
                      {product.image.map((item, index) => (
                        <button
                          onClick={() => nav1.slickGoTo(index)}
                          key={index}
                          disabled={item.instock === true ? false : true}
                          className={`${
                            item.instock
                              ? `bg-black border-black`
                              : `bg-white border-black text-gray-500`
                          } mx-1 mb-1 mt-1 text-xs rounded-sm font-medium border ${
                            item.instock === true &&
                            "hover:bg-white hover:text-black"
                          }  text-white py-[0.5px] px-[5px] cursor-pointer transition-all duration-150 ease-linear relative`}
                        >
                          {item.name}
                          {item.instock === false && (
                            <>
                              <div className="bg-black absolute left-0 right-0 top-[50%] h-[0.5px] rotate-[14deg]"></div>
                              <div className="bg-black absolute left-0 right-0 top-[50%] h-[0.5px] -rotate-[14deg]"></div>
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex mt-5 mb-6">
                    <a
                      href="https://m.me/114255514603904"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Message"
                      className="bg-black w-full sm:w-[70%] py-4 flex justify-center items-center rounded-sm cursor-pointer group hover:bg-white border border-black transition-all origin-left duration-150 ease-linear"
                    >
                      <span className="uppercase font-semibold text-xs text-white tracking-widest group-hover:text-black">
                        Mua ngay
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm tracking-wider text-black font-semibold leading-5 ">
                      Chi tiết sản phẩm
                    </span>
                    <span className="text-sm text-black font-normal tracking-wider leading-7 flex items-center">
                      <span className="text-2xl mr-1 font-bold">•</span>
                      Tình trạng:&nbsp;
                      <span className="font-bold text-red-500">
                        {product.instock ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </span>

                    <span className="text-sm text-black font-normal tracking-wider leading-7 flex items-center">
                      <span className="text-2xl mr-1 font-bold">•</span>
                      Loại sản phẩm:&nbsp;
                      <span className="font-bold">{product.category.name}</span>
                    </span>

                    <span className="text-sm text-black font-normal tracking-wider leading-7 flex items-center">
                      <span className="text-2xl mr-1 font-bold">•</span>
                      Thương hiệu:&nbsp;
                      <span className="font-bold"> {product.brand.name}</span>
                    </span>

                    {(category.genre.slug === "pod-mot-lan") ===
                      "disposable-pod" && (
                      <span className="text-sm text-black font-normal tracking-wider leading-7 flex items-center">
                        <span className="text-2xl mr-1 font-bold">•</span>
                        Số hơi(puffs):&nbsp;
                        <span className="font-bold">{product.puffs}</span>
                      </span>
                    )}
                    {(category.genre.slug === "tinh-dau" ||
                      category.genre.slug === "pod-mot-lan") && (
                      <span className="text-sm text-black font-normal tracking-wider leading-7 flex items-center">
                        <span className="text-2xl mr-1 font-bold">•</span>
                        Liều lượng nicotine:&nbsp;
                        <span className="font-bold">{product.nicotine}</span>
                      </span>
                    )}
                    {category.genre.slug === "tinh-dau" && (
                      <span className="text-sm text-black font-normal tracking-wider leading-7 flex items-center">
                        <span className="text-2xl mr-1 font-bold">•</span>
                        Dung tích:&nbsp;
                        <span className="font-bold">{product.capacity}</span>
                      </span>
                    )}
                    {category.genre.slug === "pod-mot-lan" && (
                      <span className="text-sm text-black font-normal tracking-wider leading-7 flex items-center">
                        <span className="text-2xl mr-1 font-bold">•</span>{" "}
                        Battery:&nbsp;
                        <span className="font-bold">{product.battery}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:mx-1 mt-7 border-black border-t pt-5 mx-2">
              <span className="text-sm tracking-wider font-semibold sm:mx-2 leading-5 text-black">
                Mô tả
              </span>
              <div className="blog-content text-[0.93rem] text-black font-normal sm:mx-2 tracking-wide leading-6 mt-1 max-w-[370px] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-md xl:max-w-screen-xl overflow-hidden">
                {parse(mdParser.render(`${product?.desc}`))}
              </div>
            </div>
            <div className="mt-5 border-black border-t sm:mx-1 mb-5">
              <h1 className="font-semibold text-xl my-3 text-black ml-2">
                Sản phẩm tương tự
              </h1>
              <ListProductRelate data={filterRelated} />
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default ChiTietSanPham;

export async function getServerSideProps(context) {
  const response = await Promise.all([
    fetch(
      `https://air-vape.herokuapp.com/api/product/detail-product/${context.params.id}`
    ),
    fetch(
      `https://air-vape.herokuapp.com/api/product/relate-product/${context.params.id}?limit=4`
    ),
    fetch(`https://air-vape.herokuapp.com/api/genre/all-genre`),
    fetch(`https://air-vape.herokuapp.com/api/category/all-category`),
    fetch(`https://air-vape.herokuapp.com/api/brand/all-brand`),
  ]);
  const json = await Promise.all(response.map((res) => res.json()));

  return {
    props: {
      product: json[0],
      relatedProduct: json[1],
      danhMuc: json[2],
      loaiSanPham: json[3],
      thuongHieu: json[4],
    }, // will be passed to the page component as props
  };
}
