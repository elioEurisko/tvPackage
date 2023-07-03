import React, { useCallback } from "react";
import AppImage from "../../Atoms/appImage/AppImage";
import AppText from "../../Atoms/appText/AppText";
import Box from "@material-ui/core/Box";
import styles from "../../../styles/404.module.scss";
import AppButton from "../../Atoms/appButton/AppButton";
import { useHistory } from "react-router";
import routeNames from "../../../utils/routeNames";

import image404 from "../../../public/static/icons/notFound.svg";

function Custom404() {
  const router = useHistory();
  const onClick = useCallback(() => {
    router.push(routeNames.home).then(() => {
      window.scrollTo(0, 0);
    });
  }, [router]);

  return (
    <Box className={styles.container}>
      <Box pt={24 / 8} flexShrink={1} mx={2}>
        <AppImage src={image404} className={styles.errorImage} alt="404" isCenter />
      </Box>
      <Box mt={30 / 8}>
        <AppText className={styles.text404}>الصفحة غير موجودة</AppText>
      </Box>
      <Box mt={1} className={styles.textBox}>
        <AppText className={styles.secondText404}>
          معذرةً ، يبدو أننا فقدنا هذه الصفحة ، لكننا لا نريد أن نفقدك.
        </AppText>
      </Box>
      <Box mb={128 / 8}>
        <AppButton
          color="secondary"
          variant="contained"
          className={styles.goBackToHomePage}
          onEnterPress={onClick}
          shouldFocusOnMount
        >
          عودة إلى الصفحة الرئيسية
        </AppButton>
      </Box>
    </Box>
  );
}

export default Custom404;
