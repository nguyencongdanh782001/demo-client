// import { Breadcrumbs, Pagination, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";
import LayoutProduct from "../components/layout/LayoutProduct";
import ListProductDetail from "../components/ListproductDetail/ListProductDetail";
import Pagination from "../components/pagination/Pagination";
import { LOGO_AIR_VAPE } from "../public/assets/global-image";

const Search = ({ product, danhMuc, loaiSanPham, thuongHieu }: any) => {
  const [page, setPage] = useState<number>(product.currentPage);
  const [listProductFilter, setListProductFilter] = useState(product.product);
  const [filter, setFilter] = useState("");

  const router = useRouter();

  useEffect(() => {
    setListProductFilter(product.product);
  }, [product.product]);

  const handleChangePage = useCallback(
    (value: any) => {
      setPage(value.selected + 1);
      router.push(
        `/search?page=${value.selected + 1}&&search=${router.query.search}`,
        undefined,
        {
          shallow: false,
        }
      );
    },
    [router]
  );

  useEffect(() => {
    if (filter === "az") {
      setListProductFilter((prev: any) =>
        [...prev].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (filter === "za") {
      setListProductFilter((prev: any) =>
        [...prev].sort((a, b) => b.name.localeCompare(a.name))
      );
    } else if (filter === "increase") {
      setListProductFilter((prev: any) =>
        [...prev].sort((a, b) => a.price - a.sale - (b.price - b.sale))
      );
    } else if (filter === "decrease") {
      setListProductFilter((prev: any) =>
        [...prev].sort((a, b) => b.price - b.sale - (a.price - a.sale))
      );
    } else if (filter === "newest") {
      setListProductFilter((prev: any) =>
        [...prev].sort((a, b) => {
          return (
            (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
          );
        })
      );
    } else if (filter === "oldest") {
      setListProductFilter((prev: any) =>
        [...prev].sort((a, b) => {
          return (
            (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any)
          );
        })
      );
    }
  }, [filter]);

  const options = [
    { value: "az", label: "A - Z" },
    { value: "za", label: `Z - A` },
    { value: "increase", label: "Gi?? t??ng d???n" },
    { value: "decrease", label: "Gi?? gi???m d???n" },
    { value: "newest", label: "M???i nh???t" },
    { value: "oldest", label: "C?? nh???t" },
  ];

  const handleChange = (newValue: any, actionMeta: any) => {
    setFilter(newValue.value);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <LayoutProduct data={{ danhMuc, loaiSanPham, thuongHieu }}>
      <Head>
        <title className="capitalize">T??m Ki???m</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Air Vape l?? n??i chuy??n cung c???p nh???ng s???n ph???m v??? vape uy t??n v?? ch???t l?????ng."
        />
        <meta name="keywords" content="Air vape t??m ki???m" />
        <meta property="og:title" content="Air vape t??m ki???m" />
        <meta
          property="og:url"
          content={`https://air-vape.vercel.app/search?page=${page}&&search=${router.query.search}`}
        />
        <meta
          property="og:image:alt"
          content={`https://air-vape.vercel.app/search?page=${page}&&search=${router.query.search}`}
        />
        <meta property="og:image" content={`${LOGO_AIR_VAPE.src}`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <div className="mx-4 py-2 mb-4 text-white my-4 rounded">
        <div className="flex">
          <Link href="/" passHref>
            <a className="hover:underline text-base font-normal ">Trang ch???</a>
          </Link>
          <p>&nbsp;/&nbsp;</p>
          <p color="text.primary" className="font-semibold">
            t??m ki???m
          </p>
        </div>
      </div>
      {/* <div className="lg:mx-[49px] xl:ml-[25px] xl:mr-[120px]">
        <SearchMenu />
      </div> */}
      <div className="pt-2 pb-5 rounded flex flex-col justify-start items-center w-full">
        <div className="flex items-center justify-between mb-7 mt-3 px-4 w-full">
          <h1 className="font-medium text-xs sm:text-lg border-l-4 border-red-400 pl-2 text-white">
            {`K???t qu??? cho "${router.asPath.split("search=")[1]}"`}
          </h1>
          <div className="flex justify-between items-center">
            {/* gap-x-3 */}
            <label
              id="Select"
              className="font-semibold text-xs sm:text-base mr-3 text-white"
            >
              S???p X???p:
            </label>
            <Select
              aria-labelledby="Select"
              options={options}
              onChange={handleChange}
              className="w-32 text-xs sm:text-sm sm:w-40"
              placeholder="L???a ch???n..."
            />
          </div>
        </div>
        <ListProductDetail data={listProductFilter} />
        {product.product.length < 1 && (
          <div className="w-full flex justify-center items-center mb-6 mt-12">
            {/* gap-x-2 */}
            <IoSearchOutline className="text-lg mr-2 text-white" />
            <p className="text-white">Kh??ng c?? s???n ph???m</p>
          </div>
        )}
        {product.product.length > 0 && (
          <div className="w-full flex justify-center items-center mt-6">
            <Pagination
              totalPage={product.totalPage}
              activePage={page}
              handleChange={handleChangePage}
            />
          </div>
        )}
      </div>
    </LayoutProduct>
  );
};

export default Search;

export async function getServerSideProps(context: any) {
  const resData = await Promise.all([
    fetch(
      `https://air-vape.herokuapp.com/api/product/search-product?page=${context.query.page}&&limit=12&&searchQuery=${context.query.search}`
    ),
    fetch(`https://air-vape.herokuapp.com/api/genre/all-genre`),
    fetch(`https://air-vape.herokuapp.com/api/category/all-category`),
    fetch(`https://air-vape.herokuapp.com/api/brand/all-brand`),
  ]);

  const jsons = await Promise.all(
    await Promise.all(resData.map((res) => res.json()))
  );

  return {
    props: {
      product: jsons[0],
      danhMuc: jsons[1],
      loaiSanPham: jsons[2],
      thuongHieu: jsons[3],
    }, // will be passed to the page component as props
  };
}
