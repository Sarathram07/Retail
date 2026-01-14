import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown, Image } from "react-bootstrap";
//import Dropdown from "react-bootstrap/Dropdown";
//import Image from "react-bootstrap/Image";

import SearchComponent from "./SearchComponent";
import { logout } from "../../actions/userAction";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <header>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to={"/"}>
              <img
                width="150px"
                src="/images/retaillogo.png"
                alt="retail_cart_logo"
              />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <SearchComponent />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {isAuthenticated ? (
            <Dropdown className="d-inline">
              <Dropdown.Toggle
                id="dropdown-basic"
                variant="default text-white pr-5"
              >
                <figure className="avatar avatar-nav">
                  <Image
                    width="50px"
                    src={user?.avatar || "/images/default_user_avatar.png"}
                    roundedCircle
                  />
                </figure>
                <span> {user.name} </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user.role === "admin" && (
                  <Dropdown.Item
                    className="text-dark"
                    onClick={() => {
                      navigate("/admin/dashboard");
                    }}
                  >
                    Dashboard
                  </Dropdown.Item>
                )}

                <Dropdown.Item
                  className="text-dark"
                  onClick={() => {
                    navigate("/userprofile");
                  }}
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-dark"
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  All Orders
                </Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={logoutHandler}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to={"/login"} className="btn" id="login_btn">
              Login
            </Link>
          )}

          <Link to={"/cart"} id="cart" className="ml-3">
            Cart
          </Link>

          <span className="ml-1" id="cart_count">
            {cartItems?.length || 0}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
