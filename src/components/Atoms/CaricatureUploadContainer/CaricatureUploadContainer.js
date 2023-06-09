import React from "react";

import "./CaricatureUploadContainer.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import TitleWithSwitch from "../../Molecules/TitleWithSwitch/TitleWithSwitch";
import FormikField from "../FormikField/FormikField";
import ImageWithPlaceHolder from "../ImageWithPlaceHolder/ImageWithPlaceHolder";
import DatePicker from "../DatePicker/DatePicker";

const CaricatureUploadContainer = ({ file, values, setFieldValue, errors, touched, handleBlur }) => {
  const { t } = useTranslation("albumDetails");
  const onDateChange = (name, value) => {
    setFieldValue(name, value);
  };

  return (
    <div className="upload-photo-container">
      <Row>
        <Col md={12} lg={3} className="img-caricature-upload">
          {file && <ImageWithPlaceHolder src={file.preview} className="dropzone-img" alt="" />}
        </Col>
        <Col md={12} lg={9}>
          <Row>
            <Col md={12} lg>
              <DatePicker
                name="date"
                date={values.date}
                dateFormat="yyyy/MM/dd"
                label={t("caricature.caricatureDate")}
                isReadOnly
                required
                onDateChange={onDateChange}
                error={errors.date}
                touched={touched.date}
                handleBlur={handleBlur}
              />
            </Col>
            <Col md={12} lg="auto" className="d-flex align-items-end mt-3 mt-md-0">
              <TitleWithSwitch
                name="paid"
                value={values.paid}
                title={t("caricature.paidTitle")}
                subTitle={t("caricature.paidSubtitle")}
                onChange={() => setFieldValue("paid", !values.paid)}
              />
            </Col>
            <Col xs={12} className="mt-3">
              <FormikField
                name="title"
                required
                label={t("caricature.titleLabel")}
                placeholder={t("caricature.titlePlaceholder")}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

CaricatureUploadContainer.propTypes = {
  file: PropTypes.object,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default CaricatureUploadContainer;
