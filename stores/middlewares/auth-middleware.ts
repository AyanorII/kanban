import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

export const authMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (action.payload?.status === 401) {
      api.dispatch({ type: "user/logout" });
      api.dispatch({ type: "boards/resetCurrentBoard" });
      window.location.href = "/login";
    }

    return next(action);
  };
