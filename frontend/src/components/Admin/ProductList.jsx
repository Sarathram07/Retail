import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { getAdminProducts } from "../../actions/adminActions/productsAction";
import { clearAdminError } from "../../reducer/admin/productsSlice";
import LoaderComponent from "../Layouts/LoaderComponent";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import SideBar from "./SideBar";
import { deleteAdminProduct } from "../../actions/adminActions/adminProductAction";
import { adminProductDeleted } from "../../reducer/admin/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    isLoading = true,
    error,
    allProducts: products = [],
  } = useSelector((state) => state.admin_ProductsState);

  const { isProductDeleted, error: deleteError } = useSelector(
    (state) => state.admin_ProductState
  );

  // -------------------------------------------------------------------------------------------------------------------------

  const deleteHandler = (e, pid) => {
    e.target.disabled = true;
    dispatch(deleteAdminProduct(pid));
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
      headerName: "Price",
      field: "price",
      flex: 1,
    },
    {
      headerName: "Stock",
      field: "stock",
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link
            to={`/admin/product/${params.row.id}`}
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
  products.forEach((p) => {
    return rows.push({
      id: p._id,
      name: p.name,
      price: `$${p.price}`,
      stock: p.stock,
      actions: "",
    });
  });

  // -------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (error) {
      showErrorToast(error, {
        onOpen: () => {
          dispatch(clearAdminError());
        },
      });
      return;
    }

    if (deleteError) {
      showErrorToast(deleteError);
      return;
    }

    if (isProductDeleted) {
      showSuccessToast("Product - Deleted Successfully", {
        onOpen: () => {
          dispatch(adminProductDeleted());
        },
      });
      return;
    }
    dispatch(getAdminProducts);
  }, [error, deleteError, isProductDeleted, dispatch]);

  // -------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Products List</h1>
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

export default ProductList;
