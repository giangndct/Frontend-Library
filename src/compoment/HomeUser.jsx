import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book/Book";

const HomeUser = () => {
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      await axios.get("http://localhost:8080/api/books").then((e) => {
        setBooks(e.data);
      });
    };
    fetchBook();
    return () => {
      setUpdate(false);
    };
  }, [update]);
  return (
    <div className="bg-[#EDF1D6] p-[36px]">
      <div className="max-w-[1200px] mx-[auto] min-h-[80vh] bg-[#EDF1D6] rounded-[4px] text-[#41644A]">
        <div className="block text-[32px] text-[#40513B] font-semibold pl-[18px] py-[20px] font-mono text-center">
          Danh Mục Sản Phẩm
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1 lg:gap-3 px-[4px] pb-[30px]">
          {books.length !== 0 &&
            books.map((book) => (
              <div
                key={book.id}
                className="flex justify-center w-full overflow-hidden"
              >
                <Link to={`/book/${book.id}`}>
                  <Book data={book} />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
