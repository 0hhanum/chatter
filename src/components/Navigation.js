import { logOut, authService } from "firebaseSetting";
import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faComment, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

const logoutFunction = () => logOut(authService);
const Navigation = ({ userObj }) => <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
            <Link to="/" style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faComment} color={"#634e13"} size="2x" />
            </Link>
        </li>
        <li>
            <Link
                to="/profile"
                style={{
                    marginLeft: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: 12,
                }}>
                <FontAwesomeIcon icon={faUser} color={"#634e13"} size="2x" />
                {/* <span style={{ marginTop: 10 }}>
                    {userObj.displayName
                    ? `${userObj.displayName}의 프로필`
                    : "Profile"}
                </span> */}
            </Link>
        </li>
        <li>
            <a style={{
                marginLeft: 20,
                fontSize: 18,
                position: "absolute",
                top: "30px",
                right: "30px",
            }}
                href="#" onClick={logoutFunction}>
                <FontAwesomeIcon icon={faTimes} color={"blue"} size="2x" />
            </a>
        </li>
    </ul>
</nav>;

export default Navigation;