import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
    // && => Navigation 이 존재하려면 isLoggedIn == true 여야함
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn
                    ?
                    <>
                        <Route exact path="/">
                            <Home></Home>
                        </Route>
                        <Route exact path="/profile">
                            <Profile></Profile>
                        </Route>
                    </>
                    :
                    <Route exact path="/"><Auth></Auth></Route>}
            </Switch>
        </Router>
    )
}

export default AppRouter;