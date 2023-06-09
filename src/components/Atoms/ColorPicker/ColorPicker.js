import React, { useRef, useState, useEffect } from "react";
import SketchPicker from "react-color/lib/Sketch";
import PropTypes from "prop-types";

import "./ColorPicker.scss";

const ColorPicker = ({ label, color, onChange, name }) => {
  const [showPicker, setShowPicker] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  }, []);
  return (
    <div className="color-picker" ref={ref}>
      <label>{label}</label>
      <div className="picker">
        <div className="color-value">{color}</div>
        <button
          type="button"
          aria-label="Change Color"
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        />
        {showPicker && (
          <div className="picker-box">
            <SketchPicker onChangeComplete={(e) => onChange({ target: { value: e.hex, name } })} color={color} />
          </div>
        )}
      </div>
    </div>
  );
};
ColorPicker.defaultProps = {
  color: "#ffffff",
};
ColorPicker.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ColorPicker;
