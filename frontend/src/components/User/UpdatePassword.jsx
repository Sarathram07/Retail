import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  updatePassword as updatePwdAction,
  clearAuthError,
} from "../../actions/userAction";

const UpdatePassword = () => {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const dispatch = useDispatch();
  const { isUpdatedPassword, error } = useSelector((state) => state.authState);
  // --------------------------------------------------------------------------------------------------------------

  const handlePassword = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("oldPassword", oldPwd);
    form.append("newPassword", newPwd);
    dispatch(updatePwdAction(form));
  };

  // --------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (isUpdatedPassword) {
      toast("Password - Updated Successfully"),
        {
          type: "success",
          position: "bottom-center",
        };
      setOldPwd("");
      setNewPwd("");
      //navigate("/")
      return;
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "success",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [isUpdatedPassword, error, dispatch]);

  // --------------------------------------------------------------------------------------------------------------

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handlePassword}>
          <h1 className="mt-2 mb-5">Update Password</h1>
          <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
