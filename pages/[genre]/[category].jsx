// import { Breadcrumbs, Pagination, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";
import LayoutProduct from "../../components/layout/LayoutProduct";
import ListProductDetail from "../../components/ListproductDetail/ListProductDetail";
import Pagination from "../../components/pagination/Pagination";
import { TEXT_LOGO_CREW } from "../../public/assets/global-image";
import parse from "html-react-parser";
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

const LoaiSanPham = ({
  product,
  category,
  danhMuc,
  loaiSanPham,
  thuongHieu,
  blog,
}) => {
  const [page, setPage] = useState(product.currentPage);
  const [listProductFilter, setListProductFilter] = useState(product.product);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    setListProductFilter(product.product);
    setPage(product.currentPage);
    setFilter("");
  }, [product]);

  const handleChangePage = useCallback(
    (value) => {
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
      setListProductFilter((prev) =>
        [...prev].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (filter === "za") {
      setListProductFilter((prev) =>
        [...prev].sort((a, b) => b.name.localeCompare(a.name))
      );
    } else if (filter === "increase") {
      setListProductFilter((prev) =>
        [...prev].sort((a, b) => a.price - a.sale - (b.price - b.sale))
      );
    } else if (filter === "decrease") {
      setListProductFilter((prev) =>
        [...prev].sort((a, b) => b.price - b.sale - (a.price - a.sale))
      );
    } else if (filter === "newest") {
      setListProductFilter((prev) =>
        [...prev].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    } else if (filter === "oldest") {
      setListProductFilter((prev) =>
        [...prev].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
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
    () => (newValue, actionMeta) => {
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
        <title className="capitalize">Danh Mục {category.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Air Vape là nơi chuyên cung cấp những danh mục ${category.name} về vape uy tín và chất lượng.`}
        />
        <meta name="keywords" content={`air vape danh mục ${category.name}`} />
        <meta
          property="og:title"
          content={`Air vape danh mục ${category.name}`}
        />
        <meta
          property="og:url"
          content={`https://air-vape.vercel.app/${category.genre.slug}/${category.slug}?page=${page}`}
        />
        <meta
          property="og:image:alt"
          content={`https://air-vape.vercel.app/${category.genre.slug}/${category.slug}?page=${page}`}
        />
        <meta property="og:image" content={`${category.image.url}`} />
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
          <p color="text.primary" className="font-semibold capitalize">
            danh mục {category.name}
          </p>
        </div>
      </div>
      {/* <div className="lg:mx-[49px] xl:ml-[25px] xl:mr-[120px]">
        <SearchMenu />
      </div> */}
      <div className="pt-2 pb-5 rounded flex flex-col justify-start items-center w-full">
        <div className="flex items-center justify-between mb-7 mt-3 px-4 w-full">
          <h1 className="font-medium text-xs sm:text-lg border-l-4 border-red-400 pl-2 text-black capitalize">
            danh mục {category.name}
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
        {product.product.length > 0 && category?.desc && (
          <div className="w-full text-black flex flex-col justify-center items-start px-4 sm:px-3 lg:px-4 leading-7 text-sm sm:text-base mb-7">
            {parse(`${category.desc}`)}
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
          <>
            <div className="w-full flex justify-center items-center mt-6">
              <Pagination
                totalPage={product.totalPage}
                activePage={page}
                handleChange={handleChangePage}
              />
            </div>

            {blog?.content && (
              <>
                <div className="w-full h-[0.5px] bg-white my-7"></div>
                <div className="blog-content w-full text-black flex flex-col justify-center items-start px-4 sm:px-3 lg:px-4 leading-7 text-sm sm:text-base">
                  {parse(mdParser.render(`${blog?.content}`))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </LayoutProduct>
  );
};

export default LoaiSanPham;

export async function getServerSideProps(context) {
  const resData = await Promise.all([
    fetch(
      `https://air-vape.herokuapp.com/api/product/filter-category-product?page=${context.query.page}&&limit=12&&cat=${context.params.category}`
    ),
    fetch(
      `https://air-vape.herokuapp.com/api/category/slug-category?cat=${context.params.category}`
    ),
    fetch(`https://air-vape.herokuapp.com/api/genre/all-genre`),
    fetch(`https://air-vape.herokuapp.com/api/category/all-category`),
    fetch(`https://air-vape.herokuapp.com/api/brand/all-brand`),
    fetch(
      `https://air-vape.herokuapp.com/api/blog/filter-cate-blog?catSlug=${context.params.category}`
    ),
  ]);

  const jsons = await Promise.all(
    await Promise.all(resData.map((res) => res.json()))
  );

  return {
    props: {
      product: jsons[0],
      category: jsons[1],
      danhMuc: jsons[2],
      loaiSanPham: jsons[3],
      thuongHieu: jsons[4],
      blog: jsons[5],
    }, // will be passed to the page component as props
  };
}
