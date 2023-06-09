import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

const CustomError = ({ name, translation }) => {
  const { t } = useTranslation(translation);
  const { touched, errors } = useFormikContext();
  return touched[name] && errors[name] ? <div className="text-danger errorMessage mt-2">{t(errors[name])}</div> : null;
};
CustomError.defaultProps = {
  translation: null,
};

CustomError.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.string,
};
export default CustomError;
