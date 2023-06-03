import React from "react";
import { Route, Redirect } from "react-router-dom";
import { hasToken } from "@/utils/storage.js";

export default function index({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // console.log(hasToken());
        if (hasToken()) {
          return <Component></Component>;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: location.pathname,
                },
              }}
            ></Redirect>
          );
        }
      }}
    ></Route>
  );
}
