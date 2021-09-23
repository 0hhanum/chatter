import { authService, googleLogin, githubLogin, popUp } from "firebaseSetting";
import React from "react";
import AuthForm from "../components/AuthForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faComment, faTimes } from "@fortawesome/free-solid-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faComment}
                color={"#00762a"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">Google 로 계속하기 <FontAwesomeIcon icon={faGoogle} /></button>
                <button className="authBtn" onClick={onSocialClick} name="github">Github 로 계속하기 <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    )
}

export default Auth;