import React, { Suspense } from "react";
// import "./App.scss"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const Login = React.lazy(() => import("@/pages/Login"));
const Layout = React.lazy(() => import("@/pages/Layout"));
const ProfileEdit = React.lazy(() => import("@/pages/Profile/Edit"));
export default function App() {
  return (
    <Router>
      <div className="app">
        {/* <Link to="/login">登录</Link>
      <Link to="/home">首页</Link> */}

        <Suspense fallback={<div>loading... </div>}>
          <Router>
            <div className="app">
              <Switch>
                <Redirect exact from="/" to="/home"></Redirect>
                <Route path="/login" component={Login}></Route>
                <Route path="/home" component={Layout}></Route>
                <Route path="/profile/edit" component={ProfileEdit}></Route>
              </Switch>
            </div>
          </Router>
        </Suspense>
      </div>
    </Router>
  );
}
