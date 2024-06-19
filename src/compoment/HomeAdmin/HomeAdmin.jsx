import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchbook = async () => {
      await axios.get("http://localhost:8080/api/books").then((e) => {
        setBooks(e.data);
      });
    };
    fetchbook();
    return () => {
      setUpdate(false);
    };
  }, [update]);
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/book/${id}`);
    setOpen(false);
    setUpdate(true);
  };
  return (
    <div className="py-[40px] bg-[#395144] min-h-[100vh]">
      <div className="px-[14px]">
        <div className="flex justify-end mb-[10px]">
          <Link to="/bookModifier/0">
            <div className="font-mono px-[10px] py-[4px] mb-[10px] md:px-[18px] md:py-[8px] bg-[#ECF9FF] rounded-[8px] font-bold text-[10px] sm:text-[14px] md:text-[18px] text-[#263A29]">
              Thêm sách
            </div>
          </Link>
        </div>
        <table className="border-2 border-[#ccbbbb42] bg-[#395144] shadow-lg shadow-gray-600 font-mono text-[#fff]">
          <thead>
            <tr className="border-2 border-[#ccbbbb42] font-bold text-[10px] md:text-[14px] lg:text-[18px]">
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Ngày ra mắt</th>
              <th>Đã bán</th>
              <th>Số trang</th>
              <th>Thể loại</th>
              <th>Đơn Giá</th>
              <th>Miêu tả</th>
              <th>Ảnh bìa</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-[8px] md:text-[12px] lg:text-[14px]">
            {books.length !== 0 &&
              books.map((book) => (
                <tr>
                  <th className="w-[12.5%] my-[8px] border-b-8 border-l-2 border-[#ccbbbb42]">
                    {book.title}
                  </th>
                  <th className="w-[10%] my-[8px] border-b-8 border-[#ccbbbb42]">
                    {book.author}
                  </th>
                  <th className="w-[10%] my-[8px] border-b-8 border-[#ccbbbb42]">
                    {book.releaseDate}
                  </th>
                  <th className="w-[8%] my-[8px] border-b-8 border-[#ccbbbb42]">
                    {book.sold}
                  </th>
                  <th className="w-[8%] my-[8px] border-b-8 border-[#ccbbbb42]">
                    {book.length}
                  </th>
                  <th className="w-[10%] my-[8px] border-b-8 border-[#ccbbbb42]">
                    {book.genre}
                  </th>
                  <th className="w-[10%] my-[8px] border-b-8 border-[#ccbbbb42]">
                    {book.price}
                  </th>
                  <th className="w-[15%] my-[8px] border-b-8 border-[#ccbbbb42]">
                    {book.description.length > 80
                      ? `${book.description.slice(0, 80)}...`
                      : book.description}
                  </th>
                  <th className="w-[12%] mx-[auto] my-[8px] border-b-8 border-[#ccbbbb42]">
                    <img src={book.imgBook} alt="" className="h-[80%]" />
                  </th>
                  <th className="w-[14.5%] my-[8px] border-b-8 border-r-2 border-[#ccbbbb42]">
                    <Link to={`/bookModifier/${book.id}`}>
                      <div className="inline-block w-[80%] py-[3px] bg-[#2d71a1] rounded-[8px] mb-[10px] hover:bg-[#134b73]">
                        Sửa
                      </div>
                    </Link>
                    <div
                      className="inline-block w-[80%] py-[3px] bg-[#a61b1b] rounded-[8px] mt-[5px] hover:bg-[#761313] cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      Xóa
                    </div>
                    <Dialog
                      open={open}
                      onClose={() => setOpen(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Bạn có muốn xóa?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={() => setOpen(false)}>Không</Button>
                        <Button onClick={() => handleDelete(book.id)} autoFocus>
                          Đồng ý
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeAdmin;
