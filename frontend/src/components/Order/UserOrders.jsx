import React, { useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { userAllOrders: userOrders = [] } = useSelector(
    (state) => state.orderState
  );

  useEffect(() => {
    dispatch(userOrdersAction);
  }, []);

  const columns = [
    {
      headerName: "Order ID",
      field: "id",
      flex: 1,
    },
    {
      headerName: "Number of Items",
      field: "numOfItems",
      type: "number",
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
            color: params.value.includes("Delivered") ? "green" : "red",
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
        <Link to={`/order/${params.row.id}`} className="btn btn-primary">
          <i className="fa fa-eye" /> View
        </Link>
      ),
    },
  ];

  const rows = [];
  userOrders.forEach((uOrder) => {
    return rows.push({
      id: uOrder._id,
      numOfItems: uOrder.orderItems.length,
      amount: `$${uOrder.totalPrice}`,
      status: uOrder.orderStatus,
      actions: "View",
    });
  });

  return (
    <>
      <div>
        <MetaData namedTitle={"My Orders"} />
        <h1 className="mt-5"> My Orders </h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
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
      </div>
    </>
  );
};

export default UserOrders;
