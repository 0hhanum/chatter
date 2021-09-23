import { authService, googleLogin, githubLogin, popUp } from "firebaseSetting";
import React from "react";
import AuthForm from "../components/AuthForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faComment, faPizzaSlice, faPoo, faPoop, faTimes } from "@fortawesome/free-solid-svg-icons";

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
                icon={faPoo}
                color={"#846d00"}
                size="5x"
                style={{ marginBottom: 60 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">Google 로 계속하기 <span className="socialIcon"> <FontAwesomeIcon icon={faGoogle} color={"orange"} /></span></button>
                <button className="authBtn" onClick={onSocialClick} name="github">Github 로 계속하기 <span className="socialIcon"> <FontAwesomeIcon icon={faGithub} /></span></button>
            </div>
        </div>
    )
}

export default Auth;