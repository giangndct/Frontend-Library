import React, { useContext } from "react";
import OrderUser from "../compoment/OrderUser";
import { LoginContext } from "../context/LoginProvider";

const OrderBook = () => {
  const context  = useContext(LoginContext);
  const id = context.user.id;
  return (
    <div>
      <OrderUser userId={id}></OrderUser>
    </div>
  );
};

export default OrderBook;
