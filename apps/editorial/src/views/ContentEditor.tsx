import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { TenantConfig } from "@cms/tenant-config";
import { isFlagEnabled } from "@cms/tenant-config";
import { eventBus } from "@cms/event-bus";
import { useSharedStore } from "@cms/shared-store";

interface ContentEditorProps {
  tenant: TenantConfig;
}

interface EditorFormState {
  title: string;
  slug: string;
  body: string;
  status: "draft" | "published";
  locale: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ContentEditor({ tenant }: ContentEditorProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSharedStore((state) => state.auth.user);
  const addNotification = useSharedStore((state) => state.addNotification);
  const isMultiLang = isFlagEnabled(tenant, "multiLanguage");

  const [form, setForm] = useState<EditorFormState>({
    title: "",
    slug: "",
    body: "",
    status: "draft",
    locale: tenant.defaultLocale,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      setForm({
        title: "Microfrontend Communication Strategies",
        slug: "microfrontend-communication",
        body: "Microfrontends enable teams to develop, deploy, and scale frontend applications independently. The key challenge is establishing reliable communication patterns between independently deployed modules without creating tight coupling.\n\nThere are three primary approaches: shared event buses using the DOM CustomEvent API, federated state stores using libraries like Zustand mounted as window singletons, and URL-based state for link-shareable cross-app coordination.",
        status: "published",
        locale: tenant.defaultLocale,
      });
    }
  }, [id, isEditMode, tenant.defaultLocale]);

  useEffect(() => {
    const count = form.body.trim() === "" ? 0 : form.body.trim().split(/\s+/).length;
    setWordCount(count);
  }, [form.body]);

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugify(value),
    }));
  }

  function handleSave(status: "draft" | "published") {
    setIsSaving(true);
    const contentId = id ?? `content_${Date.now()}`;

    setTimeout(() => {
      setIsSaving(false);

      eventBus.emit("editorial:content-saved", {
        contentId,
        tenantId: tenant.id,
        isDraft: status === "draft",
      });

      if (status === "published") {
        eventBus.emit("editorial:content-published", {
          contentId,
          slug: form.slug,
          tenantId: tenant.id,
          publishedBy: user?.id ?? "anonymous",
        });
      }

      addNotification({
        type: "success",
        message:
          status === "draft"
            ? "Draft saved successfully."
            : "Article published successfully.",
      });

      navigate("/editorial");
    }, 800);
  }

  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="content-editor">
      <div className="editor-toolbar">
        <div className="editor-meta">
          <span className="editor-mode-label">
            {isEditMode ? "Editing article" : "New article"}
          </span>
          <span className="editor-wordcount">{wordCount} words</span>
          <div className="framework-badge framework-badge--react">React State Sync</div>
        </div>
        <div className="editor-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/editorial")}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSave("published")}
            disabled={isSaving || !form.title.trim()}
          >
            {isSaving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className={`editor-container ${showPreview ? "editor-container--with-preview" : ""}`}>
        <div className="editor-form">
          <input
            className="editor-title-input"
            type="text"
            placeholder="Article title"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            aria-label="Article title"
          />

          <div className="editor-slug-row">
            <label className="editor-slug-label" htmlFor="editor-slug">
              Slug
            </label>
            <input
              id="editor-slug"
              className="editor-slug-input"
              type="text"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
            />
          </div>

          <textarea
            className="editor-body"
            placeholder="Write your article content here..."
            value={form.body}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, body: e.target.value }))
            }
            aria-label="Article body"
            rows={24}
          />
        </div>

        {showPreview && (
          <div className="preview-pane">
            <h2 className="preview-title">{form.title || "Untitled Article"}</h2>
            <div className="preview-body">
              {form.body || "Start typing to see the preview..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
