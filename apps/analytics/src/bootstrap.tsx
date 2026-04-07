import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import AnalyticsPage from "./AnalyticsPage";
import "./globals.css";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: AnalyticsPage,
  errorBoundary(err: any, _info: any, _props: any) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <h3 className="font-bold">Analytics microfrontend failed to load</h3>
        <p className="text-sm">{err.message}</p>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
