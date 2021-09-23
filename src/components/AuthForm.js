import { authService, createUser, signInEmail } from "firebaseSetting";
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    // 초기값 "" 으로 useState 호출 -> [value(""), setFunction] 으로 이루어진 배열을 반환
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value)
        }
    };
    // => value를 intercept 해 setFunction 에 넣는다. => state value 값이 변하고 아래 input 의 value 가 state 값이기 때문에 입력이 가능해진다.왜 이렇게 ?
    // => submit 하면 새로고침이 되고 react 또한 초기화되기 떄문. 그래서 onSubmit 도 막아준다.
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                // 계정 생성
                data = await createUser(authService, email, password);
                await signInEmail(authService, email, password);
            } else {
                // 로그인
                data = await signInEmail(authService, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    // 이전 값에 반대되는 값을 반환(toggle) => setNewAccount 에 반대값이 입력 => newAccount 값 변경
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input onChange={onChange} name="email" type="email" placeholder="이메일" required value={email} className="authInput" />
                <input onChange={onChange} name="password" type="password" placeholder="비밀번호" required value={password} className="authInput" />
                <input type="submit" value={newAccount ? "계정 생성" : "로그인"} className="authInput authSubmit" />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "로그인" : "계정 생성"}</span>
        </>
    )
};

export default AuthForm;