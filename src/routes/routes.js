
import BookModifier from "../pages/BookModifier";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OrderBook from "../pages/OrderBook";
import Signup from "../pages/Signup";
import ViewBook from "../pages/ViewBook";

const publicroutes =[
    {path:"/login",component:Login},
    {path:"/signup",component:Signup},
    {path: "/", component:Home },
    {path: "/BookModifier/:id", component:BookModifier},
    { path: "/book/:id", component: ViewBook },
    {path:"/order",component:OrderBook},
]
export {publicroutes}