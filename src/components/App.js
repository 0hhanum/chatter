import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseSetting";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // firbase의 currentUser 값을 state value 로 setState => 로그인 여부 파악가능.
  // useState => 배열 반환. 첫번째 원소 value, 두번째는 상태를 업데이트하는 함수.
  return <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; H A N U M {new Date().getFullYear()}</footer>
  </>;

}

export default App;
