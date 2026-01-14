import React, { Fragment, useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import { requiredFields, ValidateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";
import { setToSessionStorage } from "../../utils/storage";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems: items } = useSelector(
    (state) => state.cartState
  );

  const { user } = useSelector((state) => state.authState);

  // ---------------------------------------------------------------------------------------------------------------------

  const subTotalPrice = items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  const finalSubTotal = Number(subTotalPrice.toFixed(2));

  const shippingPrice = finalSubTotal.price > 200 ? 0 : 50;
  const taxPrice = Number((finalSubTotal * 0.05).toFixed(2));
  const finalTotal = Number(
    (finalSubTotal + shippingPrice + taxPrice).toFixed(2)
  );

  // ---------------------------------------------------------------------------------------------------------------------

  const proceesPayment = () => {
    const orderDetails = {
      userCartItems: items || [],
      userShippingDetails: shippingInfo || {},
      userSummary: {
        itemsPrice: finalSubTotal,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: finalTotal,
      },
      //   itemsPrice: finalSubTotal,
      //   shippingPrice: shippingPrice,
      //   taxPrice: taxPrice,
      //   totalPrice: finalTotal,
    };
    setToSessionStorage("order_Info", orderDetails);
    navigate("/payment");
  };

  // ---------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    ValidateShipping(shippingInfo, requiredFields, navigate);
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <MetaData namedTitle={"Confirm-Order"} />
      <CheckOutSteps shipping={true} confirmOrder={true} />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo.address}, {shippingInfo.country},
            {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.postalCode}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {items.map((item, index) => (
            <Fragment key={index + 1}>
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ${item.price} =
                      <b>${item.quantity * item.price}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">${finalSubTotal}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">${finalTotal}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={proceesPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
