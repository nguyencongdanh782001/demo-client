import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { LOGO_AIR_VAPE } from "../../../public/assets/global-image";
import useDebounce from "../../debounce/useDebounce";
import { useOnClickOutside } from "../../useOnclickoutside/useOnclickoutside";

const NavBarPc = ({ data }: any) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listSearch, setListSearch] = useState<any>();

  useDebounce(searchValue, 300, async () => {
    try {
      const res = await fetch(
        `https://air-vape.herokuapp.com/api/product/search-product?page=1&&limit=4&&searchQuery=${searchValue}`
      );
      const data = await res.json();
      if (!res) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
        setListSearch(data);
      }
    } catch (error) {
      console.log(error);
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

  const listCate = data.danhMuc.map((danhmuc: any, index: any) =>
    data.loaiSanPham.filter(
      (cate: any, indecCat: any) => cate.genre._id === danhmuc._id
    )
  );
  const genreActive = router.query.genre;
  return (
    <div className="flex flex-col">
      <div
        className={`flex justify-between items-center py-5 navbar px-[50px]`}
      >
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-lg font-semibold tracking-wide text-white">
            Hot Line:
          </h4>
          <p className="text-lg font-semibold tracking-widest text-red-500 leading-5">
            0909685420
          </p>
        </div>
        <div>
          <div className="w-full ml-[90px] cursor-pointer">
            <Link href="/" passHref>
              <a>
                <Image
                  src={LOGO_AIR_VAPE}
                  alt="Picture of the author"
                  width="130px"
                  height="110px"
                  loading="lazy"
                />
              </a>
            </Link>
          </div>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative group"
          ref={searchInputRef}
          onClick={() => setShowListSearch(true)}
        >
          <input
            type="text"
            className="h-7 w-[280px] rounded-sm outline-none pl-[10px] py-5 pr-[38px] font-medium text-sm text-gray-500 border border-solid border-gray-400"
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
                        <div>
                          <p className="text-sm font-normal tracking-wider">
                            {item.name}
                          </p>
                          <div className="flex justify-start items-center">
                            {item?.sale > 0 && (
                              <span className="mr-2 text-sm font-light tracking-wider">
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
                              } text-sm font-light tracking-wider`}
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
                            src={item.image[0].image.url}
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
                  <li className="px-2 py-3 flex items-stretch justify-between w-full sm:max-w-[300px]">
                    {/* gap-1 */}
                    <IoSearchOutline className="flex-[1] text-lg mr-1" />
                    <div className="flex-[8] w-full">
                      <p className="text-sm tracking-wider sm:max-w-[300px] break-all">
                        {`Không tìm thấy kết quả cho "${searchValue}"`}
                      </p>
                    </div>
                  </li>
                ) : listSearch?.totalPage * listSearch?.product.length > 6 ? (
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
      <div className="bg-black">
        <ul className="flex justify-around items-center mx-[40px] ">
          {/* gap-x-8 */}
          <li
            className={`header-menu-item ${
              router.pathname === "/" ? "header-menu-item-active" : ""
            } mr-4`}
          >
            <Link href="/" passHref>
              <a className="header-menu-link">trang chủ</a>
            </Link>
            <div className="underline-item"></div>
          </li>
          {data.danhMuc.map((genre: any, index: any) => (
            <li
              className={`header-menu-item ${
                genreActive === `${genre.slug}` ? "header-menu-item-active" : ""
              } mx-4`}
              key={index}
            >
              <span className="header-menu-link">
                {genre?.name}
                <i className="icon-dropdown-menu">
                  <MdKeyboardArrowRight className="2xl:text-xl lg:text-lg" />
                </i>
              </span>
              <div className="underline-item"></div>
              <ul className="header-menu-dropdown menu-dropdown-animated dropdown-menu-scalwdown flex-wrap w-screen">
                {listCate[index].map((category: any, indexCat: any) => (
                  <li
                    className="header-menu-dropdown-item header-menu-dropdown-item-animated"
                    style={{
                      animationDelay: `${
                        (indexCat * 0.3) / listCate[index].length
                      }s`,
                    }}
                    key={indexCat}
                  >
                    <Link
                      href={`/${genre.slug}/${category.slug}?page=1`}
                      passHref
                    >
                      <a className="header-menu-dropdown-link">
                        <div className="header-menu-dropdown-link-item">
                          <img
                            loading="lazy"
                            src={category.image.url}
                            alt=""
                            className="header-menu-dropdown-img"
                          />
                          <span className="text-center font-semibold text-white">
                            {category.name}
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li
            className={`header-menu-item ${
              router.pathname.split("/")[1] === `khuyen-mai`
                ? "header-menu-item-active"
                : ""
            }`}
          >
            <Link href="/khuyen-mai?page=1 ">
              <a className="header-menu-link text-pop-up-top">khuyến mãi</a>
            </Link>
            <div className="underline-item"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarPc;
