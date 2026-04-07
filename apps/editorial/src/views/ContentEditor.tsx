import { useState, useEffect } from "react";
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

  // Undo/Redo History Implementation
  const [history, setHistory] = useState<{ past: EditorFormState[], future: EditorFormState[] }>({
    past: [],
    future: []
  });

  function updateFormWithHistory(newForm: EditorFormState) {
    setHistory(prev => ({
      past: [...prev.past, form],
      future: []
    }));
    setForm(newForm);
  }

  function handleUndo() {
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    
    setHistory({
      past: newPast,
      future: [form, ...history.future]
    });
    setForm(previous);
  }

  function handleRedo() {
    if (history.future.length === 0) return;
    const next = history.future[0];
    const newFuture = history.future.slice(1);

    setHistory({
      past: [...history.past, form],
      future: newFuture
    });
    setForm(next);
  }

  return (
    <div className="content-editor">
      <div className="editor-toolbar">
        <div className="editor-meta">
          <span className="editor-mode-label">
            {isEditMode ? "Editing article" : "New article"}
          </span>
          <span className="editor-wordcount">{wordCount} words</span>
          <div className="framework-badge framework-badge--react">React State Sync + Rewind</div>
        </div>
        <div className="editor-actions">
          <div className="history-group mr-4">
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleUndo}
              disabled={history.past.length === 0}
              title="Undo"
            >
              ⟲
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleRedo}
              disabled={history.future.length === 0}
              title="Redo"
            >
              ⟳
            </button>
          </div>
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
            onChange={(e) => {
              const val = e.target.value;
              updateFormWithHistory({
                ...form,
                title: val,
                slug: slugify(val)
              });
            }}
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
              onChange={(e) => updateFormWithHistory({ ...form, slug: e.target.value })}
            />
          </div>

          <textarea
            className="editor-body"
            placeholder="Write your article content here..."
            value={form.body}
            onChange={(e) => updateFormWithHistory({ ...form, body: e.target.value })}
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
