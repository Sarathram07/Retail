import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import LoaderComponent from "../Layouts/LoaderComponent";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import SideBar from "./SideBar";
import {
  deleteAdminReviews,
  getAdminReviews,
} from "../../actions/adminActions/adminReviewAction";
import {
  clearAdminDeleteReview,
  clearAdminReviewError,
} from "../../reducer/admin/reviewSlice";

const ReviewList = () => {
  const dispatch = useDispatch();
  const {
    isLoading = true,
    isReviewDeleted,
    error,
    reviewsData: reviews = [],
  } = useSelector((state) => state.admin_ReviewState);

  const [prodID, setProdID] = useState("");

  // -------------------------------------------------------------------------------------------------------------------------

  const deleteHandler = (e, rid) => {
    e.target.disabled = true;
    dispatch(deleteAdminReviews(prodID, rid));
  };

  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(getAdminReviews(prodID));
  };

  // -------------------------------------------------------------------------------------------------------------------------

  const columns = [
    {
      headerName: "ID",
      field: "id",
      flex: 1,
    },
    {
      headerName: "Rating",
      field: "rating",
      flex: 1,
    },
    {
      headerName: "user",
      field: "user",
      flex: 1,
    },
    {
      headerName: "Comment",
      field: "comment",
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={(e) => deleteHandler(e, params.row.id)}
          >
            <i className="fa fa-trash" />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = [];
  reviews.forEach((r) => {
    return rows.push({
      id: r._id,
      rating: r.rating,
      user: r.user.name,
      comment: r.comment,
      actions: "",
    });
  });

  // -------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (error) {
      showErrorToast(error, {
        onOpen: () => {
          dispatch(clearAdminReviewError());
        },
      });
      return;
    }

    if (isReviewDeleted) {
      showSuccessToast("Review - Deleted Successfully", {
        onOpen: () => {
          dispatch(clearAdminDeleteReview());
        },
      });
      dispatch(getAdminReviews(prodID));
      return;
    }
  }, [error, isReviewDeleted, prodID, dispatch]);

  // -------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Reviews Lists</h1>

          <div className="row justify-content-center mt-5">
            <div className="col-5">
              <form onSubmit={reviewHandler}>
                <div className="form-group">
                  <label> Product Id </label>
                  <input
                    className="form-control"
                    type="text"
                    value={prodID}
                    onChange={(e) => setProdID(e.target.value)}
                  />
                </div>
                <Button
                  className="btn btn-primary btn-block py-2"
                  type="submit"
                  disabled={isLoading}
                >
                  Search Review
                </Button>
              </form>
            </div>
          </div>

          <>
            {isLoading ? (
              <LoaderComponent />
            ) : (
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  className="px-3"
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  sx={{
                    border: 1,
                  }}
                />
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ReviewList;
