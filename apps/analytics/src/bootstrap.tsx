import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import AnalyticsPage from "./AnalyticsPage";
import "./globals.css";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: AnalyticsPage,
  domElementGetter: () =>
    document.getElementById("single-spa-application:analytics") ??
    (() => {
      const el = document.createElement("div");
      el.id = "single-spa-application:analytics";
      document.body.appendChild(el);
      return el;
    })(),
  errorBoundary(err: any) {
    return (
      <div style={{ padding: "1rem", color: "#ef4444" }}>
        <strong>Analytics failed to load:</strong> {err.message}
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

