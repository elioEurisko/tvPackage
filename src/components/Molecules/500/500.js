import React, { useCallback } from "react";
import AppImage from "../../Atoms/appImage/AppImage";
import AppText from "../../Atoms/appText/AppText";
import Box from "@material-ui/core/Box";
import styles from "../../../styles/404.module.scss";
import AppButton from "../../Atoms/appButton/AppButton";
import { useHistory, useLocation } from "react-router";
import routeNames from "../../../utils/routeNames";
import image500 from "../../../public/static/icons/error500.svg";
import classNames from "classnames";

function Custom500() {
  const pathname = useLocation().pathname;
  const router = useHistory();
  const onClick = useCallback(() => {
    router.push(routeNames.home).then(() => {
      window.scrollTo(0, 0);
    });
  }, [router]);

  return (
    <Box
      className={classNames(styles.container, {
        [styles.isHomePage]: pathname === routeNames.home,
      })}
    >
      <Box pt={24 / 8} flexShrink={1} mx={2}>
        <AppImage src={image500} className={styles.errorImage} alt="404" isCenter />
      </Box>
      <Box mt={30 / 8}>
        <AppText className={styles.text404}>أوه لا!</AppText>
      </Box>
      <Box mt={1} className={styles.textBox}>
        <AppText className={styles.secondText404}>حدث خطأ ما. أعد المحاولة من فضلك</AppText>
      </Box>
      <Box mb={128 / 8}>
        <AppButton
          color="secondary"
          variant="contained"
          className={styles.goBackToHomePage}
          onEnterPress={onClick}
          shouldFocusOnMount
          focusKey="go_back_to_home_page_button"
        >
          عودة إلى الصفحة الرئيسية
        </AppButton>
      </Box>
    </Box>
  );
}

export default Custom500;
