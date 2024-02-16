import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductProfile from "./pages/ProductProfile";
import CartTest from "./components/Cart";
import { Logout } from "./pages/Logout";
import Home from "./pages/Home";
import Layout from "./Layout";
import AboutUs from "./pages/AboutUs";
import PasswordChange from "./pages/PasswordChange";
import { AddProduct } from "./pages/AddProduct";
import { Genres } from "./pages/Genre";
import { WatchListMenu } from "./pages/WatchLists";
import { CheckoutSummary } from "./components/CheckoutSummary";
import AccountSettings from "./pages/AccountSettings";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="knockbuster" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="account-settings" element={<AccountSettings />} />
        <Route path="changepassword" element={<PasswordChange />} />
        <Route path="watchListMenu" element={<WatchListMenu />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="checkoutSummary" element={<CheckoutSummary />} />
        <Route path="cart" element={<CartTest />} />
        <Route path="products" element={<ProductList />}/>
        <Route path="products/:id" element={<ProductProfile />} />
        <Route path="genres/:genre" element={<Genres />}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default Router;
