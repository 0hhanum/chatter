import { logOut, authService } from "firebaseSetting";
import React from "react";
import { Link } from "react-router-dom";

const logoutFunction = () => logOut(authService);
const Navigation = ({ userObj }) => <nav>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">{userObj.displayName}'s Profile</Link></li>
        <li><a href="#" onClick={logoutFunction}>Logout</a></li>
    </ul>
</nav>;

export default Navigation;