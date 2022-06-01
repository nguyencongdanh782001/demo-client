import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Category from "../components/category/Category";
import CustomerBenefit from "../components/customerbenefit/CustomerBenefit";
import LayoutHome from "../components/layout/LayoutHome";
import ListProduct from "../components/listproduct/ListProduct";
import SliderBanner from "../components/slider/SliderBanner";
import SliderBrandFamous from "../components/sliderbrandfamous/SliderBrandFamous";
import { LOGO_AIR_VAPE } from "../public/assets/global-image";

const Home: NextPage = ({
  product,
  banner,
  khuyenMai,
  loaiSanPhamNoiBat,
  danhMuc,
  loaiSanPham,
  thuongHieuNoiTieng,
}: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hideHeader, setHideHeader] = useState(
    "lg:pt-[194.7px] xl:pt-[201.4px]"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHideHeader("lg:pt-[0px]");
      } else {
        setHideHeader("lg:pt-[194.7px] xl:pt-[201.4px]");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <LayoutHome scrollNavBar="scroll" data={{ danhMuc, loaiSanPham }}>
      <Head>
        <title className="capitalize">Air Vape</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Air Vape là nơi chuyên cung cấp những sản phẩm về vape uy tín và chất lượng."
        />
        <meta name="keywords" content="Air vape" />
        <meta property="og:title" content="Air vape" />
        <meta property="og:url" content={`https://air-vape.vercel.app/`} />
        <meta
          property="og:image:alt"
          content={`https://air-vape.vercel.app/`}
        />
        <meta property="og:image" content={`${LOGO_AIR_VAPE.src}`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <div
        className={`pb-10 pt-[82px] ${hideHeader} transition-all duration-100`}
      >
        <SliderBanner banner={banner} />
        <CustomerBenefit />
        <Category cat={loaiSanPhamNoiBat} genre={danhMuc} />
        <ListProduct
          heading="khuyến mãi"
          data={khuyenMai.product}
          link="khuyen-mai"
        />
        {product.map((item: any, index: any) => (
          <ListProduct
            key={index}
            heading={loaiSanPhamNoiBat[index].category.name}
            data={item.product}
            link={`${loaiSanPhamNoiBat[index].genre.slug}/${loaiSanPhamNoiBat[index].category.slug}`}
          />
        ))}
        <SliderBrandFamous data={thuongHieuNoiTieng} />
      </div>
    </LayoutHome>
  );
};

export default Home;

export async function getStaticProps(context: any) {
  const responses = await Promise.all([
    fetch("https://air-vape.herokuapp.com/api/banner/all-banner"),

    fetch(
      "https://air-vape.herokuapp.com/api/feature-category/all-feature-category"
    ),

    fetch(
      `https://air-vape.herokuapp.com/api/product/sale-product?page=1&&limit=15`
    ),

    fetch(`https://air-vape.herokuapp.com/api/genre/all-genre`),

    fetch(`https://air-vape.herokuapp.com/api/category/all-category`),

    fetch(`https://air-vape.herokuapp.com/api/famous-brand/all-famous-brand`),
  ]);

  const jsons = await Promise.all(responses.map((res) => res.json()));

  const product = await Promise.all(
    jsons[1].map((item: any, index: any) =>
      fetch(
        `https://air-vape.herokuapp.com/api/product/filter-category-product?page=1&&limit=4&&cat=${item.category.slug}`
      )
    )
  );
  const jsonProduct = await Promise.all(product.map((res) => res.json()));
  return {
    props: {
      product: jsonProduct,
      banner: jsons[0],
      loaiSanPhamNoiBat: jsons[1],
      khuyenMai: jsons[2],
      danhMuc: jsons[3],
      loaiSanPham: jsons[4],
      thuongHieuNoiTieng: jsons[5],
    },
    revalidate: 60,
  };
}
