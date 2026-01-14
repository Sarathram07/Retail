import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user: profileData } = useSelector((state) => state.authState);

  return (
    <>
      {profileData && (
        <div className="row justify-content-around mt-5 user-info">
          <div className="col-12 col-md-3">
            <figure className="avatar avatar-profile">
              <img
                className="rounded-circle img-fluid"
                src={profileData?.avatar || "/images/default_user_avatar.png"}
                alt=""
              />
            </figure>
            <Link
              to={"/userprofile/update"}
              id="edit_profile"
              className="btn btn-primary btn-block my-5"
            >
              Edit Profile
            </Link>
          </div>

          <div className="col-12 col-md-5">
            <h4>Full Name</h4>
            <p>{profileData.name}</p>

            <h4>Email Address</h4>
            <p>{profileData.email}</p>

            <h4>Joined</h4>
            <p>{new Date(profileData.createdAt).toLocaleDateString("en-GB")}</p>

            <Link to={"/orders"} className="btn btn-danger btn-block mt-5">
              My Orders
            </Link>

            <Link
              to={"/userprofile/update/password"}
              className="btn btn-primary btn-block mt-3"
            >
              Change Password
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
