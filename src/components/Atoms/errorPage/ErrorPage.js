/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import Custom404 from "../../Molecules/404/404";
import Custom500 from "../../Molecules/500/500";

function ErrorPage({ error }) {
  if (error?.status === 404) {
    return <Custom404 />;
  }
  return <Custom500 />;
}

ErrorPage.propTypes = {
  error: PropTypes.object.isRequired,
};

export default ErrorPage;
