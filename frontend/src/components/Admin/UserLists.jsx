import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import LoaderComponent from "../Layouts/LoaderComponent";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import SideBar from "./SideBar";
import {
  deleteAdminUser,
  getAdminUsers,
} from "../../actions/adminActions/adminUsersAction";
import {
  clearAdminUserDeleted,
  clearAdminUserError,
} from "../../reducer/admin/userSlice";

const UserLists = () => {
  const dispatch = useDispatch();
  const {
    isLoading = true,
    isUserDeleted,
    error,
    multipleUsers: userFromDB = [],
  } = useSelector((state) => state.admin_UserState);

  // -------------------------------------------------------------------------------------------------------------------------

  const deleteHandler = (e, uid) => {
    e.target.disabled = true;
    dispatch(deleteAdminUser(uid));
  };

  // -------------------------------------------------------------------------------------------------------------------------

  const columns = [
    {
      headerName: "ID",
      field: "id",
      flex: 1,
    },
    {
      headerName: "Name",
      field: "name",
      flex: 1,
    },
    {
      headerName: "Email",
      field: "email",
      flex: 1,
    },
    {
      headerName: "Role",
      field: "role",
      flex: 1,
      //   renderCell: (params) => (
      //     <p
      //       style={{
      //         color: params.value.includes("Processing") ? "red" : "green",
      //       }}
      //     >
      //       {params.value}
      //     </p>
      //   ),
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user/${params.row.id}`} className="btn btn-primary">
            <i className="fa fa-pencil" />
          </Link>
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
  userFromDB.forEach((u) => {
    return rows.push({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      actions: "",
    });
  });

  // -------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (error) {
      showErrorToast(error, {
        onOpen: () => {
          dispatch(clearAdminUserError());
        },
      });
      return;
    }

    if (isUserDeleted) {
      showSuccessToast("User - Deleted Successfully", {
        onOpen: () => {
          dispatch(clearAdminUserDeleted());
        },
      });
      return;
    }

    dispatch(getAdminUsers);
  }, [error, isUserDeleted, dispatch]);

  // -------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Users Lists</h1>
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

export default UserLists;
