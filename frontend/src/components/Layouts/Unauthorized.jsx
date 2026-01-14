import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4">403</h1>
      <p className="lead">You are not authorized to access this page</p>
      <Link to="/" className="btn btn-warning">
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;
