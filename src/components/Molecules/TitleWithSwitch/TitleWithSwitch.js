import React from "react";
import PropTypes from "prop-types";
import SwitchControl from "../../Atoms/SwitchControl/SwitchControl";
import TitleWithSubTitle from "../../Atoms/TitleWithSubTitle/TitleWithSubTitle";

import "./TitleWithSwitch.scss";

const TitleWithSwitch = ({ title, subTitle, name, value, onChange, removeFlex }) => {
  return (
    <div className={`switch-with-title ${removeFlex ? "removeFlex" : ""}`}>
      <TitleWithSubTitle title={title} subTitle={subTitle} />
      <SwitchControl name={name} checked={value} handleChange={onChange} />
    </div>
  );
};

TitleWithSwitch.defaultProps = {
  title: "",
  subTitle: "",
  name: "",
  value: "",
  onChange: () => {},
  removeFlex: false,
};

TitleWithSwitch.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  removeFlex: PropTypes.bool,
};

export default React.memo(TitleWithSwitch);
