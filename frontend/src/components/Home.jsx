import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./Layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "./Layouts/LoaderComponent";
import Product from "./Products/Product";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
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

      dispatch(getProducts(null, null, null, null, currentPage));
    },
    [error, currentPage]
  );

  // -----------------------------------------------------------------------------------------------

  return (
    <Fragment>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        products && (
          <Fragment>
            <MetaData namedTitle={"Retail"} />
            <section id="products" className="container mt-5">
              <div className="row">
                {products &&
                  products.map((product, index) => (
                    <Product
                      product={product}
                      key={index + 1}
                      keyId={index + 1}
                      col={3}
                    />
                  ))}
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

export default Home;
