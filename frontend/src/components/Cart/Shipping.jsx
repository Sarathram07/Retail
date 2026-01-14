import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CheckOutSteps from "./CheckOutSteps";
import { saveShippingInfo } from "../../reducer/cartSlice";

//  One-line Validator
// const hasEmptyFields = (obj, requiredFields = Object.keys(obj)) =>
//   requiredFields.some(
//     (key) => obj[key] === "" || obj[key] === null || obj[key] === undefined
//   );

// // usage
// if (hasEmptyFields(shippingInfo, ["name", "phone"])) {
//   // error
// }

export const requiredFields = [
  "address",
  "phoneNo",
  "city",
  "state",
  "country",
  "postalCode",
];

export const ValidateShipping = (shippingInfo, requiredFields, navigate) => {
  const isInvalid = requiredFields.some(
    (field) =>
      !shippingInfo[field] ||
      shippingInfo[field] === undefined ||
      shippingInfo[field] === ""
  );
  if (isInvalid) {
    toast.error("Please fill all shipping informations", {
      position: "bottom-center",
    });
    navigate("/shipping");
  }
};

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cartState);

  const [userAddress, setUserAddress] = useState(shippingInfo?.address || "");
  const [userCity, setUserCity] = useState(shippingInfo?.city || "");
  const [userPhone, setUserPhone] = useState(shippingInfo?.phoneNo || "");
  const [userPostal, setUserPostal] = useState(shippingInfo?.postalCode || "");
  const [userCountry, setUserCountry] = useState(shippingInfo?.country || "");
  const [userState, setUserState] = useState(shippingInfo?.state || "");
  const countryList = Object.values(countries);
  // ----------------------------------------------------------------------------------------------------------------------------
  const shippingUserData = {
    address: userAddress,
    phoneNo: userPhone,
    city: userCity,
    state: userState,
    country: userCountry,
    postalCode: userPostal,
  };

  // ----------------------------------------------------------------------------------------------------------------------------
  const ShippingSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingUserData));
    navigate("/order/confirm");
  };

  // ----------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <CheckOutSteps shipping={true} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={ShippingSubmitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state_field">State</label>
              <input
                type="text"
                id="state_field"
                className="form-control"
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={userCountry}
                onChange={(e) => setUserCountry(e.target.value)}
                required
              >
                {/* <option>India</option>
              <option>USA</option> */}

                {countryList.map((i, index) => (
                  <option key={index + 1} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={userPostal}
                onChange={(e) => setUserPostal(e.target.value)}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
