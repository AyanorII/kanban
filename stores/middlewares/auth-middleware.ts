import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

export const authMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const isInLoginPage = window.location.pathname === "/login";
    const isUnauthorized = action.payload?.status === 401;

    if (isUnauthorized && !isInLoginPage) {
      api.dispatch({ type: "user/logout" });
    }

    return next(action);
  };
