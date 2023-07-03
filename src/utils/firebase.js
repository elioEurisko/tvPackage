import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import config from "./config";

const clientCredentials = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId,
};

// Check that `window` is in scope for the analytics module!
if (typeof window !== "undefined" && !firebase?.apps?.length) {
  firebase.initializeApp(clientCredentials);
  if ("measurementId" in clientCredentials && "projectId" in clientCredentials) {
    firebase.analytics();
  }
}

export default firebase;
