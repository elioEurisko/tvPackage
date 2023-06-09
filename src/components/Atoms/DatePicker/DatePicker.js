import React from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import "./DatePicker.scss";
import { useTranslation } from "react-i18next";
import CustomError from "../CustomError/CustomError";

const CustomInput = React.forwardRef(({ placeholder, onClick, value, onKeyDown }, ref) => {
  return (
    <input
      className="form-control"
      placeholder={placeholder}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={ref}
      value={value}
      type="text"
      readOnly={true}
    />
  );
});
CustomInput.displayName = "CustomInput";

CustomInput.propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
};

const DatePicker = ({
  label,
  date,
  onDateChange,
  name,
  placeholder,
  dateFormat,
  required,
  maxDate,
  showYearPicker,
  minDate,
  touched,
  isReadOnly,
  isClearable,
  ...props
}) => {
  const { i18n } = useTranslation();
  const requiredField = required ? <span className="text-danger">*</span> : null;
  const className = `form-control schedule-date-picker ${required && touched ? "border-danger" : ""}`;

  return (
    <div className="date-picker">
      {label && (
        <label>
          {label}
          {requiredField}
        </label>
      )}
      <ReactDatePicker
        selected={date}
        minDate={minDate}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        isClearable={isClearable}
        locale={i18n.language === "ar" ? "ar" : "en"}
        maxDate={maxDate}
        showYearPicker={showYearPicker}
        customInput={isReadOnly ? <CustomInput /> : undefined}
        autoComplete="off"
        {...props}
        popperPlacement="top-end"
        popperModifiers={{
          preventOverflow: {
            enabled: true,
          },
        }}
        name={name}
        className={className}
        onChange={(d) => onDateChange(name, d)}
      />

      {required && <CustomError name={name} />}
    </div>
  );
};

DatePicker.defaultProps = {
  label: null,
  placeholder: "",
  dateFormat: "Pp",
  maxDate: null,
  minDate: null,
  showYearPicker: false,
  touched: false,
  isReadOnly: false,
  isClearable: false,
};

DatePicker.propTypes = {
  label: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  dateFormat: PropTypes.string,
  required: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  showYearPicker: PropTypes.bool,
  touched: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isClearable: PropTypes.bool,
};

export default React.memo(DatePicker);
