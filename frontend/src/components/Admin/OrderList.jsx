import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import LoaderComponent from "../Layouts/LoaderComponent";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import SideBar from "./SideBar";
import {
  adminDeleteOrder,
  adminOrder as adminOrderAction,
} from "../../actions/adminActions/adminOrderAction";
import {
  clearOrderDeleted,
  clearOrderError,
} from "../../reducer/admin/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const {
    isLoading = true,
    isOrderDeleted,
    error,
    adminAllOrders: adminOrders = [],
  } = useSelector((state) => state.admin_OrderState);

  // -------------------------------------------------------------------------------------------------------------------------

  const deleteHandler = (e, oid) => {
    e.target.disabled = true;
    dispatch(adminDeleteOrder(oid));
  };

  // -------------------------------------------------------------------------------------------------------------------------

  const columns = [
    {
      headerName: "ID",
      field: "id",
      flex: 1,
    },
    {
      headerName: "Number Of Items",
      field: "noOfItems",
      flex: 1,
    },
    {
      headerName: "Amount",
      field: "amount",
      flex: 1,
    },
    {
      headerName: "Status",
      field: "status",
      flex: 1,
      renderCell: (params) => (
        <p
          style={{
            color: params.value.includes("Processing") ? "red" : "green",
          }}
        >
          {params.value}
        </p>
      ),
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link
            to={`/admin/order/${params.row.id}`}
            className="btn btn-primary"
          >
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
  adminOrders.forEach((o) => {
    return rows.push({
      id: o._id,
      noOfItems: o.orderItems.length,
      amount: `$${o.totalPrice}`,
      status: o.orderStatus,
      actions: "",
    });
  });

  // -------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (error) {
      showErrorToast(error, {
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }

    if (isOrderDeleted) {
      showSuccessToast("Order - Deleted Successfully", {
        onOpen: () => {
          dispatch(clearOrderDeleted());
        },
      });
      return;
    }

    dispatch(adminOrderAction);
  }, [error, isOrderDeleted, dispatch]);

  // -------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Order Lists</h1>
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
                    //   "& .MuiDataGrid-row:hover": {
                    //     backgroundColor: "#f5f5f5",
                    //   },
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

export default OrderList;
