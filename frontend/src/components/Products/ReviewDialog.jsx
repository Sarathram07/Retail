import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../actions/productAction";

const ReviewDialog = ({ open, onClose, productId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { isLoading } = useSelector((state) => state.productState);

  // -----------------------------------------------------------------------------------------------------------------------

  const reviewSubmitHandler = () => {
    const form = new FormData();
    form.append("rating", rating);
    form.append("comment", comment);
    form.append("productId", productId);
    dispatch(createReview(form));
  };

  // -----------------------------------------------------------------------------------------------------------------------

  return (
    <Dialog open={open} onClose={onClose} slots={{ transition: null }}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Submit Review
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <ul className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <li
              className={`star ${star <= rating ? "orange" : ""}`}
              key={star}
              onClick={() => setRating(star)}
              onMouseOver={(e) => e.target.classList.add("yellow")}
              onMouseOut={(e) => e.target.classList.remove("yellow")}
            >
              <i className="fa fa-star"></i>
            </li>
          ))}
        </ul>

        <textarea
          name="review"
          id="review"
          className="form-control mt-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </DialogContent>

      <DialogActions>
        <Button
          //className="btn my-3 px-4 text-white float-right review-btn"
          variant="contained"
          disabled={isLoading}
          onClick={reviewSubmitHandler}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
