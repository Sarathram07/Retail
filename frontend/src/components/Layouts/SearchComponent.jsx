import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let [searchKey, setSearchKey] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${searchKey}`);
  };

  const clearKeyword = () => {
    setSearchKey("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // console.log("Enter key pressed");
      searchHandler(e);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);

  return (
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Enter Product Name ..."
        value={searchKey}
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <div className="input-group-append">
        <button id="search_btn" className="btn" onClick={searchHandler}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
