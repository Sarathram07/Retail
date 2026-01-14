import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const UserLayout = () => {
  return (
    <>
      <div className="container container-fluid">
        <ToastContainer theme="dark" />
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
