import React, { Fragment, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";

import MetaData from "../Layouts/MetaData";
import ReviewDialog from "./ReviewDialog";
import LoaderComponent from "../Layouts/LoaderComponent";
import { createReview, getProduct } from "../../actions/productAction";
import addItemToCart from "../../actions/CartActions";
import {
  clearProduct,
  clearReviewError,
  clearReviewSubmitted,
} from "../../reducer/productSlice";
import ProductReview from "./ProductReview";
import { showSuccessToast } from "../../utils/toastUtils";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();

  const data = useSelector((state) => state.productState);
  const {
    isLoading,
    productFromDB: product = {},
    isReviewSubmitted,
    error,
  } = data;

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  const { user } = useSelector((state) => state.authState);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //-------------------------------------------------------------------------------------------------------------------------------

  const qtyReducer = (state, action) => {
    switch (action.type) {
      case "INCREASE":
        if (state.qty >= action.stock) return state;
        return { qty: state.qty + 1 };

      case "DECREASE":
        if (state.qty <= 1) return state;
        return { qty: state.qty - 1 };

      case "RESET":
        return { qty: 1 };

      default:
        return state;
    }
  };

  const [qtyState, dispatchQty] = useReducer(qtyReducer, { qty: 1 });

  const increaseQty = () => {
    dispatchQty({ type: "INCREASE", stock: product.stock });
  };

  const decreaseQty = () => {
    dispatchQty({ type: "DECREASE" });
  };

  //-------------------------------------------------------------------------------------------------------------------------------
  const handleAdd = () => {
    dispatch(addItemToCart(pid, qtyState.qty));
    showSuccessToast("Items Added to Cart");
  };
  //-------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();
      toast("Review - Submitted Successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearReviewSubmitted());
        },
      });
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "success",
        onOpen: () => {
          dispatch(clearReviewError());
        },
      });
    }

    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(pid));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [pid, isReviewSubmitted, error, dispatch]);

  //-------------------------------------------------------------------------------------------------------------------------------

  return (
    <Fragment>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        product && (
          <Fragment>
            <MetaData namedTitle={product.name} />
            <div className="row f-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                {/* <Carousel pause="hover">
                  {product.images &&
                    product.images.map((img) => (
                      <Carousel.Item key={img._id}>
                        <img
                          className="d-block w-100"
                          src={img.image}
                          alt={product.name}
                          height="500"
                          width="500"
                        />
                      </Carousel.Item>
                    ))}
                </Carousel> */}

                <Slider {...settings}>
                  {product.images &&
                    product.images.map((img) => (
                      <div key={img._id}>
                        <img
                          src={img.image}
                          alt={product.name}
                          height="500"
                          width="500"
                        />
                      </div>
                    ))}
                </Slider>
              </div>
              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id"># {product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{
                      width: `${(product.ratings / 5) * 100}%`,
                    }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={qtyState.qty}
                    readOnly
                  />

                  <span className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                  Status:
                  <span
                    id="stock_status"
                    className={product.stock > 0 ? "greenColor" : "redColor"}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{product.seller}</strong>
                </p>

                {user ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    onClick={handleShow}
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5">
                    Login to Post Review
                  </div>
                )}

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    {/* Review Dialog */}
                    <ReviewDialog
                      open={show}
                      onClose={handleClose}
                      productId={pid}
                    />
                  </div>
                </div>
              </div>
            </div>
            {product.reviews && product.reviews.length > 0 ? (
              <ProductReview reviews={product.reviews} />
            ) : null}
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default ProductDetail;
