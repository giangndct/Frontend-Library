import { Close } from "@mui/icons-material";
import { Alert, Collapse, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginProvider";
import axios from "axios";

const Formln = ({ gen = "login" }) => {
  const [mess, setMess] = useState("");
  const [open, setOpen] = useState(false);
  const [savePass, setSavePass] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const history = useNavigate();
  const context = useContext(LoginContext);
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  useEffect(() => {
    context.handleCookie();
    console.log(context.active);
    if (context.active) {
      history("/");
    }
    return () => {
      setOpen(false);
    };
  }, [gen, context.active]);

  const handleLogin = async () => {
    try {
      await axios
        .post(`http://localhost:8080/api/auth/signin`, {
          username: user.username,
          password: user.password,
        })
        .then((e) => {
          context.setUser(e.data);
          context.setActive(true);
          if (e.data.role === "admin") {
            context.setAdmin(true);
          } else {
            context.setAdmin(false);
          }
          history("/");
        })
        .then(() => {
          if (savePass) {
            context.deleteCooike();
            document.cookie = `username=${user.username};max-age=43200`;
          } else {
            context.deleteCooike();
          }
        })
        .catch((e) => {
          if (e.reponse.data === "Not found") {
            setMess("Vui long điển đầy đủ thông tin");
          } else if (e.reponse.data === "Wrong") {
            setMess("Tài khoản hoặc mật khẩu không đúng!");
            setUser((prev) => ({ ...prev, password: "" }));
          } else {
            setMess("Đã xảy ra lỗi đăng nhập!");
          }
          setOpen(true);
        });
    } catch (e) {
      setMess("Đã xảy ra lỗi đăng nhập!!!!");
      setOpen(true);
    }
  };
  const handleSignup = async () => {
    try {
      await axios
        .post("http://localhost:8080/api/auth/signup", {
          name: user.name,
          username: user.username,
          password: user.password,
          email: user.email,
        })
        .then((e) => {
          setMess("Đăng kí thành công!");
          setOpen(true);
        })
        .catch((e) => {
          if (e.response.data === "Not blank") {
            setMess("Vui lòng điền đầy đủ thông tin!");
          } else if (
            e.response.data ===
            "Username more than 5 characters and less 20 characters"
          ) {
            setMess("Tên tài khoản lớn hơn 5 kí tự và nhỏ hơn 20 kí tự");
          } else if (e.response.data === "Email not format") {
            setMess("Email không đúng định dạng");
            setUser((prev) => ({ ...prev, email: "" }));
          } else if (e.response.data === "Username exist") {
            setMess("Tên tài khoản đã tồn tại!");
            setUser((prev) => ({ ...prev, username: "" }));
          } else if (e.response.data === "Email exist") {
            setMess("Email đã tồn tại!");
            setUser((prev) => ({ ...prev, email: "" }));
          }
          setOpen(true);
        });
    } catch (e) {
      setMess("Đã xảy ra lỗi hiện tại không thể đăng kí!");
      setOpen(true);
    }
  };
  return (
    <div className="bg-[#F6FFDE] font-mono w-[80%] m-auto">
      <div className={`${gen === "signup" ? "loginSign" : "login"}`}>
        <div className="w-[100%] flex flex-col p-[40px] text-[30px] text-[#609966] font-semibold">
          {mess !== "" && (
            <Collapse in={open} className="mb-[8px]">
              <Alert
                severity="info"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
                sx={{
                  mb: "2px",
                  backgroundColor: "#312727",
                  width: "100%",
                  margin: "0 auto",
                  color: "#fff",
                }}
              >
                {mess}
              </Alert>
            </Collapse>
          )}
          <div>
            <h2>{gen === "login" ? "Đăng nhập" : "Đăng ký"}</h2>
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-5 items-center">
          {gen === "signup" && (
            <>
              <div className="w-[70%] flex gap-10 justify-center pb-5">
                <i class="bx bxs-user"></i>
                <label className="w-[20%] font-semibold">Họ và Tên</label>
                <input
                  className="w-[60%]"
                  type="text"
                  required
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>
        <div className="w-[100%]">
          <div className="w-[100%] flex flex-col gap-5 items-center">
            <div className="w-[70%] flex gap-10 justify-center">
              <i></i>
              <label className="w-[20%] font-semibold">Tên Tài Khoản</label>
              <input
                className="w-[60%]"
                type="text"
                required
                name="username"
                value={user.username}
                onChange={handleChange}
              ></input>
            </div>
            <div className="w-[70%] flex gap-10 justify-center">
              <i></i>
              <label className="w-[20%] font-semibold">Mật Khẩu</label>
              <input
                className="w-[60%]"
                type="password"
                required
                name="password"
                value={user.password}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="w-[100%] flex flex-col gap-5 items-center">
            {gen === "signup" && (
              <>
                <div className="w-[70%] flex gap-10 justify-center pt-5">
                  <i></i>
                  <label className="w-[20%] font-semibold">Email</label>
                  <input
                    className="w-[60%]"
                    type="text"
                    required
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  ></input>
                </div>
              </>
            )}
          </div>

          <div className="w-[100%] flex flex-col items-center gap-5 pt-[30px]">
            {gen === "login" && (
              <>
                <div className="">
                  <input
                    type="checkbox"
                    value={savePass}
                    onChange={() => {
                      setSavePass((prev) => !prev);
                      console.log(savePass);
                    }}
                    className=""
                  />{" "}
                  Lưu mật khẩu
                </div>
                <div
                  className="text-[20px] bg-[#263A29] w-[130px] h-[50px] rounded-md border-1 flex justify-center items-center text-white"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </div>
                <Link to="/" className="mt-[10px]">
                  Trở về
                </Link>
                <div className="flex flex-col items-center pb-[40px]">
                  <p className="">Quên mật khẩu?</p>

                  <Link to="/signup">
                    <p className="">Đăng ký</p>
                  </Link>
                </div>
              </>
            )}
          </div>
          <div>
            {gen === "signup" && (
              <>
                <div className="flex flex-col items-center">
                  <div
                    className="mt-[10px] text-[20px] bg-[#263A29] w-[130px] h-[50px] rounded-md border-1 flex justify-center items-center text-white"
                    onClick={handleSignup}
                  >
                    Đăng ký
                  </div>
                  <Link to="/" className="mt-[10px]">
                    Trở về
                  </Link>
                  <Link to="/login" className="pb-[40px] pt-[10px]">
                    <p> Đăng nhập</p>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formln;
