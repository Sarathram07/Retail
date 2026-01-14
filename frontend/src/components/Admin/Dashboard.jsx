import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SideBar from "./SideBar";
import { getAdminProducts } from "../../actions/adminActions/productsAction";
import { getAdminUsers } from "../../actions/adminActions/adminUsersAction";
import { adminOrder as adminOrderAction } from "../../actions/adminActions/adminOrderAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allProducts: products = [] } = useSelector(
    (state) => state.admin_ProductsState
  );

  const { multipleUsers: users = [] } = useSelector(
    (state) => state.admin_UserState
  );

  const { adminAllOrders: adminOrders = [] } = useSelector(
    (state) => state.admin_OrderState
  );

  let outOfStock = 0;

  if (products.length > 0) {
    products.forEach((prod) => {
      if (prod.stock === 0) {
        outOfStock += 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getAdminUsers);
    dispatch(adminOrderAction);
  }, []);

  // ----------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>

      <div className="col-12 col-md-10">
        <h1 className="my-4">Dashboard</h1>
        {/* DASHBOARD */}
        {/* TOTAL AMOUNT */}
        <div className="row pr-4">
          <div className="col-xl-12 col-sm-12 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Amount
                  <br />
                  <b>${totalAmount}</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pr-4">
          {/* PRODUCTS */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-success o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Products
                  <br />
                  <b>{products.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/products"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          {/* ORDERS */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-danger o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Orders
                  <br />
                  <b>{adminOrders.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/orders"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          {/* USERS */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-info o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Users
                  <br />
                  <b>{users.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/users"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          {/* OUT_OF_STOCK */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-warning o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Out of Stock
                  <br />
                  <b>{outOfStock}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
