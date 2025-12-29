import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// ▼▼▼ 방금 복사한 config 내용을 여기에 덮어쓰세요! ▼▼▼
const firebaseConfig = {
   apiKey: "AIzaSyAPMULVY-OfLvofvFOVP1uL-pmmHLTzKO4",

  authDomain: "cnblue-3logy.firebaseapp.com",

  databaseURL: "https://cnblue-3logy-default-rtdb.firebaseio.com",

  projectId: "cnblue-3logy",

  storageBucket: "cnblue-3logy.firebasestorage.app",

  messagingSenderId: "1004898595552",

  appId: "1:1004898595552:web:f54b3d66ee2bc1d12b5685",

  measurementId: "G-65BQHMCCS9"
};
// ▲▲▲ 여기까지 ▲▲▲

// 파이어베이스 시작!
const app = initializeApp(firebaseConfig);
// 실시간 데이터베이스 기능 내보내기
export const database = getDatabase(app);