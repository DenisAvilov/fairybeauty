import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { Page404 } from "../componentsPages/404/Page404"
import { Login } from "../componentsPages/authPages/login/Login"
import { Register } from "../componentsPages/authPages/register/Register"
import { Main } from "../componentsPages/main/Main"
import { Post } from "../componentsPages/post/Post"

import { Private } from "../componentsPages/private/Private"

export const useRouter = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <Main />
                </Route>
                <Route path="/private" exact>
                    <Private />
                </Route>
                <Route path="/posts">
                    <Post />
                </Route>
                <Route path="/404" exact>
                    <Page404 />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <Main />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/register" exact>
                <Register />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}