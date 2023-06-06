import React, { useEffect, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import Suggestions from "./DefaultSuggestions";

import "./autoComplete.scss";

const AutoComplete = (props) => {
  const {
    onChange,
    name,
    label,
    placeholder,
    required,
    extraParams,
    response,
    fireRequest,
    isLoading,
    setResponse,
    search,
    setSearch,
    isOpen,
    setIsOpen,
    downArrow,
  } = props;

  const inputRef = useRef();
  const ref = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  }, [setIsOpen]);

  useEffect(() => {
    if (search !== "") {
      fireRequest(true, { search, ...extraParams });
    } else {
      setIsOpen(false);
      setResponse();
    }
  }, [extraParams, search, setIsOpen, setResponse, fireRequest]);

  useEffect(() => {
    if (response) {
      setIsOpen(true);
    }
  }, [response, setIsOpen]);

  const suggestionClick = useCallback(
    (value) => {
      onChange({ target: { name, value } });
      inputRef.current.value = "";
      setSearch("");
    },
    [name, onChange, setSearch],
  );
  const debounceChange = useMemo(
    () =>
      debounce((val) => {
        setSearch(val);
      }, 500),
    [setSearch],
  );

  const handleChange = (e) => {
    debounceChange(e.target.value);
  };
  const showDropDown = () => {
    const buttonClass = `collapse-icon ${isOpen ? "rotate" : ""}`;
    if (isLoading) {
      return (
        <div className="loader-dropdown">
          <Spinner variant="primary" animation="border" size="sm" />
        </div>
      );
    } else {
      if (response) {
        return (
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            <img src={downArrow} alt="arrow" className={buttonClass} />
          </button>
        );
      }
    }
  };
  const showSuggestionDropdown = () =>
    isOpen ? (
      <div className="suggestions shadow-sm border-light">
        {response?.length > 0 ? (
          <Suggestions click={suggestionClick} suggestions={response} />
        ) : (
          <p className="p-2 text-center mb-0">{t("noData")}</p>
        )}
      </div>
    ) : null;
  const requiredField = required ? <span className="text-danger">*</span> : null;
  return (
    <div className="autoComplete" ref={ref}>
      {label && (
        <label htmlFor={name}>
          {label}
          {requiredField}
        </label>
      )}
      <div className="field">
        <input
          ref={inputRef}
          autoComplete="off"
          type="text"
          placeholder={placeholder}
          name={name}
          id={name}
          onChange={handleChange}
        />
        {showDropDown()}
      </div>
      {showSuggestionDropdown()}
    </div>
  );
};
export default React.memo(AutoComplete);

AutoComplete.defaultProps = {
  placeholder: "",
  label: null,
  required: false,
  extraParams: null,
};
AutoComplete.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  query: PropTypes.func.isRequired,
  extraParams: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  response: PropTypes.any,
  fireRequest: PropTypes.func,
  isLoading: PropTypes.bool,
  setResponse: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  downArrow: PropTypes.any,
};
