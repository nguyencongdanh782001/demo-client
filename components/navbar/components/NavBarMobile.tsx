import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { LOGO_AIR_VAPE } from "../../../public/assets/global-image";
import useDebounce from "../../debounce/useDebounce";
import { useOnClickOutside } from "../../useOnclickoutside/useOnclickoutside";
interface OpenType {
  open: boolean;
  first: boolean;
}
const NavBarMobile = ({ data }: any) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<OpenType>({
    open: false,
    first: true,
  });

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listSearch, setListSearch] = useState<any>();
  const [openSearch, setOpenSearch] = useState({
    open: false,
    first: true,
  });

  useEffect(() => {
    if (openSearch.open === true || openMenu.open === true) {
      document.querySelector("body")!.classList.add("add-body-max-height");
    } else {
      document.querySelector("body")!.classList.remove("add-body-max-height");
    }
  }, [openSearch, openMenu]);

  useDebounce(searchValue, 300, async () => {
    const res = await fetch(
      `https://air-vape.herokuapp.com/api/product/search-product?page=1&&limit=4&&searchQuery=${searchValue}`
    );
    const data = await res.json();
    if (!res) {
      setIsLoading(true);
    } else {
      setListSearch(data);
      setIsLoading(false);
    }
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search?page=1&&search=${searchValue}`, undefined, {
      shallow: false,
    });
  };

  const searchInputRef = useRef<any>();

  const [showListSearch, setShowListSearch] = useState(false);

  useOnClickOutside(searchInputRef, (e) => {
    setShowListSearch(false);
  });

  const menuMobileRef = useRef<any>();

  useEffect(() => {
    if (openMenu.first === false && openMenu.open === true) {
      const listener = (e: Event) => {
        if (
          !menuMobileRef.current ||
          menuMobileRef.current.contains(e.target as Node)
        ) {
          return;
        }
        setOpenMenu({ open: false, first: false });
      };
      document.addEventListener("mousedown", listener, { passive: true });

      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }
  }, [openMenu]);

  const cateActive = router.query.category;

  return (
    <div className="flex justify-between items-center py-2 px-5 sm:px-4 navbar">
      <div>
        <i
          className="flex items-center text-2xl cursor-pointer"
          onClick={() =>
            setOpenMenu({
              open: true,
              first: false,
            })
          }
        >
          <HiMenu className="text-white" />
        </i>
      </div>
      <div
        className={`${
          openMenu.first === false
            ? openMenu.open
              ? "animate-showMenuMobile"
              : "animate-hideMenuMobile"
            : "hidden"
        } fixed top-0 left-0 right-0 bottom-0 z-40 w-screen h-screen flex flex-col items-start`}
      >
        <div
          className="w-[300px] bg-black h-screen z-30 mobile-menu-scroll"
          ref={menuMobileRef}
        >
          <div className="flex justify-end p-4">
            <i
              className="flex items-center text-2xl cursor-pointer text-white"
              onClick={() => setOpenMenu({ open: false, first: false })}
            >
              <AiOutlineClose className="text-white" />
            </i>
          </div>
          <ul className="flex-col justify-center items-center px-4">
            <li
              className={`${
                router.pathname === "/" ? "header-mobile-menu-item-active" : ""
              } header-mobile-menu-item`}
            >
              <Link href="/" passHref>
                <a className="header-mobile-menu-link">trang chủ</a>
              </Link>
            </li>
            {data.loaiSanPham.map((cate: any, index: any) => (
              <li
                key={index}
                className={`${
                  cateActive === cate.slug
                    ? "header-mobile-menu-item-active"
                    : ""
                } header-mobile-menu-item`}
              >
                <Link href={`/${cate?.genre?.slug}/${cate?.slug}?page=1`}>
                  <a className="header-mobile-menu-link">{cate.name}</a>
                </Link>
              </li>
            ))}
            <li
              className={`${
                router.pathname.split("?")[0] === "/khuyen-mai"
                  ? "header-mobile-menu-item-active"
                  : ""
              } header-mobile-menu-item border-none`}
            >
              <Link href="/khuyen-mai?page=1">
                <a className="header-mobile-menu-link">sản phẩm khuyến mãi</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center items-center w-full md:pl-44 lg:pl-0">
        <Link href="/" passHref>
          <a>
            <Image
              src={LOGO_AIR_VAPE}
              alt="Picture of the author"
              width="62px"
              height="60px"
              loading="lazy"
            />
          </a>
        </Link>
      </div>
      <div>
        <i
          className="flex items-center text-2xl cursor-pointer sm:hidden"
          onClick={() =>
            setOpenSearch({
              open: true,
              first: false,
            })
          }
        >
          <AiOutlineSearch className="text-white" />
        </i>
      </div>
      <div
        className={`${
          openSearch.first === false
            ? openSearch.open
              ? "animate-showMenuMobile"
              : "animate-hideMenuMobile"
            : "hidden"
        } fixed sm:hidden top-0 left-0 right-0 bottom-0 z-40 w-screen h-screen bg-white flex items-start`}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative mt-5"
          ref={searchInputRef}
          onClick={() => setShowListSearch(true)}
        >
          <input
            type="text"
            className="h-7 w-screen sm:w-[300px] outline-none pl-[38px] py-4 pr-11 font-medium text-xs text-gray-500"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <i className="absolute left-3 top-0 bottom-0 my-auto flex items-center">
            <BsSearch className="text-gray-400" />
          </i>
          <i
            className="absolute right-2 top-0 bottom-0 my-auto flex items-center"
            onClick={() =>
              setOpenSearch({
                open: false,
                first: false,
              })
            }
          >
            <AiOutlineClose className="text-gray-400 text-2xl" />
          </i>
          <ul
            className={`${
              showListSearch ? "block" : "hidden"
            }  border border-gray-300 left-0 right-0 z-20 overflow-hidden absolute bg-gray-50 mt-2`}
          >
            {isLoading ? (
              <li>
                <p>loading...</p>
              </li>
            ) : (
              <>
                {listSearch?.product.map((item: any, index: any) => (
                  <Link href={`/san-pham/${item._id}`} passHref key={index}>
                    <li className="cursor-pointer hover:bg-gray-200">
                      <div className="flex justify-between items-center border-b border-gray-300 py-3 px-2 mx-2">
                        <div className="pr-3">
                          <p className="text-xs font-normal tracking-wider">
                            {item.name}
                          </p>
                          <div className="flex justify-start items-center">
                            {item?.sale > 0 && (
                              <span className="mr-2 text-xs font-light tracking-wider">
                                {(Math.round(item?.price - item?.sale) * 1000)
                                  .toLocaleString()
                                  .replace(/\,/g, ".")}
                                ₫
                              </span>
                            )}
                            <span
                              className={`${
                                item?.sale > 0
                                  ? "text-gray-300 line-through text-xs"
                                  : "text-black"
                              } text-xs font-light tracking-wider`}
                            >
                              {(item?.price * 1000)
                                .toLocaleString()
                                .replace(/\,/g, ".")}
                              ₫
                            </span>
                          </div>
                        </div>
                        <div className="h-12 w-12">
                          <img
                            src={item.image[0].image?.url}
                            alt=""
                            className="h-10 w-10 sm:h-12 sm:w-12 object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
                {listSearch?.totalPage * listSearch?.product.length > 6 ? (
                  <li className="px-2 py-3">
                    <Link
                      href={`/search?page=1&&search=${searchValue}`}
                      passHref
                    >
                      <p className="text-center text-sm tracking-wider hover:text-red-400 cursor-pointer">
                        Xem thêm{" "}
                        {listSearch?.totalPage * listSearch?.product.length -
                          listSearch?.product.length}{" "}
                        sản phẩm
                      </p>
                    </Link>
                  </li>
                ) : (
                  listSearch?.product.length >= 2 && (
                    <li className="px-2 py-3">
                      <Link
                        href={`/search?page=1&&search=${searchValue}`}
                        passHref
                      >
                        <p className="text-center text-sm tracking-wider hover:text-red-400 cursor-pointer">
                          Xem thêm
                        </p>
                      </Link>
                    </li>
                  )
                )}
                {listSearch?.product.length < 1 && (
                  <li className="px-2 py-3 flex items-stretch justify-between w-full sm:max-w-[300px]">
                    {/* gap-1 */}
                    <IoSearchOutline className="flex-[1] text-lg mr-1" />
                    <div className="flex-[8] w-full">
                      <p className="text-sm tracking-wider sm:max-w-[300px] break-all">
                        {`Không tìm thấy kết quả cho "${searchValue}"`}
                      </p>
                    </div>
                  </li>
                )}
              </>
            )}
          </ul>
        </form>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative group hidden sm:block"
        ref={searchInputRef}
        onClick={() => setShowListSearch(true)}
      >
        <input
          type="text"
          className="h-7 sm:w-[250px] outline-none pl-[15px] rounded-sm py-4 pr-4 font-medium text-xs text-gray-500 border border-solid border-gray-400"
          placeholder="Nhập từ khóa để tìm kiếm..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSubmit}
        />
        <i className="absolute right-3 top-0 bottom-0 my-auto flex items-center">
          <BsSearch className="text-gray-700" />
        </i>
        <ul
          className={`${
            showListSearch ? "block" : "hidden"
          } mt-1 border border-gray-300 right-0 left-0 z-20 overflow-hidden absolute bg-gray-50 rounded-md`}
        >
          {isLoading ? (
            <li>
              <p>loading...</p>
            </li>
          ) : (
            <>
              {listSearch?.product.map((item: any, index: any) => (
                <Link href={`/san-pham/${item._id}`} passHref key={index}>
                  <li className="cursor-pointer hover:bg-gray-200">
                    <div className="flex justify-between items-center border-b border-gray-300 py-3 px-2 mx-2">
                      <div className="pr-3">
                        <p className="text-xs font-normal tracking-wider">
                          {item.name}
                        </p>
                        <div className="flex justify-start items-center">
                          {item?.sale > 0 && (
                            <span className="mr-2 text-xs font-light tracking-wider">
                              {(Math.round(item?.price - item?.sale) * 1000)
                                .toLocaleString()
                                .replace(/\,/g, ".")}
                              ₫
                            </span>
                          )}
                          <span
                            className={`${
                              item?.sale > 0
                                ? "text-gray-300 line-through text-xs"
                                : "text-black"
                            } text-xs font-light tracking-wider`}
                          >
                            {(item?.price * 1000)
                              .toLocaleString()
                              .replace(/\,/g, ".")}
                            ₫
                          </span>
                        </div>
                      </div>

                      <div className="h-12 w-12">
                        <img
                          src={item.image[0].image?.url}
                          alt=""
                          className="h-12 w-12 object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </li>
                </Link>
              ))}

              {listSearch?.product.length < 1 ? (
                <li className="px-2 py-3 flex items-start justify-center">
                  {/* gap-1  */}
                  <IoSearchOutline className="text-lg mr-1" />
                  <p className="text-center text-sm tracking-wider break-words max-w-[250px]">
                    {`Không tìm thấy kết quả cho "${searchValue}"`}
                  </p>
                </li>
              ) : listSearch?.totalPage * listSearch?.product.length > 6 ? (
                <li className="px-2 py-3">
                  <Link href={`/search?page=1&&search=${searchValue}`} passHref>
                    <p className="text-center text-sm tracking-wider hover:text-red-400 cursor-pointer">
                      Xem thêm{" "}
                      {listSearch?.totalPage * listSearch?.product.length -
                        listSearch?.product.length}{" "}
                      sản phẩm
                    </p>
                  </Link>
                </li>
              ) : (
                listSearch?.product.length < 2 && (
                  <li className="px-2 py-3">
                    <Link
                      href={`/search?page=1&&search=${searchValue}`}
                      passHref
                    >
                      <p className="text-center text-sm tracking-wider hover:text-red-400 cursor-pointer">
                        Xem thêm
                      </p>
                    </Link>
                  </li>
                )
              )}
            </>
          )}
        </ul>
      </form>
    </div>
  );
};

export default NavBarMobile;
