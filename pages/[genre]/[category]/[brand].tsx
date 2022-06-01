// import { Breadcrumbs, Pagination, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";
import LayoutProduct from "../../../components/layout/LayoutProduct";
import ListProductDetail from "../../../components/ListproductDetail/ListProductDetail";
import Pagination from "../../../components/pagination/Pagination";
import parse from "html-react-parser";
import { LOGO_AIR_VAPE } from "../../../public/assets/global-image";

const ThuongHieu = ({
  product,
  brand,
  danhMuc,
  loaiSanPham,
  thuongHieu,
  category,
}: any) => {
  const [page, setPage] = useState<number>(product.currentPage);
  const [listProductFilter, setListProductFilter] = useState(product.product);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    setListProductFilter(product.product);
    setPage(product.currentPage);
    setFilter("");
  }, [product]);

  const handleChangePage = useCallback(
    (value: any) => {
      setPage(value.selected + 1);
      router.push(
        `/danh-muc/${router.query.slug}?page=${value.selected + 1}`,
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
    { value: "increase", label: "Giá tăng dần" },
    { value: "decrease", label: "Giá giảm dần" },
    { value: "newest", label: "Mới nhất" },
    { value: "oldest", label: "Cũ nhất" },
  ];

  const handleChange = useMemo(
    () => (newValue: any, actionMeta: any) => {
      setFilter(newValue.value);
    },
    []
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <LayoutProduct data={{ danhMuc, loaiSanPham, thuongHieu }}>
      <Head>
        <title className="capitalize">Danh Mục {brand.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Air Vape là nơi chuyên cung cấp những danh mục ${brand.name} về vape uy tín và chất lượng.`}
        />
        <meta name="keywords" content={`air vape danh mục ${brand.name}`} />
        <meta property="og:title" content={`Air vape danh mục ${brand.name}`} />
        <meta
          property="og:url"
          content={`https://air-vape.vercel.app/${category.genre.slug}/${category.slug}/${brand.slug}?page=${page}`}
        />
        <meta
          property="og:image:alt"
          content={`https://air-vape.vercel.app/${category.genre.slug}/${category.slug}/${brand.slug}?page=${page}`}
        />
        <meta property="og:image" content={`${LOGO_AIR_VAPE.src}`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <div className="mx-4 py-2 mb-4 text-black my-4 rounded">
        <div className="flex">
          <Link href="/" passHref>
            <a className="hover:underline text-base font-normal capitalize">
              Trang chủ
            </a>
          </Link>
          <p>&nbsp;/&nbsp;</p>
          <Link
            href={`/${category.genre.slug}/${category.slug}?page=1`}
            passHref
          >
            <a className="hover:underline text-base font-normal capitalize">
              danh mục {category.name}
            </a>
          </Link>
          <p>&nbsp;/&nbsp;</p>
          <p color="text.primary" className="font-semibold capitalize">
            {brand.name}
          </p>
        </div>
      </div>
      {/* <div className="lg:mx-[49px] xl:ml-[25px] xl:mr-[120px]">
        <SearchMenu />
      </div> */}
      <div className="pt-2 pb-5 rounded flex flex-col justify-start items-center w-full">
        <div className="flex items-center justify-between mb-7 mt-3 px-4 w-full">
          <h1 className="font-medium text-xs sm:text-lg border-l-4 border-red-400 pl-2 text-black">
            {brand.name}
          </h1>
          <div className="flex justify-between items-center">
            {/* gap-x-3 */}
            <label
              id="Select"
              className="font-semibold text-xs sm:text-base mr-3 text-black"
            >
              Sắp Xếp:
            </label>
            <Select
              aria-labelledby="Select"
              options={options}
              onChange={handleChange}
              className="w-32 text-xs sm:text-sm sm:w-40"
              placeholder="Lựa chọn..."
            />
          </div>
        </div>
        {product.product.length > 0 && brand?.desc && (
          <div className="w-full text-black flex flex-col justify-center items-start px-4 sm:px-3 lg:px-4 leading-7 text-sm sm:text-base mb-7">
            {parse(`${brand.desc}`)}
          </div>
        )}
        <ListProductDetail data={listProductFilter} />
        {product.product.length < 1 && (
          <div className="w-full flex justify-center items-center mb-6 mt-12">
            {/* gap-x-2 */}
            <IoSearchOutline className="text-lg mr-2 text-black" />
            <p className="text-black">Không có sản phẩm</p>
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

export default ThuongHieu;

export async function getServerSideProps(context: any) {
  const resData = await Promise.all([
    fetch(
      `https://air-vape.herokuapp.com/api/product/filter-category-product?page=${context.query.page}&&limit=12&&cat=${context.params.category}&&brand=${context.params.brand}`
    ),
    fetch(
      `https://air-vape.herokuapp.com/api/brand/slug-brand?brand=${context.params.brand}`
    ),
    fetch(
      `https://air-vape.herokuapp.com/api/category/slug-category?cat=${context.params.category}`
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
      brand: jsons[1],
      category: jsons[2],
      danhMuc: jsons[3],
      loaiSanPham: jsons[4],
      thuongHieu: jsons[5],
    }, // will be passed to the page component as props
  };
}
