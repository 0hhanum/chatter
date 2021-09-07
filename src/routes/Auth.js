import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    // 초기값 "" 으로 useState 호출 -> [value(""), setFunction] 으로 이루어진 배열을 반환
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value)
        }
    };
    // => value를 intercept 해 setFunction 에 넣는다. => state value 값이 변하고 아래 input 의 value 가 state 값이기 때문에 입력이 가능해진다.왜 이렇게 ?
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="text" placeholder="이메일" required value={email} />
                <input onChange={onChange} name="password" type="password" placeholder="비밀번호" required value={password} />
                <input type="submit" value="로그인" />
            </form>
            <div>
                <button>Google 로 계속하기</button>
                <button>Github 로 계속하기</button>
            </div>
        </div>
    )
}

export default Auth;