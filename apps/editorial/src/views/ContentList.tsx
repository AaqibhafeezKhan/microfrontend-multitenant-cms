import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TenantConfig } from "@cms/tenant-config";
import { eventBus } from "@cms/event-bus";
import { useSharedStore } from "@cms/shared-store";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  author: string;
  updatedAt: string;
  wordCount: number;
}

const sampleContent: ContentItem[] = [
  {
    id: "content_001",
    title: "Getting Started with Headless CMS Architecture",
    slug: "getting-started-headless-cms",
    status: "published",
    author: "Alex Chen",
    updatedAt: "2024-03-15T10:30:00Z",
    wordCount: 2340,
  },
  {
    id: "content_002",
    title: "Multi-Tenant Design Patterns in Modern Web Apps",
    slug: "multi-tenant-design-patterns",
    status: "draft",
    author: "Sarah Okafor",
    updatedAt: "2024-03-14T16:45:00Z",
    wordCount: 1890,
  },
  {
    id: "content_003",
    title: "Microfrontend Communication Strategies",
    slug: "microfrontend-communication",
    status: "published",
    author: "James Watanabe",
    updatedAt: "2024-03-12T09:00:00Z",
    wordCount: 3100,
  },
  {
    id: "content_004",
    title: "Module Federation Internals",
    slug: "module-federation-internals",
    status: "archived",
    author: "Priya Sharma",
    updatedAt: "2024-02-28T14:20:00Z",
    wordCount: 4200,
  },
];

type StatusFilter = "all" | "draft" | "published" | "archived";

interface ContentListProps {
  tenant: TenantConfig;
}

export function ContentList({ tenant }: ContentListProps) {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const user = useSharedStore((state) => state.auth.user);
  const addNotification = useSharedStore((state) => state.addNotification);

  const filtered = sampleContent.filter(
    (item) => statusFilter === "all" || item.status === statusFilter
  );

  function handlePublish(item: ContentItem) {
    eventBus.emit("editorial:content-published", {
      contentId: item.id,
      slug: item.slug,
      tenantId: tenant.id,
      publishedBy: user?.id ?? "anonymous",
    });
    addNotification({
      type: "success",
      message: `"${item.title}" has been published.`,
    });
  }

  return (
    <div className="content-list">
      <div className="content-list-toolbar">
        <div className="status-filters" role="group" aria-label="Filter by status">
          {(["all", "published", "draft", "archived"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              className={`status-filter-btn ${statusFilter === s ? "status-filter-btn--active" : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/editorial/new")}
        >
          New Article
        </button>
      </div>

      <div className="content-table-wrapper">
        <table className="content-table" aria-label="Content items">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Author</th>
              <th>Words</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="content-row">
                <td>
                  <div className="content-title">{item.title}</div>
                  <div className="content-slug">/{item.slug}</div>
                </td>
                <td>
                  <span className={`status-badge status-badge--${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td className="content-author">{item.author}</td>
                <td className="content-wordcount">
                  {item.wordCount.toLocaleString()}
                </td>
                <td className="content-date">
                  {new Date(item.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <div className="content-actions">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => navigate(`/editorial/${item.id}/edit`)}
                    >
                      Edit
                    </button>
                    {item.status === "draft" && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePublish(item)}
                      >
                        Publish
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
