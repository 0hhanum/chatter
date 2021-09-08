import { logOut, authService } from "firebaseSetting";
import React from "react";
import { Link } from "react-router-dom";

const logoutFunction = () => logOut(authService);
const Navigation = () => <nav>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li onClick={logoutFunction}>Logout</li>
    </ul>
</nav>;

export default Navigation;