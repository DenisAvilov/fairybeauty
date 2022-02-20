import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { PostGreate } from "../componentsCurrent/postCreate/PostGreate"
import { Page404 } from "../componentsPages/404/Page404"
import { Login } from "../componentsPages/authPages/login/Login"
import { Register } from "../componentsPages/authPages/register/Register"
import { Main } from "../componentsPages/main/Main"
import { Post } from "../componentsPages/post/Post"

import { Private } from "../componentsPages/private/Private"

export const useRouter = (isAuthenticated) => {
    const bool = false
    if (bool) {
        return (
            <Switch>
                <Route path="/" exact>
                    <Main />
                </Route>
                <Route path="/private" exact>
                    <Private />
                </Route>
                <Route path="/post/create" exact>
                    <PostGreate />
                </Route>
                <Route path="/post" exact>
                    <Post />
                </Route>
                <Route path="/post/:id">
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
            <Route path="/api/login" exact>
                <Login />
            </Route>
            <Route path="/api/registration" exact>
                <Register />
            </Route>
            <Route path="/post">
                <Post />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}