import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
// -----------------------------------------------------------------------------------------------

import MetaData from "../Layouts/MetaData";
import { clearAuthError, login } from "../../actions/userAction";

// -----------------------------------------------------------------------------------------------

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  // -----------------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector((state) => state.authState);
  const { isLoading, isAuthenticated, error } = data;
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  // -----------------------------------------------------------------------------------------------

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(userEmail, userPassword));
  };

  // -----------------------------------------------------------------------------------------------

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "warning",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  // -----------------------------------------------------------------------------------------------

  return (
    <>
      <MetaData namedTitle={"User Login"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </div>

            <Link to={"/password/forgot"} className="float-right mb-4">
              Forgot Password ?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={isLoading}
            >
              LOGIN
            </button>

            <Link to={"/register"} className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
