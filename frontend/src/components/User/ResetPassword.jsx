import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { resetPassword, clearAuthError } from "../../actions/userAction";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    isAuthenticated,
    user: userData,
    error,
  } = useSelector((state) => state.authState);

  // --------------------------------------------------------------------------------------------------------------

  const handleResetPassword = (e) => {
    e.preventDefault();
    const resetData = new FormData();
    resetData.append("password", password);
    resetData.append("confirmPassword", confirmPassword);
    dispatch(resetPassword(resetData, token));
  };

  // --------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (isAuthenticated) {
      toast("Password - Reset Success"),
        {
          type: "success",
          position: "bottom-center",
        };
      navigate("/");
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
  }, [isAuthenticated, error, dispatch, navigate]);

  // --------------------------------------------------------------------------------------------------------------
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleResetPassword}>
          <h1 className="mb-3">New Password</h1>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
