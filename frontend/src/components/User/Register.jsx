import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { register, clearAuthError } from "../../actions/userAction";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pwd: "",
  });
  const [avatar, setAvatar] = useState("/images/default_user_avatar.png");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_user_avatar.png"
  );
  const [avatarFileName, setAvatarFileName] = useState("Choose Avatar");

  const { isLoading, isAuthenticated, error } = useSelector(
    (state) => state.authState
  );

  // --------------------------------------------------------------------------------------------------------------

  const handleFormData = (event) => {
    let attName = event.target.name;
    let attValue = event.target.value;

    // read the file from <input> & update the state
    if (attName === "avatar") {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]); //since a single file - position is 0
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setAvatarPreview(fileReader.result); // result - field where the file URL be available
          setAvatar(event.target.files[0]);
          setAvatarFileName(event.target.files[0].name);
        }
      };
    } else {
      setFormData({ ...formData, [attName]: attValue });
    }
  };

  // -----------------------------------------------------------------------------------------------------------------

  const registerHandler = (e) => {
    e.preventDefault();
    let formUserData = new FormData();
    formUserData.append("name", formData.name);
    formUserData.append("email", formData.email);
    formUserData.append("password", formData.pwd);
    formUserData.append("avatar", avatar);
    //console.log(formUserData.entries());
    // for (let [key, value] of formUserData.entries()) {
    //   console.log(key, value);
    // }
    dispatch(register(formUserData));
  };

  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }

    if (isAuthenticated) {
      navigate("/");
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow-lg"
          encType="multipart/form-data"
          onSubmit={registerHandler}
        >
          <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              onChange={handleFormData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              onChange={handleFormData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="pwd"
              onChange={handleFormData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    //src="/public/images/default_user_avatar.png"
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="avatar"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={handleFormData}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {avatarFileName}
                </label>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={isLoading}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
