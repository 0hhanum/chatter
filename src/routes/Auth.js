import { authService, googleLogin, githubLogin, popUp } from "firebaseSetting";
import React from "react";
import AuthForm from "../components/AuthForm";

const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name } } = event;
        let provider;
        if (name === "google") {
            provider = new googleLogin();
            const result = await popUp(authService, provider);
            const credential = githubLogin.credentialFromResult(result);
        } else if (name === "github") {
            provider = new githubLogin()
            const result = await popUp(authService, provider);
            const credential = githubLogin.credentialFromResult(result);
        };
    };
    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Google 로 계속하기</button>
                <button onClick={onSocialClick} name="github">Github 로 계속하기</button>
            </div>
        </div>
    )
}

export default Auth;