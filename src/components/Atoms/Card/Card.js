import React, { useCallback, useState } from "react";

import "./Card.scss";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import TitleWithSwitch from "../../Molecules/TitleWithSwitch/TitleWithSwitch";

const CardComponent = ({
  accordion,
  header,
  subHeader,
  cardBody,
  required,
  addSharingCheckboxes,
  bodyClassName,
  isHomeVideoSwitch,
  headerToggle,
  menuButtonHandler,
  showMenu,
  isHighlighted,
  isReadingNow,
  isVideoGallery,
  isRelatedShow,
  downArrow,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const requiredField = required ? <span className="text-danger">*</span> : null;
  const collapsedSetter = () => {
    setCollapsed(!collapsed);
  };
  const switchClicked = useCallback(() => {
    menuButtonHandler(!showMenu);
  }, [menuButtonHandler, showMenu]);

  return accordion ? (
    <Accordion defaultActiveKey="0">
      <Card
        className={`card-container ${isHomeVideoSwitch ? "removed-shadow" : "added-shadow"}`}
        onClick={collapsedSetter}
      >
        {!isHighlighted && (
          <>
            {!addSharingCheckboxes ? (
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                className={collapsed ? "card-header" : "card-header-collapsed"}
              >
                <div>
                  <p className="card-header-text">
                    {header}
                    {requiredField}
                  </p>
                  {subHeader && <p className="card-header-sub-text">{subHeader}</p>}
                </div>

                {!addSharingCheckboxes && downArrow && (
                  <div className={collapsed ? "icon rotate-clockwise" : "icon rotate-counter-clockwise"}>
                    <img src={downArrow} alt="" />
                  </div>
                )}
                {headerToggle && (
                  <TitleWithSwitch
                    name="enabled"
                    // title={t('createForm.published')}
                    onChange={switchClicked}
                    value={showMenu}
                    // removeFlex={removeFlex}
                  />
                )}
              </Accordion.Toggle>
            ) : (
              <>
                <div className="addSharingCheckboxes-style">
                  <p className="card-header-text">
                    {header}
                    {requiredField}
                  </p>
                  {subHeader && <p className="card-header-sub-text">{subHeader}</p>}
                </div>
                {!addSharingCheckboxes && downArrow && (
                  <div className={collapsed ? "icon rotate-clockwise" : "icon rotate-counter-clockwise"}>
                    <img src={downArrow} alt="" />
                  </div>
                )}
              </>
            )}
          </>
        )}

        <Accordion.Collapse eventKey="0">
          <Card.Body onClick={(e) => e.stopPropagation()} className={bodyClassName}>
            {cardBody}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  ) : (
    <Card className={`card-container ${isHomeVideoSwitch || isReadingNow ? "removed-shadow" : "added-shadow"}`}>
      {!isReadingNow && isVideoGallery && (
        <Card.Header>
          <div>
            <p className="card-header-text">{header}</p>
            {subHeader && <p className="card-header-sub-text">{subHeader}</p>}
          </div>
        </Card.Header>
      )}
      {!isRelatedShow ? (
        <Card.Body onClick={(e) => e.stopPropagation()} className={bodyClassName}>
          {cardBody}
        </Card.Body>
      ) : (
        <div onClick={(e) => e.stopPropagation()}>{cardBody}</div>
      )}
    </Card>
  );
};

CardComponent.defaultProps = {
  header: "",
  subHeader: "",
  accordion: false,
  required: false,
  bodyClassName: "",
  showMenu: false,
  menuButtonHandler: () => null,
  headerToggle: false,
  isRelatedShow: false,
};

CardComponent.propTypes = {
  header: PropTypes.string,
  accordion: PropTypes.bool,
  subHeader: PropTypes.string,
  cardBody: PropTypes.element.isRequired,
  required: PropTypes.bool,
  bodyClassName: PropTypes.string,
  showMenu: PropTypes.bool,
  menuButtonHandler: PropTypes.func,
  headerToggle: PropTypes.bool,
  isRelatedShow: PropTypes.bool,
  addSharingCheckboxes: PropTypes.bool,
  isHomeVideoSwitch: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  isReadingNow: PropTypes.bool,
  isVideoGallery: PropTypes.bool,
  downArrow: PropTypes.any,
};

export default React.memo(CardComponent);
