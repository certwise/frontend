import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
dotenv.config();
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_apiKey,
	authDomain: process.env.REACT_APP_FIREBASE_authDomain,
	projectId: process.env.REACT_APP_FIREBASE_projectId,
	storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
	messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
	appId: process.env.REACT_APP_FIREBASE_appId,
	measurementId: process.env.REACT_APP_FIREBASE_measurementId,
};

export const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const env = {
	url: process.env.REACT_APP_URL,
	sentryEnv: process.env.REACT_APP_SENTRY_ENV,
	//url: "https://api.certwise.app",
};
