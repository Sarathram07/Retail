import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  increaseCartItemQty,
  decreaseCartItemQty,
  removeItemFromCart,
} from "../../reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems: items } = useSelector((state) => state.cartState);

  // ----------------------------------------------------------------------------------------------------------------------------

  const increaseQTy = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.productId));
  };

  const decreaseQTy = (item) => {
    const count = item.quantity;
    if (item.stock === 1 || count <= 1) return;
    dispatch(decreaseCartItemQty(item.productId));
  };
  // ----------------------------------------------------------------------------------------------------------------------------

  const totalUnits = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  const finalPrice = Number(totalPrice.toFixed(2));

  // ----------------------------------------------------------------------------------------------------------------------------

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  // ----------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {items.length == 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{items.length} items</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {items.map((item, index) => (
                <React.Fragment key={index + 1}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decreaseQTy(item)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() => increaseQTy(item)}
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => {
                            dispatch(removeItemFromCart(item.productId));
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:
                  <span className="order-summary-values">
                    {totalUnits} (Units)
                  </span>
                </p>
                <p>
                  Est. total:
                  <span className="order-summary-values">${finalPrice}</span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkOutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartComponent;
