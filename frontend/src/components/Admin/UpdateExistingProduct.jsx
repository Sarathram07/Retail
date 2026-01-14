import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import SideBar from "./SideBar";
import { updateAdminProducts } from "../../actions/adminActions/adminProductAction";
import {
  adminClearUpdated,
  adminClearError,
} from "../../reducer/admin/productSlice";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { set } from "mongoose";
import { getProduct } from "../../actions/productAction";

const UpdateExistingProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);

  const { id: pid } = useParams();

  const {
    isLoading,
    isProductUpdated,
    error,
    productToDB: prod,
  } = useSelector((state) => state.admin_ProductState);

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

  // ------------------------------------------------------------------------------------------------------------------------------

  const onImagesChange = (e) => {
    // files will be array data ( object-> array )
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
    });
  };

  // ------------------------------------------------------------------------------------------------------------------------------
  const createHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("imagesCleared", imagesCleared);

    dispatch(updateAdminProducts(pid, formData));
  };

  // ------------------------------------------------------------------------------------------------------------------------------

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  // ------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (isProductUpdated) {
      showSuccessToast("Product Updated Successfully", {
        onOpen: () => {
          dispatch(adminClearUpdated());
        },
      });
      setImages([]);
      //navigate("/admin/products");
      return;
    }

    if (error) {
      showErrorToast(error, {
        onOpen: () => {
          dispatch(adminClearError());
        },
      });
      return;
    }

    dispatch(getProduct(pid));
  }, [isProductUpdated, error, dispatch]);

  useEffect(() => {
    if (prod._id) {
      setName(prod.name);
      setPrice(prod.price);
      setDescription(prod.description);
      setCategory(prod.category);
      setStock(prod.stock);
      setSeller(prod.seller);

      let imgs = [];
      prod.images.forEach((i) => {
        imgs.push(i.image);
      });
      //setImagesPreview(prod.images.map((image) => image.url));
      setImagesPreview(imgs);
    }
  }, [prod]);

  // ------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                enctype="multipart/form-data"
                onSubmit={createHandler}
              >
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="">Select</option>
                    {categories.map((c) => (
                      <option value={c} key={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onImagesChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {/* CLEAR IMAGES BUTTON */}
                  {imagesPreview.length > 0 && (
                    <span
                      className="mr-2"
                      style={{ cursor: "pointer" }}
                      onClick={clearImagesHandler}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  )}

                  {/* SHOW IMAGE PREVIEW */}
                  {imagesPreview &&
                    imagesPreview.map((image) => (
                      <img
                        className="mt-3 mr-2"
                        key={image}
                        src={image}
                        alt={"Image Preview"}
                        width="55"
                        height="52"
                      />
                    ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={isLoading}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </>
  );
};

export default UpdateExistingProduct;
