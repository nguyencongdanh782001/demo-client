import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const SideBar = ({ data }: any) => {
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useState(
    Array(data.loaiSanPham.length)
      .fill(0)
      .map((item: any) => ({
        open: false,
        first: true,
      }))
  );
  useEffect(() => {
    setOpenSideMenu(
      Array(data.loaiSanPham.length)
        .fill(0)
        .map((item: any) => ({
          open: false,
          first: true,
        }))
    );
  }, [data]);

  const handleChangeOpenSideMenu = ({ index }: any) => {
    const listMenu = [...openSideMenu];
    listMenu[index] = { first: false, open: !openSideMenu[index].open };
    setOpenSideMenu(listMenu);
  };

  const listBrand = data.loaiSanPham.map((cat: any, index: any) =>
    data.thuongHieu.filter((brand: any, indexBrand: any) =>
      brand.category.find((item: any) => item._id === cat._id)
    )
  );
  const catActive = router.query.category;
  const brandActive = router.query.brand;

  return (
    <div className="w-[250px] flex flex-col h-full mt-4 mb-4">
      <div className="py-2">
        <h3 className="uppercase text-base text-left font-semibold tracking-wide text-black">
          danh mục sản phẩm
        </h3>
      </div>
      <ul className="flex flex-col sider-bar-list max-h-[435px]">
        <li className={`sidebar-item flex justify-between items-center`}>
          <Link href="/khuyen-mai?page=1" passHref>
            <a className="py-2 text-gray-400 hover:text-black">
              sản phẩm khuyến mãi
            </a>
          </Link>
        </li>
        {data.loaiSanPham.map((cate: any, index: any) => (
          <li className={`sidebar-item flex flex-col h-auto`} key={index}>
            <div className={`flex justify-between items-center w-full`}>
              <Link
                href={`/${cate?.genre?.slug}/${cate?.slug}?page=1`}
                passHref
              >
                <a
                  className={`${
                    cate.slug === catActive
                      ? "text-black font-bold"
                      : "text-gray-400"
                  } py-2 hover:text-black`}
                >
                  {cate.name}
                </a>
              </Link>
              <i
                className={`cursor-pointer`}
                onClick={() => handleChangeOpenSideMenu({ index })}
              >
                <MdKeyboardArrowRight
                  className={`font-bold text-gray-500 text-2xl ${
                    openSideMenu[index].open === true ? "rotate-90" : ""
                  }  transition-all duration-300 hover:text-black`}
                />
              </i>
            </div>
            <ul
              className={`${
                openSideMenu[index].first === false
                  ? openSideMenu[index].open === true
                    ? "animate-showSiderDropMenu"
                    : "animate-hideSiderDropMenu"
                  : "hidden"
              } w-full mb-1 origin-top-left border-l sider-dropdown-list min-h`}
            >
              {listBrand[index].map((brand: any, indexBrand: any) => (
                <li key={indexBrand} className={`sider-dropdown-item`}>
                  <Link
                    href={`/${cate?.genre?.slug}/${cate?.slug}/${brand?.slug}?page=1`}
                  >
                    <a
                      className={`${
                        brandActive === `${brand.slug}`
                          ? "text-black font-bold"
                          : ""
                      }sider-dropdown-link`}
                    >
                      {brand.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
