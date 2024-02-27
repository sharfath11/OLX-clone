import { initializeApp, } from "firebase/app"; 
import "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGk4Wl8nVu6pLYVIN5AR8fgY5o-c2PgiE",
  authDomain: "olx11-45a1a.firebaseapp.com",
  projectId: "olx11-45a1a",
  storageBucket: "olx11-45a1a.appspot.com",
  messagingSenderId: "506682501334",
  appId: "1:506682501334:web:e0255fec6315dfc2750177",
  measurementId: "G-LLZ7FWH1BN"
};
const Firebase = initializeApp(firebaseConfig); 
export default Firebase 
export const imgdb=getStorage(Firebase)
