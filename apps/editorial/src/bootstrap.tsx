import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { MemoryRouter } from "react-router-dom";
import type { TenantConfig } from "@cms/tenant-config";
import { EditorialApp } from "./EditorialApp";

interface EditorialCustomProps {
  tenant: TenantConfig;
}

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: (props: EditorialCustomProps) => (
    <MemoryRouter>
      <EditorialApp tenant={props.tenant} />
    </MemoryRouter>
  ),
  errorBoundary(err: Error) {
    return (
      <div className="editorial-error">
        <p>Editorial failed to load: {err.message}</p>
      </div>
    );
  },
  domElementGetter: () =>
    document.getElementById("single-spa-application:editorial") ??
    (() => {
      const el = document.createElement("div");
      document.body.appendChild(el);
      return el;
    })(),
});

export const { bootstrap, mount, unmount } = lifecycles;
