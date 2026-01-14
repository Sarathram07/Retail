import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";

import SideBar from "./SideBar";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { adminUpdateOrder } from "../../actions/adminActions/adminOrderAction";
import { showOrderDetail } from "../../actions/orderActions";
import {
  clearOrderError,
  clearOrderUpdated,
} from "../../reducer/admin/orderSlice";

const UpdateExistingOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: oid } = useParams();

  const [newOrderStatus, setNewOrderStatus] = useState("Processing");

  const { isLoading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.admin_OrderState
  );

  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;

  const isPaid = paymentInfo.status === "succeeded" ? true : false;

  // ------------------------------------------------------------------------------------------------------------------------------
  const updateHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderstatus = newOrderStatus;
    dispatch(adminUpdateOrder(oid, orderData));
  };

  // ------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (isOrderUpdated) {
      showSuccessToast("Order Updated Successfully", {
        onOpen: () => {
          dispatch(clearOrderUpdated());
        },
      });
      return;
    }

    if (error) {
      showErrorToast(error, {
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }

    dispatch(showOrderDetail(oid));
  }, [isOrderUpdated, error, dispatch]);

  useEffect(() => {
    if (orderDetail._id) {
      setNewOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  // ------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1 className="my-5">Order # {orderDetail._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address:</b>
                  {shippingInfo.address}, {shippingInfo.city},
                  {shippingInfo.state},{shippingInfo.country},
                  {shippingInfo.postalCode}
                </p>
                <p>
                  <b>Amount:</b> ${totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? "greenColor" : "redColor"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>

                <h4 className="my-4">Order Status:</h4>
                <p
                  className={
                    newOrderStatus && newOrderStatus.includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{newOrderStatus}</b>
                </p>

                <h4 className="my-4">Order Items:</h4>

                <hr />
                <div className="cart-item my-1">
                  {orderItems &&
                    orderItems.map((item) => (
                      <div className="row my-5" key={item.product}>
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Quantity </p>
                        </div>
                      </div>
                    ))}
                </div>
                <hr />
              </div>

              <div className="col-12 col-lg-3 mt-5">
                <h4 className="my-4"> Order Status </h4>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    value={newOrderStatus}
                    onChange={(e) => setNewOrderStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary btn-block"
                  onClick={updateHandler}
                  disabled={isLoading}
                >
                  Update Status
                </button>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </>
  );
};

export default UpdateExistingOrder;
