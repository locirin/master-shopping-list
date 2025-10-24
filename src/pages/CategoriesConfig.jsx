import { useState } from "react";
import Button from "../shared/Button.jsx";

export default function CategoriesConfig({
  appState,
  onAddCategory,
  onDeleteCategories,
  onToggleShowInDropdown,
  onEditCategory,
}) {
  const [newName, setNewName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const categories = (appState.categories || [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  function handleAdd() {
    const t = newName.trim();
    if (!t) return;
    onAddCategory(t);
    setNewName("");
  }
  // toggle single checkbox
  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  // select or deselect all
  function toggleSelectAll() {
    if (selectedIds.length === categories.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categories.map((c) => c.id));
    }
  }

  function handleDeleteSelected() {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} selected category(ies)?`))
      return;
    onDeleteCategories(selectedIds);
    setSelectedIds([]);
  }

  function handleToggleShow() {
    if (selectedIds.length === 0) return;
    onToggleShowInDropdown(selectedIds);
    setSelectedIds([]);
  }

  function handleEditCategory(id, newLabel) {
    const t = newLabel.trim();
    if (!t) return;
    onEditCategory(id, t);
    setEditingId(null);
    setEditName("");
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h2
        style={{
          marginBottom: "0.75rem",
          fontWeight: 800,
          letterSpacing: "0.2px",
        }}
      >
        Categories Configuration
      </h2>
      <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>
        Manage, rename, and choose which categories appear in item dropdowns.
      </p>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ddd",
          marginBottom: "1rem",
        }}
      />

      <h3 style={{ margin: "0 0 0.25rem 0" }}>Add New Category</h3>

      <div style={{ margin: "0.75rem 0" }}>
        <label
          htmlFor="new-category"
          style={{
            fontWeight: 600,
            display: "inline-block",
            marginRight: "0.5rem",
          }}
        >
          New category name
        </label>
        <input
          id="new-category"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder="e.g., Produce"
          style={{ padding: "0.25rem", marginRight: "0.5rem" }}
        />
        <Button onClick={handleAdd}>Add Category</Button>
      </div>

      <p style={{ color: "var(--text)" }}>
        Total categories: {categories.length}
      </p>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--border)",
          margin: "0.75rem 0 1rem",
        }}
      />

      <h3
        style={{
          marginTop: "1.75rem",
          marginBottom: "0.75rem",
          fontWeight: 700,
        }}
      >
        Manage All Categories
      </h3>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "0.25rem",
          marginBottom: "1.25rem",
        }}
      >
        <Button onClick={toggleSelectAll} disabled={categories.length === 0}>
          {selectedIds.length === categories.length && categories.length > 0
            ? "Clear All"
            : "Select All"}
        </Button>
        <Button
          disabled={selectedIds.length === 0}
          onClick={handleDeleteSelected}
        >
          Delete Selected{selectedIds.length ? ` (${selectedIds.length})` : ""}
        </Button>
        <Button disabled={selectedIds.length === 0} onClick={handleToggleShow}>
          Show in Dropdown
          {selectedIds.length ? ` (${selectedIds.length})` : ""}
        </Button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.length === 0 ? (
          <li style={{ color: "#666" }}>No categories yet.</li>
        ) : (
          categories.map((c) => (
            // <li
            //   key={c.id}
            //   style={{
            //     marginBottom: "0.5rem",
            //     padding: "0.5rem",
            //     borderRadius: "6px",
            //     background: "var(--surface)",
            //     border: "1px solid var(--border)",
            //   }}
            // >
            //   <input
            //     type="checkbox"
            //     aria-label={`Select category ${c.name}`}
            //     checked={selectedIds.includes(c.id)}
            //     onChange={() => toggleSelect(c.id)}
            //     style={{ marginRight: "0.5rem" }}
            //   />

            //   {editingId === c.id ? (
            //     <input
            //       type="text"
            //       value={editName}
            //       onChange={(e) => setEditName(e.target.value)}
            //       onBlur={() => handleEditCategory(c.id, editName)}
            //       onKeyDown={(e) => {
            //         if (e.key === "Enter") handleEditCategory(c.id, editName);
            //         if (e.key === "Escape") {
            //           setEditingId(null);
            //           setEditName("");
            //         }
            //       }}
            //       autoFocus
            //       style={{ marginRight: "0.5rem", padding: "0.25rem" }}
            //     />
            //   ) : (
            //     <strong
            //       style={{
            //         cursor: "pointer",
            //         textDecoration: "underline",
            //         color: "var(--text)",
            //         textDecorationColor: "var(--primary)",
            //       }}
            //       onClick={() => {
            //         setEditingId(c.id);
            //         setEditName(c.name);
            //       }}
            //       title="Click to edit"
            //     >
            //       {c.name}
            //     </strong>
            //   )}

            //   <span
            //     style={{
            //       marginLeft: 8,
            //       color: "var(--muted)",
            //       fontWeight: 600,
            //     }}
            //   >
            //     {c.showInDropdown ? "• in dropdown" : "• hidden"}
            //   </span>
            //   <Button
            //     style={{ marginLeft: "0.5rem" }}
            //     onClick={() => onToggleShowInDropdown([c.id])}
            //   >
            //     {c.showInDropdown ? "Hide from dropdown" : "Show in dropdown"}
            //   </Button>
            // </li>
            <li
              key={c.id}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                aria-label={`Select category ${c.name}`}
                checked={selectedIds.includes(c.id)}
                onChange={() => toggleSelect(c.id)}
              />

              {editingId === c.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleEditCategory(c.id, editName)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditCategory(c.id, editName);
                    if (e.key === "Escape") {
                      setEditingId(null);
                      setEditName("");
                    }
                  }}
                  autoFocus
                  style={{ padding: "0.25rem" }}
                />
              ) : (
                <strong
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "var(--text)",
                    textDecorationColor: "var(--primary)",
                  }}
                  onClick={() => {
                    setEditingId(c.id);
                    setEditName(c.name);
                  }}
                  title="Click to edit"
                >
                  {c.name}
                </strong>
              )}

              <span style={{ color: "var(--muted)", fontWeight: 600 }}>
                {c.showInDropdown ? "• in dropdown" : "• hidden"}
              </span>

              <Button
                onClick={() => onToggleShowInDropdown([c.id])}
                style={{ width: "10rem" }}
              >
                {c.showInDropdown ? "Hide from dropdown" : "Show in dropdown"}
              </Button>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
