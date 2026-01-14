import { useEffect, useState } from "react";
import axios from "axios";
import LazyLoader from "./utils/lazyLoader";
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

import { store } from "./store/store";
import { loadUser } from "./actions/userAction";
import NotFound from "./components/Layouts/NotFound";
import Unauthorized from "./components/Layouts/Unauthorized";
import AdminGuard from "./components/Route/AdminGuard";
import AuthGuard from "./components/Route/AuthGuard";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";

// USER
import UserLayout from "./components/Layouts/UserLayout";
import Home from "./components/Home";
import Login from "./components/User/Login";

//ADMIN
import AdminLayout from "./components/Layouts/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";

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
                <Route path="/login" element={<Login />} />
                <Route
                  path="/register"
                  element={<LazyLoader comp="Register" />}
                />
                <Route
                  path="/product/:pid"
                  element={<LazyLoader comp="ProductDetail" />}
                />
                <Route
                  path="/cart"
                  element={<LazyLoader comp="CartComponent" />}
                />
                <Route
                  path="/search/:keyword"
                  element={<LazyLoader comp="ProductSearchDetails" />}
                />
                <Route
                  path="/password/forgot"
                  element={<LazyLoader comp="ForgotPassword" />}
                />
                <Route
                  path="/password/reset/:token"
                  element={<LazyLoader comp="ResetPassword" />}
                />

                {/* AUTH PROTECTED */}
                <Route element={<AuthGuard />}>
                  <Route
                    path="/userprofile"
                    element={<LazyLoader comp="Profile" />}
                  />
                  <Route
                    path="/userprofile/update"
                    element={<LazyLoader comp="UpdateProfile" />}
                  />
                  <Route
                    path="/userprofile/update/password"
                    element={<LazyLoader comp="UpdatePassword" />}
                  />
                  <Route
                    path="/shipping"
                    element={<LazyLoader comp="Shipping" />}
                  />
                  <Route
                    path="/order/confirm"
                    element={<LazyLoader comp="ConfirmOrder" />}
                  />
                  <Route
                    path="/order/success"
                    element={<LazyLoader comp="OrderSuccess" />}
                  />
                  <Route
                    path="/orders"
                    element={<LazyLoader comp="UserOrders" />}
                  />
                  <Route
                    path="/order/:id"
                    element={<LazyLoader comp="OrderDetail" />}
                  />

                  {stripeApi && (
                    <Route
                      path="/payment"
                      element={
                        <Elements stripe={stripeApi}>
                          <LazyLoader comp="Payment" />
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
                  <Route
                    path="/admin/products"
                    element={<LazyLoader comp="ProductList" />}
                  />
                  <Route
                    path="/admin/products/create"
                    element={<LazyLoader comp="NewProduct" />}
                  />
                  <Route
                    path="/admin/product/:id"
                    element={<LazyLoader comp="UpdateExistingProduct" />}
                  />
                  <Route
                    path="/admin/orders"
                    element={<LazyLoader comp="OrderList" />}
                  />
                  <Route
                    path="/admin/order/:id"
                    element={<LazyLoader comp="UpdateExistingOrder" />}
                  />
                  <Route
                    path="/admin/users"
                    element={<LazyLoader comp="UserLists" />}
                  />
                  <Route
                    path="/admin/user/:id"
                    element={<LazyLoader comp="UpdateExistingUser" />}
                  />
                  <Route
                    path="/admin/reviews"
                    element={<LazyLoader comp="ReviewList" />}
                  />
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
