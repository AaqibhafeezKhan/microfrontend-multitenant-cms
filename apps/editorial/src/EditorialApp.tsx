import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import type { TenantConfig } from "@cms/tenant-config";
import { isFlagEnabled } from "@cms/tenant-config";
import "./editorial.css";
import { ContentList } from "./views/ContentList";
import { ContentEditor } from "./views/ContentEditor";

interface EditorialAppProps {
  tenant: TenantConfig;
}

export function EditorialApp({ tenant }: EditorialAppProps) {
  return (
    <div className="editorial-root">
      <header className="editorial-header">
        <h1 className="editorial-title">Editorial</h1>
        <p className="editorial-subtitle">
          {tenant.branding.companyName} Content Management
        </p>
        {isFlagEnabled(tenant, "versionHistory") && (
          <span className="editorial-feature-badge">Version History</span>
        )}
      </header>
      <nav className="editorial-subnav" aria-label="Editorial navigation">
        <NavLink to="/editorial" end className={({ isActive }) => `editorial-nav-link ${isActive ? "editorial-nav-link--active" : ""}`}>
          All Content
        </NavLink>
        <NavLink to="/editorial/new" className={({ isActive }) => `editorial-nav-link ${isActive ? "editorial-nav-link--active" : ""}`}>
          New Article
        </NavLink>
      </nav>
      <div className="editorial-content">
        <Routes>
          <Route path="/editorial" element={<ContentList tenant={tenant} />} />
          <Route path="/editorial/new" element={<ContentEditor tenant={tenant} />} />
          <Route path="/editorial/:id/edit" element={<ContentEditor tenant={tenant} />} />
        </Routes>
      </div>
    </div>
  );
}
