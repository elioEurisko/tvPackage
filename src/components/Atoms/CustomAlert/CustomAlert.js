import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Approve from "../DynamicIcons/Approve";
import Close from "../DynamicIcons/Close";

import "./CustomAlert.scss";

const CustomAlert = ({ message, type }) => {
  const { t } = useTranslation();

  return (
    <div className="action">
      {type === "danger" ? <Close /> : <Approve />}
      <span>{t(`alerts.${message}`)}</span>
    </div>
  );
};

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: "danger" | "approve",
};
export default CustomAlert;
