// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCc73dbfY7-6afeOUCbapgZZEw9BuaKC0A",
    authDomain: "label-e78ea.firebaseapp.com",
    projectId: "label-e78ea",
    storageBucket: "label-e78ea.appspot.com",
    messagingSenderId: "424674491001",
    appId: "1:424674491001:web:cc3791a5e0912519f732a8",
    measurementId: "G-79XQ016YVE"
  };

  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);
