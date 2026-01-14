import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductMenu from "./ProductMenu";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to={"/admin/dashboard"}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          <li>
            <ProductMenu />
          </li>

          <li>
            <Link to={"/admin/orders"}>
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to={"/admin/users"}>
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to={"/admin/reviews"}>
              <i className="fa fa-users"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
