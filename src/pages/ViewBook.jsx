import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { CardGiftcard } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../compoment/Nav";
import ReactUser from "../compoment/ReactUser";
import { Tabs } from "antd";
import { LoginContext } from "../context/LoginProvider";

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const { TabPane } = Tabs;
  const context = useContext(LoginContext);
  const [mess, setMess] = useState("");
  const [open, setOpen] = useState(true);
  const [ask, setAsk] = useState(false);
  useEffect(() => {
    const getBook = async () => {
      await axios.get(`http://localhost:8080/api/book/${id}`).then((e) => {
        setBook(e.data);
      });
    };
    getBook();
  }, []);

  const orderBook = async () => {
    await axios
      .post(`http://localhost:8080/api/order/book/${id}`, {
        userId: context.user.id,
        booktitle: book.title,
        total: book.price,
      })
      .then((e) => {
        setMess("Đặt mua thành công!");
        setOpen(true);
        setAsk(false);
      })
      .catch((e) => {});
  };

  return (
    <div>
      <Nav />
      {mess !== "" && (
        <Collapse in={open} className="mb-[8px]">
          <Alert severity="success" onClose={() => setOpen(false)}>
            {mess}
          </Alert>
        </Collapse>
      )}
      <>
        {book && (
          <>
            <div className="bg-[#78909c] p-[36px] font-mono">
              <div className="max-w-[1200px] mx-[auto] mb-[8px] text-[#240404]">
                Sách Tiếng Việt {">"} {book.title}
              </div>
              <div className="lg:flex max-w-[1200px] mx-[auto] bg-white rounded-[4px] p-[16px] pt-[25px]">
                <div className="ml-[60px] lg:w-[30%]">
                  <img src={book.imgBook} alt="bìa sách" />
                </div>
                <div className="text-[14px] p-[36px] pt-[0] lg:w-[70%]">
                  <span className="text-[26px] font-semibold">
                    {book.title}
                  </span>
                  <div className="lg:flex mt-[20px]">
                    <div className="lg:w-[60%]">
                      Nhà cung cấp: Nhà Xuất Bản Kim Đồng
                    </div>
                    <div className="lg:w-[40%]">Tác giả: {book.author}</div>
                  </div>
                  <div className="lg:flex my-[8px]">
                    <div className="lg:w-[60%]">Hình thức: Bìa cứng</div>
                    <div className="lg:w-[40%]">Bộ: {book.length}</div>
                  </div>
                  <div>Đơn giá: {book.price}</div>
                  <div className="w-full mt-[12px]">
                    <h4 className="inline-block">Chính sách đổi trả:</h4>
                    <p className="ml-[40px] inline-block">
                      Đổi trả sản phẩm trong vòng 30 ngày.
                    </p>
                  </div>
                  <div className="mt-[40px]">
                    <Link to="/order">
                      <Button
                        variant="outlined"
                        startIcon={<CardGiftcard />}
                        sx={{
                          color: "#db6262",
                          borderColor: "#db6262",
                          marginRight: { lg: "20px" },
                          "&:hover": { color: "#777" },
                        }}
                      >
                        Xem giỏ hàng
                      </Button>
                    </Link>
                    <Button variant="contained" onClick={() => setAsk(true)}>
                      Đặt Mua
                      <Dialog
                        open={ask}
                        onClose={() => setAsk(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Bạn có muốn mua sách?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={() => setAsk(false)}>Không</Button>
                          <Button onClick={orderBook} autoFocus>
                            Đồng ý
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="max-w-[1200px] mx-[auto] bg-white rounded-[4px] p-[16px] mt-[20px] font-mono">
                <div className="mt-3 ml-3 mr-3 bs">
                  <div className="gl">
                    <Tabs Tabs defaultActiveKey="1">
                      <TabPane
                        tab={
                          <div className=" bg-blue-500 px-4 py-2 text-white">
                            Mô tả
                          </div>
                        }
                        key="1"
                      >
                        <p className="text-[16px] md:text-[18px] font-bold text-red-500">
                          Thông tin sản phẩm
                        </p>

                        <table className="pb-[20px] border-b-2 border-[#777] text-[12px] md:text-[14px] w-full mt-[26px]">
                          <colgroup className="w-[50%] md:w-[25%]"></colgroup>
                          <tbody>
                            <tr>
                              <th className="text-start font-medium text-black">
                                Tác giả
                              </th>
                              <td>
                                <b>{book.author}</b>
                              </td>
                            </tr>
                            <tr>
                              <th className="text-start font-medium text-black">
                                Thời gian phát hành
                              </th>
                              <td>
                                <b>{book.releaseDate}</b>
                              </td>
                            </tr>

                            <tr>
                              <th className="text-start font-medium text-black">
                                Số trang
                              </th>
                              <td>
                                <b>{book.length}</b>
                              </td>
                            </tr>
                            <tr>
                              <th className="text-start font-medium text-black">
                                Hình thức
                              </th>
                              <td>
                                <b>Bìa Cứng</b>
                              </td>
                            </tr>
                            <tr className="h-[14px]">
                              <th></th>
                            </tr>
                          </tbody>
                        </table>
                        <div className="my-[10px] text-[12px] md:text-[15px] ">
                          <h3 className="text-[14px] md:text-[16px] font-bold mt-[16px] mb-[12px] text-red-500">
                            Mô tả về sách
                          </h3>
                          <p>{book.description}</p>
                        </div>
                      </TabPane>
                      <TabPane
                        tab={
                          <div className=" bg-blue-500 px-4 py-2 text-white">
                            Đánh giá
                          </div>
                        }
                        key="2"
                      >
                        <ReactUser bookId={id} />
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default ViewBook;
