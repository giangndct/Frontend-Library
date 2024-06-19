import {
  AddShoppingCart,
  Email,
  FacebookOutlined,
  Instagram,
  Logout,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginProvider";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const Nav = () => {
  const context = useContext(LoginContext);
  useEffect(() => {
    context.handleCookie();
  }, []);
  return (
    <>
      <div className="inline-flex w-[100%] justify-between px-10 bg-[#0000] font-mono mb-[10px]">
        <div className="inline-flex ">
          <div className="inline-flex gap-2.5">
            <p className="text-[14px] mr-[8px] font-semibold">
              {" "}
              Liên hệ Hỗ trợ
            </p>
            <span>|</span>
          </div>
          <div className="flex">
            <Email></Email>
            <p>truonggiangg0802@gmail.com</p>
          </div>
        </div>
        <div className="inline-flex">
          <div className="flex items-center mr-[12px] cursor-pointer">
            <FacebookOutlined fontSize="small" className="ml-[5px]" />
            <p>Trường Giang</p>
          </div>
          <div className="flex items-center mr-[4px] cursor-pointer">
            <Instagram fontSize="small" className="ml-[5px]" />
            <p>truonggiangg0802</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-[20px] md:px-[108px] py-[10px] bg-[#263A29] text-white font-mono">
        <Link to="/">
          <div className="w-[100px]">
            <img src="data:image/png;base64,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"></img>
          </div>
        </Link>
        <div className="relative">
          <input
            type="text"
            className="md:w-[300px] lg:w-[400px] sm:py-[2px] md:py-[5px] pl-[12px] pr-[36px] outline-none"
          />
          <div className="absolute top-[0px] right-[0px] cursor-pointer bg-[#ccc] px-[8px] xs:py-[0px] sm:py-[2px] md:py-[4px]">
            {/* <Search
              sx={{
                width: { xs: "18px", md: "23px" },
                height: { xs: "18px", md: "23px" },
              }}
            /> */}
            <p>Tìm Kiếm</p>
          </div>
        </div>

        <div className="inline-flex">
          {context.active ? (
            <>
              <div className="flex items-center">
                <p className="text-[14px] mr-[8px]">
                  Xin chào {context.getLastName()}!
                </p>
                <Avatar sx={{ width: "20px", height: "20px" }}>
                  <Person fontSize="small" />
                </Avatar>
              </div>
              <div>
                <div
                  className="flex items-center cursor-pointer ml-[28px]"
                  onClick={context.handleLogout}
                >
                  <Logout fontSize="small" />
                  <p className="hidden sm:block text-[14px] ml-[8px]">
                    Đăng xuất
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <div className="flex ">
                  <p className="text-[14px] ml-[8px] font-semibold">
                    Đăng nhập
                  </p>
                  <span>|</span>
                </div>
              </Link>
              <Link to="/signup">
                <div className="flex">
                  <p className="text-[14px] ml-[8px] font-semibold">Đăng kí</p>
                  <span>|</span>
                </div>
              </Link>
            </>
          )}
          <div className="text-white cursor-pointer flex gap-2.5">
            <Link to="/order">
              <ShoppingCart
                sx={{
                  width: { xs: "18px", sm: "24px", md: "32px" },
                  height: { xs: "18px", sm: "24px", md: "32px" },
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
