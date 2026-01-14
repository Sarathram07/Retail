import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  clearUpdateProfile,
  clearAuthError,
  updateProfile,
} from "../../actions/userAction";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user: existProfileData,
    error,
    isUpdated,
  } = useSelector((state) => state.authState);

  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [pwd, setPwd] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    //pwd: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_user_avatar.png"
  );

  // --------------------------------------------------------------------------------------------------------------

  const onChangeUserData = (event) => {
    let attName = event.target.name;
    let attValue = event.target.value;

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
      setUserData({ ...userData, [attName]: attValue });
    }
  };

  // --------------------------------------------------------------------------------------------------------------

  const updateUserDataHandler = (e) => {
    e.preventDefault();
    let updatedData = new FormData();
    updatedData.append("name", userData.name);
    updatedData.append("email", userData.email);
    //updatedData.append("password", userData.pwd);
    updatedData.append("avatar", avatar);
    dispatch(updateProfile(updatedData));
  };

  // --------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (existProfileData) {
      setUserData({
        name: existProfileData.name || "",
        email: existProfileData.email || "",
      });

      //   if (existProfileData.avatar?.url) {
      //     setAvatarPreview(existProfileData.avatar.url);
      //   }

      if (existProfileData?.avatar) {
        setAvatarPreview(existProfileData.avatar);
      }

      // if update successful
      if (isUpdated) {
        showSuccessToast("Profile - Updated Successfully", {
          onOpen: () => {
            dispatch(clearUpdateProfile);
          },
        });

        //navigate("/")
        return;
      }

      if (error) {
        showErrorToast(error, {
          onOpen: () => {
            dispatch(clearAuthError);
          },
        });
      }
    }
  }, [existProfileData, isUpdated, error, dispatch]);

  // --------------------------------------------------------------------------------------------------------------

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow-lg"
          encType="multipart/form-data"
          onSubmit={updateUserDataHandler}
        >
          <h1 className="mt-2 mb-5">Update Profile</h1>

          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={userData.name}
              onChange={onChangeUserData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={userData.email}
              onChange={onChangeUserData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar Preview"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChangeUserData}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
