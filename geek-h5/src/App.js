import React, { Suspense } from "react";
// import "./App.scss"
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthRoute from "@/component/AuthRoute";
import history from "@/utils/history.js";
const Login = React.lazy(() => import("@/pages/Login"));
const Layout = React.lazy(() => import("@/pages/Layout"));
const ProfileEdit = React.lazy(() => import("@/pages/Profile/Edit"));
const ProfileChat = React.lazy(() => import("@/pages/Profile/Chat"));
export default function App() {
  return (
    //注意:BrowserRouter等于Router history={history}
    <Router history={history}>
      <div className="app">
        {/* <Link to="/login">登录</Link>
      <Link to="/home">首页</Link> */}

        <Suspense fallback={<div>loading... </div>}>
          <Route>
            <div className="app">
              <Switch>
                <Redirect exact from="/" to="/home"></Redirect>
                <Route path="/login" component={Login}></Route>
                <Route path="/home" component={Layout}></Route>
                <AuthRoute
                  path="/profile/edit"
                  component={ProfileEdit}
                ></AuthRoute>
                <AuthRoute
                  path="/profile/chat"
                  component={ProfileChat}
                ></AuthRoute>
              </Switch>
            </div>
          </Route>
        </Suspense>
      </div>
    </Router>
  );
}
