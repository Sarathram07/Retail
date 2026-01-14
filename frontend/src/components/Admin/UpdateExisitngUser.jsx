import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import SideBar from "./SideBar";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { getProduct } from "../../actions/productAction";
import {
  getAdminSingleUser,
  updateAdminUser,
} from "../../actions/adminActions/adminUsersAction";
import {
  clearAdminUserError,
  clearAdminUserUpdated,
} from "../../reducer/admin/userSlice";

const UpdateExistingUser = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();

  const {
    isLoading,
    isUserUpdated,
    error,
    user = {},
  } = useSelector((state) => state.admin_UserState);

  const { user: authUser } = useSelector((state) => state.authState);

  // ------------------------------------------------------------------------------------------------------------------------------
  const updateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);

    dispatch(updateAdminUser(userId, formData));
  };

  // ------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (isUserUpdated) {
      showSuccessToast("User -  Updated Successfully", {
        onOpen: () => {
          dispatch(clearAdminUserUpdated());
        },
      });
      return;
    }

    if (error) {
      showErrorToast(error, {
        onOpen: () => {
          dispatch(clearAdminUserError());
        },
      });
      return;
    }

    dispatch(getAdminSingleUser(userId));
  }, [isUserUpdated, error, dispatch]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

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
                onSubmit={updateHandler}
              >
                <h1 className="mb-4">Update User</h1>

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
                  <label htmlFor="price_field">Email</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Role</label>
                  <select
                    className="form-control"
                    id="category_field"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    disabled={user.id === authUser._id}
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
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

export default UpdateExistingUser;
