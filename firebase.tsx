import { initializeApp } from "firebase/app";    
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFLBNXHwejlVYXKrQR0xEJVGXEIpjkhSM",
    authDomain: "khatmah-a3f79.firebaseapp.com",
    projectId: "khatmah-a3f79",
    storageBucket: "khatmah-a3f79.appspot.com",
    messagingSenderId: "483257232889",
    appId: "1:483257232889:web:46279e598edf64b941a128",
    measurementId: "G-PF734CRLGY"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  export default auth;



    