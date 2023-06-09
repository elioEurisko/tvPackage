import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import PropTypes from "prop-types";

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});
const style = {
  control: (provided) => ({
    ...provided,
    minHeight: 40,
    border: "1px solid var(--secondary-color)!important",
    boxShadow: "none",
  }),
};

const CustomCreatableSelect = ({ name, onChange, value, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (event) => {
    if (!inputValue) {
      return;
    }
    switch (event.key) {
      case "Enter":
      case "Tab":
        setInputValue("");
        onChange({ target: { value: [...value, createOption(inputValue)], name } });
        event.preventDefault();
        break;
      default:
        break;
    }
  };
  return (
    <CreatableSelect
      className="react-select"
      name={name}
      components={components}
      inputValue={inputValue}
      styles={style}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(selected) =>
        onChange({ target: { value: selected && selected.length !== 0 ? selected : undefined, name } })
      }
      onInputChange={setInputValue}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      value={value}
    />
  );
};
CustomCreatableSelect.defaultProps = {
  value: [],
  placeholder: null,
};
CustomCreatableSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
};

export default React.memo(CustomCreatableSelect);
