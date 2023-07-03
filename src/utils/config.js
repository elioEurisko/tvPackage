import pjson from "../../package.json";

const local = "LOCAL";
const dev = "DEV";

const config = {
  version: pjson.version,
  env: process.env.REACT_APP_PUBLIC_ENV,
  apiUrl: process.env.REACT_APP_PUBLIC_API_URL,
  webUrl: process.env.REACT_APP_PUBLIC_APP_URL,
  apiTimeout: process.env.REACT_APP_PUBLIC_API_TIMEOUT,
  mashhadLogo: "../public/static/icons/exclusive.png",
  environments: {
    local,
    dev,
    uat: "UAT",
    prod: "PROD",
  },
  firebase: {
    apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
      process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_PUBLIC_FIREBASE_MESUREMENT_ID,
  },
  isLocal: process.env.REACT_APP_PUBLIC_ENV === local,
  isDev: process.env.REACT_APP_PUBLIC_ENV === dev,
  defaultLanguage: "ar",
  supportedLanguages: { ar: "ar" },
};

export default config;
