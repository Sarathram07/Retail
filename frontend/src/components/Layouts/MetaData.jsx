import React from "react";
import { Helmet } from "react-helmet-async";

const MetaData = ({ namedTitle }) => {
  return (
    <Helmet>
      <title>{`${namedTitle}`}</title>
    </Helmet>
  );
};

export default MetaData;
