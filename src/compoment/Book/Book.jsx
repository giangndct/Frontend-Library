import React from "react";

import "./Book.css";

const Book = ({ data, width = "192px", height = "370px" }) => {
  return (
    <div class="book font-mono">
      <div class="inline-block cursor-pointer book-card">
        <div class="relative">
          <div class="tab">
            <img src={data.imgBook} alt="" class="" />
          </div>
        </div>
        <div class="block text-start text-sm px-2 truncate">
          <span class="truncate">{data.title}</span>
          <h4>Thể loại: {data.genre}</h4>
          <h4 class="text-sm font-semibold">Tác Giả: {data.author}</h4>
          <h4 className="text-[20px] text-red-500">{data.price} đ</h4>
        </div>
      </div>
    </div>
  );
};

export default Book;
