import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { getFromSessionStorage } from "../../utils/storage";
import { requiredFields, ValidateShipping } from "./Shipping";
import { orderCompleted } from "../../reducer/cartSlice";
import { createOrder } from "../../actions/orderActions";
import { clearOrderError } from "../../reducer/orderSlice";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderDetailsInfo = getFromSessionStorage("order_Info");
  const { user } = useSelector((state) => state.authState);
  const { cartItems, shippingInfo } = useSelector((state) => state.cartState);
  const { error: orderError } = useSelector((state) => state.orderState);

  // ------------------------------------------------------------------------------------------------------------------
  const paymentData = {
    amount: Math.round((orderDetailsInfo?.userSummary?.totalPrice || 0) * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const orderData = {
    orderItems: cartItems,
    shippingInfo: shippingInfo,
    ...(orderDetailsInfo && {
      itemsPrice: orderDetailsInfo.userSummary.itemsPrice,
      shippingPrice: orderDetailsInfo.userSummary.shippingPrice,
      taxPrice: orderDetailsInfo.userSummary.taxPrice,
      totalPrice: orderDetailsInfo.userSummary.totalPrice,
    }),
  };

  //   if (orderDetailsInfo) {
  //     orderData.itemsPrice = orderDetailsInfo.userSummary.itemsPrice;
  //     orderData.shippingPrice = orderDetailsInfo.userSummary.shippingPrice;
  //     orderData.taxPrice = orderDetailsInfo.userSummary.taxPrice;
  //     orderData.totalPrice = orderDetailsInfo.userSummary.totalPrice;
  //   }

  // ------------------------------------------------------------------------------------------------------------------

  const paymentHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const optionConfig = {
        withCredentials: true,
      };
      const { data } = await axios.post(
        import.meta.env.VITE_API_URL + "/payment/process",
        paymentData,
        optionConfig
      );
      const clientSecret = data.client_secret;

      const options = {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      };
      const result = await stripe.confirmCardPayment(clientSecret, options);

      if (result.error) {
        toast(result.error.message, {
          type: "error",
          position: "bottom-center",
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast("Payment Success", {
            type: "success",
            position: "bottom-center",
          });
          orderData.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(orderCompleted());
          dispatch(createOrder(orderData));
          navigate("/order/success");
        } else {
          toast("Please Try Again", {
            type: "warning",
            position: "bottom-center",
          });
        }
      }
    } catch (error) {
      toast(`Error - ${error}`, {
        type: "error",
        position: "bottom-center",
      });
      document.querySelector("#pay_btn").disabled = false;
      console.log(error.message);
    }
  };

  // ------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    ValidateShipping(shippingInfo, requiredFields, navigate);
    if (orderError) {
      toast(orderError, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
    }
  }, [orderError, dispatch]);

  // ------------------------------------------------------------------------------------------------------------------

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={paymentHandler}>
          <h1 className="mb-4">Card Info</h1>
          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="form-control"
              //value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="form-control"
              // value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="form-control"
              //value=""
            />
          </div>

          <button id="pay_btn" type="submit" className="btn btn-block py-3">
            Pay {`$${orderDetailsInfo?.userSummary.totalPrice || 0}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
