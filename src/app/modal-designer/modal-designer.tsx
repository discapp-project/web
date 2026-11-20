"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Link, Plus, Trash2 } from "lucide-react";

type ModalField = {
  id: string;
  label: string;
  customId: string;
  placeholder: string;
  style: "short" | "paragraph";
  required: boolean;
  minLength: string;
  maxLength: string;
};

function makeField(index: number): ModalField {
  return {
    id: crypto.randomUUID(),
    label: `Question ${index}`,
    customId: `question_${index}`,
    placeholder: "Type your response",
    style: "short",
    required: true,
    minLength: "",
    maxLength: "",
  };
}

export default function ModalDesigner() {
  const [title, setTitle] = useState("Tell us more");
  const [customId, setCustomId] = useState("feedback_modal");
  const [fields, setFields] = useState<ModalField[]>([makeField(1)]);
  const [copied, setCopied] = useState(false);

  const validationError = useMemo(() => {
    if (!title.trim() || title.length > 45) return "Modal title must be between 1 and 45 characters.";
    if (!customId.trim() || customId.length > 100) return "Modal custom_id must be between 1 and 100 characters.";
    if (fields.length < 1 || fields.length > 5) return "A modal must have between 1 and 5 text inputs.";
    const ids = new Set<string>();
    for (const [index, field] of fields.entries()) {
      if (!field.label.trim() || field.label.length > 45) return `Input ${index + 1} label must be between 1 and 45 characters.`;
      if (!field.customId.trim() || field.customId.length > 100) return `Input ${index + 1} custom_id must be between 1 and 100 characters.`;
      if (ids.has(field.customId)) return "Each input custom_id must be unique.";
      ids.add(field.customId);
      if (field.placeholder.length > 100) return `Input ${index + 1} placeholder must be 100 characters or fewer.`;
      const minLength = field.minLength === "" ? undefined : Number(field.minLength);
      const maxLength = field.maxLength === "" ? undefined : Number(field.maxLength);
      if (minLength !== undefined && (!Number.isInteger(minLength) || minLength < 0 || minLength > 4000)) return `Input ${index + 1} minimum length must be between 0 and 4,000.`;
      if (maxLength !== undefined && (!Number.isInteger(maxLength) || maxLength < 1 || maxLength > 4000)) return `Input ${index + 1} maximum length must be between 1 and 4,000.`;
      if (minLength !== undefined && maxLength !== undefined && minLength > maxLength) return `Input ${index + 1} minimum length cannot exceed its maximum.`;
    }
    return null;
  }, [customId, fields, title]);

  const responseJson = useMemo(() => JSON.stringify({
    type: 9,
    data: {
      custom_id: customId,
      title,
      components: fields.map((field) => ({
        type: 18,
        label: field.label,
        component: {
          type: 4,
          custom_id: field.customId,
          style: field.style === "paragraph" ? 2 : 1,
          ...(field.placeholder.trim() && { placeholder: field.placeholder.trim() }),
          required: field.required,
          ...(field.minLength !== "" && { min_length: Number(field.minLength) }),
          ...(field.maxLength !== "" && { max_length: Number(field.maxLength) }),
        },
      })),
    },
  }, null, 2), [customId, fields, title]);

  const updateField = (id: string, changes: Partial<ModalField>) => {
    setFields((current) => current.map((field) => field.id === id ? { ...field, ...changes } : field));
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(responseJson);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="tool-page modal-tool-page">
      <header className="tool-page-heading">
        <div className="modal-page-heading-row">
          <h1>Discord Modal Designer</h1>
        </div>
        <p>Design and preview a modal response for a Discord application interaction.</p>
      </header>

      <section className="modal-designer" aria-label="Discord modal designer">
      <div className="modal-editor">
        <p className="modal-capability-note" role="note">
          This is a preview and JSON export. We can not send or maintain modals for you. For information on how to implement modals, check out the <a href="https://docs.discord.com/developers/components/using-modal-components" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Discord Documentation</a>.
        </p>

        <div className="modal-field-grid">
          <label className="modal-control">
            Modal title <span>{title.length}/45</span>
            <input maxLength={45} value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="modal-control">
            Modal custom_id <span>{customId.length}/100</span>
            <input maxLength={100} value={customId} onChange={(event) => setCustomId(event.target.value)} />
          </label>
        </div>

        <div className="modal-input-list">
          {fields.map((field, index) => (
            <div className="modal-input-editor" key={field.id}>
              <div className="modal-input-heading">
                <span>TEXT INPUT {index + 1}</span>
                <button
                  type="button"
                  aria-label={`Remove input ${index + 1}`}
                  disabled={fields.length === 1}
                  onClick={() => setFields((current) => current.filter((item) => item.id !== field.id))}
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="modal-field-grid">
                <label className="modal-control">
                  Label <span>{field.label.length}/45</span>
                  <input maxLength={45} value={field.label} onChange={(event) => updateField(field.id, { label: event.target.value })} />
                </label>
                <label className="modal-control">
                  Component custom_id <span>{field.customId.length}/100</span>
                  <input maxLength={100} value={field.customId} onChange={(event) => updateField(field.id, { customId: event.target.value })} />
                </label>
                <label className="modal-control">
                  Input style
                  <select value={field.style} onChange={(event) => updateField(field.id, { style: event.target.value as ModalField["style"] })}>
                    <option value="short">Short answer</option>
                    <option value="paragraph">Paragraph</option>
                  </select>
                </label>
                <label className="modal-control">
                  Placeholder <span>{field.placeholder.length}/100</span>
                  <input maxLength={100} value={field.placeholder} onChange={(event) => updateField(field.id, { placeholder: event.target.value })} />
                </label>
                <label className="modal-control">
                  Minimum length
                  <input type="number" min={0} max={4000} value={field.minLength} onChange={(event) => updateField(field.id, { minLength: event.target.value })} />
                </label>
                <label className="modal-control">
                  Maximum length
                  <input type="number" min={1} max={4000} value={field.maxLength} onChange={(event) => updateField(field.id, { maxLength: event.target.value })} />
                </label>
              </div>
              <label className="modal-required-toggle">
                <input type="checkbox" checked={field.required} onChange={(event) => updateField(field.id, { required: event.target.checked })} />
                Required
              </label>
            </div>
          ))}
        </div>

        <div className="modal-designer-actions">
          <button type="button" disabled={fields.length >= 5} onClick={() => setFields((current) => [...current, makeField(current.length + 1)])}>
            <Plus size={14} /> Add text input
          </button>
          <button type="button" disabled={Boolean(validationError)} onClick={copyJson}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy response JSON"}
          </button>
        </div>
        {validationError && <p className="modal-validation" role="alert">{validationError}</p>}
      </div>

      <aside className="modal-preview-panel">
        <div className="modal-preview-heading"><span>Preview</span><span>{fields.length}/5 inputs</span></div>
        <div className="modal-preview-window">
          <h3>{title || "Modal title"}</h3>
          {fields.map((field) => (
            <div className="modal-preview-field" key={field.id}>
              <strong>{field.label || "Input label"}{field.required && <span> *</span>}</strong>
              <div className={`modal-preview-input${field.style === "paragraph" ? " is-paragraph" : ""}`}>
                {field.placeholder || (field.style === "paragraph" ? "Type your response..." : "Type a response...")}
              </div>
            </div>
          ))}
        </div>
        <label className="modal-control">
          Interaction response JSON
          <textarea className="modal-json" aria-label="Modal interaction response JSON" readOnly value={responseJson} />
        </label>
      </aside>
      </section>
    </main>
  );
}