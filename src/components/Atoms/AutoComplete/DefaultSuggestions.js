import React from "react";
import PropTypes from "prop-types";

const DefaultSuggestions = ({ suggestions, click }) => {
  return (
    <ul>
      {suggestions.map((item) => (
        <li role="menuitem" key={item.value} onClick={() => click(item)}>
          {item.label}
        </li>
      ))}
    </ul>
  );
};

DefaultSuggestions.defaultProps = {
  suggestions: null,
};
DefaultSuggestions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  suggestions: PropTypes.arrayOf(PropTypes.object),
  click: PropTypes.func.isRequired,
};

export default DefaultSuggestions;
