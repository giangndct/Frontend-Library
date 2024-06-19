import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../compoment/Nav";

const BookModifier = () => {
  const { id } = useParams();
  let action = "Thêm";
  if (id !== "0") {
    action = "Sửa";
  }

  const [ask, setAsk] = useState(false);
  const [mess, setMess] = useState("");
  const [open, setOpen] = useState(true);
  const [disable, setDisable] = useState(action === "Sửa" ? true : false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    imgBook: "",
    length: "",
    releaseDate: "",
    genre: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setBook({
      ...book,
      [e.target.name]: value,
    });
    console.log(book);
  };
  const handleAdd = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8080/api/book",
      data: {
        title: book.title,
        file: book.imgBook,
        author: book.author,
        description: book.description,
        releaseDate: book.releaseDate,
        length: book.length,
        genre: book.genre,
        price: book.price,
      },
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((e) => {
        setMess(`${action} thành công!!`);
        setBook({
          title: "",
          author: "",
          description: "",
          imgBook: "",
          releaseDate: "",
          length: "",
          genre: "",
          price: "",
        });
        setAsk(false);
        setOpen(true);
        document.documentElement.scrollTop = 0;
      })
      .catch((e) => {
        if (e.response.data === "Not found") {
          setMess("Hãy nhập hết các giá trị còn trống");
        } else if (e.response.data === "Book exist") {
          setMess("Sách đã tồn tại");
        }
        setOpen(true);
        setAsk(false);
        document.documentElement.scrollTop = 0;
      });
  };
  useEffect(() => {
    const getBook = async () => {
      await axios
        .get(`http://localhost:8080/api/book/${id}`)
        .then((e) => {
          setBook(e.data);
          console.log(e.data);
        })
        .then((e) => {
          console.log(book);
        });
    };
    if (id !== "0") {
      getBook();
    }
  }, [id]);
  const handleUpdate = async () => {
    axios
      .put(`http://localhost:8080/api/book/${book.id}`, {
        title: book.title,
        author: book.author,
        description: book.description,
        releaseDate: book.releaseDate,
        length: book.length,
        genre: book.genre,
        price: book.price,
      })
      .then((e) => {
        axios({
          method: "post",
          url: `http://localhost:8080/api/book/${book.id}/bookImg`,
          data: {
            file: book.imgBook,
          },
          headers: { "Content-Type": "multipart/form-data" },
        }).then((e) => {
          setMess("Cập nhật thành công !!");
          setOpen(true);
          document.documentElement.scrollTop = 0;
        });
      })
      .catch((e) => {
        if (e.response.data === "Not found") {
          setMess("Hãy nhập hết các giá trị còn trống");
        } else if (e.response.data === "Book exist") {
          setMess("Sách đã tồn tại");
        }
        setOpen(true);
      });
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
      <div className="flex w-full text-[#000] bg-[#6ec236] px-[30px] md:px-[50px] py-[40px]">
        <div className="flex-1 text-[12px] md:text-[16px]">
          <div className="flex">
            <div>
              <span className="block font-bold mb-[4px]">Tiêu đề</span>
              <input
                disabled={disable}
                type="text"
                value={book.title}
                className="w-[80%] py-[3px]"
                name="title"
                placeholder="Nhập tiêu đề"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <span className="block font-bold mb-[4px]">Tác giả</span>
              <input
                disabled={disable}
                type="text"
                value={book.author}
                className="w-[80%] py-[3px]"
                name="author"
                placeholder="Nhap Tac gia"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="mt-[14px]">
            <span className="block font-bold mb-[4px]">Mô tả về sách</span>
            <textarea
              disabled={disable}
              id="description"
              name="description"
              rows="6"
              cols="20"
              value={book.description}
              onChange={handleChange}
              placeholder="Nhập mô tả sách"
              className="w-full outline-none px-[4px] mt-2"
            ></textarea>
          </div>
          <div className="flex">
            <div>
              <span className="block font-bold mb-[4px]">Ngày phát hành</span>
              <input
                disabled={disable}
                type="text"
                value={book.releaseDate}
                className="w-[80%] py-[3px]"
                name="releaseDate"
                placeholder="Nhap ngay phat hanh"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <span className="block font-bold mb-[4px]">Số trang</span>
              <input
                disabled={disable}
                type="text"
                value={book.length}
                className="w-[80%] py-[3px]"
                name="length"
                placeholder="Nhap so trang"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex">
            <div>
              <span className="block font-bold mb-[4px]">Thể loại</span>
              <input
                disabled={disable}
                type="text"
                value={book.genre}
                className="w-[80%] py-[3px]"
                name="genre"
                placeholder="Nhap the loai"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <span className="block font-bold mb-[4px]">Đơn Giá</span>
              <input
                disabled={disable}
                type="text"
                value={book.price}
                className="w-[80%] py-[3px]"
                name="price"
                placeholder="nhap gia"
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="flex-1 pl-[20px] md:pl-[40px]">
          <input
            disabled={disable}
            type="file"
            multiple
            className="cursor-pointer text-while mb-[10px]"
            name="imgBook"
            onChange={(e) =>
              setBook((prev) => ({ ...prev, imgBook: e.target.files[0] }))
            }
          ></input>
          <br />
          {book.imgBook && (
            <div>
              <img
                src={
                  book.imgBook === Object(book.imgBook)
                    ? URL.createObjectURL(book.imgBook)
                    : book.imgBook
                }
                alt="IMG preview"
              ></img>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-[10px] py-[20px] px-[86px] w-full bg-[#3a2929] text-white">
        {action === "Thêm" ? (
          <>
            <input
              type="submit"
              value={action}
              className="cursor-pointer uppercase text-[20px] font-semibold px-[18px] py-[4px] bg-[#3a57b2] rounded-[8px] hover:bg-[#203988]"
              onClick={() => setAsk(true)}
            />
            <Dialog
              open={ask}
              onClose={() => setAsk(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Bạn có muốn thêm sách?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setAsk(false)}>Không</Button>
                <Button onClick={handleAdd} autoFocus>
                  Đồng ý
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <>
            {disable ? (
              <input
                type="submit"
                value="Sửa"
                className="cursor-pointer uppercase text-[20px] font-semibold px-[18px] py-[4px] bg-[#3a57b2] rounded-[8px] hover:bg-[#203988]"
                onClick={() => setDisable((prev) => !prev)}
              />
            ) : (
              <input
                type="submit"
                value="Save"
                className="cursor-pointer uppercase text-[20px] font-semibold px-[18px] py-[4px] bg-[#3a57b2] rounded-[8px] hover:bg-[#203988]"
                onClick={handleUpdate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookModifier;
