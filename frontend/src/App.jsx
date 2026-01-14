import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

import NotFound from "./components/Layouts/NotFound";
import Unauthorized from "./components/Layouts/Unauthorized";
import AdminGuard from "./components/Route/AdminGuard";
import AuthGuard from "./components/Route/AuthGuard";
import { store } from "./store/store";
import { loadUser } from "./actions/userAction";

// USER
import UserLayout from "./components/Layouts/UserLayout";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/Products/ProductDetail";
import ProductSearchDetails from "./components/Products/ProductSearchDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
//import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import CartComponent from "./components/Cart/CartComponent";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import UserOrders from "./components/Order/UserOrders";
import OrderDetail from "./components/Order/OrderDetail";

//ADMIN

import AdminLayout from "./components/Layouts/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateExistingProduct from "./components/Admin/UpdateExistingProduct";
import OrderList from "./components/Admin/OrderList";
import UpdateExistingOrder from "./components/Admin/UpdateExistingOrder";
import UserLists from "./components/Admin/UserLists";
import UpdateExistingUser from "./components/Admin/UpdateExisitngUser";
import ReviewList from "./components/Admin/ReviewList";

const BASE_URL = import.meta.env.VITE_API_URL;
function App() {
  //const [count, setCount] = useState(0);
  const [stripeApi, setStripeKey] = useState("");

  const getStripeApiKey = async () => {
    // const optionConfig = {
    //   withCredentials: true,
    // };
    const { data } = await axios.get(BASE_URL + "/stripeapi");
    const finalStripeKey = loadStripe(data.stripeApiKey);
    setStripeKey(finalStripeKey);
  };

  useEffect(() => {
    store.dispatch(loadUser);
    getStripeApiKey();
  }, []);

  return (
    <>
      <Browser>
        <div className="App">
          <HelmetProvider>
            <Header />

            <Routes>
              {/* <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:pid" element={<ProductDetail />} />
                <Route path="/cart" element={<CartComponent />} />
                <Route
                  path="/search/:keyword"
                  element={<ProductSearchDetails />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/userprofile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/userprofile/update"
                  element={
                    <ProtectedRoute>
                      <UpdateProfile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/userprofile/update/password"
                  element={
                    <ProtectedRoute>
                      <UpdatePassword />
                    </ProtectedRoute>
                  }
                />

                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route
                  path="/password/reset/:token"
                  element={<ResetPassword />}
                />

                <Route
                  path="/shipping"
                  element={
                    <ProtectedRoute>
                      <Shipping />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/order/confirm"
                  element={
                    <ProtectedRoute>
                      <ConfirmOrder />
                    </ProtectedRoute>
                  }
                />

                {stripeApi && (
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute>
                        <Elements stripe={stripeApi}>
                          <Payment />
                        </Elements>
                      </ProtectedRoute>
                    }
                  />
                )}

                <Route
                  path="/order/success"
                  element={
                    <ProtectedRoute>
                      <OrderSuccess />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <UserOrders />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/order/:id"
                  element={
                    <ProtectedRoute>
                      <OrderDetail />
                    </ProtectedRoute>
                  }
                />

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              <Route element={<AdminLayout />}>
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <ProductList />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/products/create"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <NewProduct />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/product/:id"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <UpdateExistingProduct />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <OrderList />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/order/:id"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <UpdateExistingOrder />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <UserLists />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/user/:id"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <UpdateExistingUser />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/reviews"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <ReviewList />
                    </ProtectedRoute>
                  }
                />

                <Route path="/admin/*" element={<NotFound />} />
             
             
              </Route> */}

              {/* USER LAYOUT */}
              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:pid" element={<ProductDetail />} />
                <Route path="/cart" element={<CartComponent />} />
                <Route
                  path="/search/:keyword"
                  element={<ProductSearchDetails />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route
                  path="/password/reset/:token"
                  element={<ResetPassword />}
                />

                {/* AUTH PROTECTED */}
                <Route element={<AuthGuard />}>
                  <Route path="/userprofile" element={<Profile />} />
                  <Route
                    path="/userprofile/update"
                    element={<UpdateProfile />}
                  />
                  <Route
                    path="/userprofile/update/password"
                    element={<UpdatePassword />}
                  />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/order/confirm" element={<ConfirmOrder />} />
                  <Route path="/order/success" element={<OrderSuccess />} />
                  <Route path="/orders" element={<UserOrders />} />
                  <Route path="/order/:id" element={<OrderDetail />} />

                  {stripeApi && (
                    <Route
                      path="/payment"
                      element={
                        <Elements stripe={stripeApi}>
                          <Payment />
                        </Elements>
                      }
                    />
                  )}
                </Route>

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* ADMIN LAYOUT */}
              <Route element={<AdminLayout />}>
                <Route element={<AdminGuard />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/products" element={<ProductList />} />
                  <Route
                    path="/admin/products/create"
                    element={<NewProduct />}
                  />
                  <Route
                    path="/admin/product/:id"
                    element={<UpdateExistingProduct />}
                  />
                  <Route path="/admin/orders" element={<OrderList />} />
                  <Route
                    path="/admin/order/:id"
                    element={<UpdateExistingOrder />}
                  />
                  <Route path="/admin/users" element={<UserLists />} />
                  <Route
                    path="/admin/user/:id"
                    element={<UpdateExistingUser />}
                  />
                  <Route path="/admin/reviews" element={<ReviewList />} />
                </Route>

                <Route path="/admin/*" element={<NotFound />} />
              </Route>
            </Routes>

            <Footer />
          </HelmetProvider>
        </div>
      </Browser>
    </>
  );
}

export default App;
