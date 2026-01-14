import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Slider from "@mui/material/Slider";

// -----------------------------------------------------------------------------------------------

import MetaData from "../Layouts/MetaData";
import { getProducts } from "../../actions/productsActions";
import LoaderComponent from "../Layouts/LoaderComponent";
import Product from "./Product";
import { useParams } from "react-router-dom";

// -----------------------------------------------------------------------------------------------

const ProductSearchDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [categoryValue, setCategoryValue] = useState(null);
  const [ratings, setRatings] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const { keyword } = params;

  // -----------------------------------------------------------------------------------------------

  const marks = [
    { value: 1, label: "$1" },
    { value: 250, label: "$250" },
    { value: 500, label: "$500" },
    { value: 750, label: "$750" },
    { value: 1000, label: "$1000" },
  ];

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  // -----------------------------------------------------------------------------------------------
  const productsData = useSelector((state) => state.productsState);
  const { isLoading, productsFromDB: products, error } = productsData;

  // -----------------------------------------------------------------------------------------------

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
    //console.log(pageNo);
  };

  // -----------------------------------------------------------------------------------------------

  useEffect(
    (req, res) => {
      if (error) {
        return toast.error(error, {
          position: "bottom-center",
        });
      }

      dispatch(
        getProducts(keyword, price, categoryValue, ratings, currentPage)
      );
    },
    [error, currentPage, keyword, price, categoryValue, ratings]
  );

  // -----------------------------------------------------------------------------------------------

  return (
    <Fragment>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        products && (
          <Fragment>
            <MetaData namedTitle={"Retail-Search"} />
            <section id="products" className="container mt-5">
              <div className="row">
                <div className="col-6 col-md-3 mb-5 mt-5">
                  <div className="px-5">
                    <h4 className="mb-2"> Price Filter </h4>
                    <Slider
                      valueLabelDisplay="auto"
                      marks={marks}
                      min={1}
                      max={1000}
                      value={price}
                      onChangeCommitted={(event, value) => {
                        setPrice(value);
                        //console.log(value);
                      }}
                    />
                  </div>

                  <hr className="my-5" />

                  <div className="mt-5">
                    <h4 className="mb-3"> Categories </h4>
                    <ul className="pl-0">
                      {categories.map((category) => (
                        <li
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={category}
                          onClick={() => {
                            setCategoryValue(category);
                          }}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="my-5" />

                  <div>
                    <h4 className="mb-3"> Ratings </h4>
                    <ul className="pl-0">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <li
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={star}
                          onClick={() => {
                            setRatings(star);
                          }}
                        >
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${star * 20}%`,
                              }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-9">
                  <div className="row">
                    {products &&
                      products.map((product, index) => (
                        <Product
                          product={product}
                          key={index + 1}
                          keyId={index + 1}
                          col={4}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="d-flex justify-content-center mt-5">
              <Pagination
                current={currentPage}
                onChange={setCurrentPageNo}
                total={7}
                pageSize={3}
                nextIcon={<span>Next</span>} // acts like nextPageText
                jumpPrevIcon={<span>First</span>} // acts like firstPageText
                jumpNextIcon={<span>Last</span>} // acts like lastPageText
              />
            </div>
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default ProductSearchDetails;
