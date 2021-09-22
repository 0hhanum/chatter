import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, checkAuthState, updateUserProfile } from "firebaseSetting";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // firebase의 currentUser 값을 state value 로 setState => 로그인 여부 파악가능.
  // useState => 배열 반환. 첫번째 원소 value, 두번째는 상태를 업데이트하는 함수.
  // 근데 이렇게 했을 때 문제점 -> 웹 로딩 되자마자 실행돼서 fb 가 currentUser 가져오기 전에 실행됨. 그래서 아래방법 이용.
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    checkAuthState(authService, async (user) => {
      // checkAuthState => auth state 가 변할 때마다 실행되는 firebase 의 listener
      // componentDidMount 와 유사. mount 될 때 실행된다.
      if (user) {
        if (!user.displayName) {
          const userName = user.email.split("@")[0];
          await updateUserProfile(user, {
            displayName: userName,
          })
        }
        // setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateUserProfile(user, args), //updateUserProfile 메서드를 오브젝트에 담아 다루기.
        });
        // 그냥 user 를 줄 수 있지만 react 는 거대한 object 가 변경되었을 때 변화를 판단해 재 render 하는 것에 약함.
        // 필요한 요소만 담아 object 를 축소.
      }
      else { // login 후 logout 했을 경우
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj(
      {
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => updateUserProfile(user, args),
      }
    )
  };
  return <>
    {init ? < AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "로딩중..."}
    <footer>&copy; H A N U M {new Date().getFullYear()}</footer>
  </>;

}

export default App;
