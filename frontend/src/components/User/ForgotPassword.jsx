import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { forgotPassword, clearAuthError } from "../../actions/userAction";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.authState);

  // --------------------------------------------------------------------------------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    dispatch(forgotPassword(data));
  };

  // --------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    // if forgot password is successful, we will have "message"
    if (message) {
      toast(message),
        {
          type: "success",
          position: "bottom-center",
        };
      setEmail("");
      return;
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [message, error, dispatch]);

  // --------------------------------------------------------------------------------------------------------------

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
