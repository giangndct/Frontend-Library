import React, { useContext } from "react";
import HomeAdmin from "../compoment/HomeAdmin/HomeAdmin";
import Nav from "../compoment/Nav";
import HomeUser from "../compoment/HomeUser";
import { LoginContext } from "../context/LoginProvider";

const Home = () => {
  const context = useContext(LoginContext);
  return (
    <div>
      <Nav />
      {context.admin ? <HomeAdmin /> : <HomeUser />}
    </div>
  );
};

export default Home;
