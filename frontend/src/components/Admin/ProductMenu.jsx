import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

const ProductMenu = () => {
  const navigate = useNavigate();
  const [anchorEle, setAnchorEle] = useState(null);
  const open = Boolean(anchorEle);

  const handleClick = (event) => {
    setAnchorEle(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEle(null);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        startIcon={<i className="fa fa-product-hunt" />}
        endIcon={<ArrowDropDownIcon />}
        // sx={{ textTransform: "none" }} // optional, cleaner UI
      >
        Product
      </Button>

      <Menu anchorEl={anchorEle} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/admin/products");
          }}
        >
          <i className="fa fa-shopping-basket" style={{ marginRight: 8 }} />
          ALL
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/admin/products/create");
          }}
        >
          <i className="fa fa-plus" style={{ marginRight: 8 }} />
          Create Product
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProductMenu;
