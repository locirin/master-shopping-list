import { Link, useParams, useNavigate } from "react-router-dom";
import ChildrenSection from "../shared/ChildrenSection.jsx";
import Button from "../shared/Button.jsx";
import NewItemForm from "../features/items/NewItemForm.jsx";
import { useState, useMemo } from "react";

export default function ListDetail({
  appState,
  onAddItem,
  onToggleNeeded,
  onEditItem,
  onDeleteItem,
  onToggleCategory,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({
    name: "",
    quantity: "",
  });

  const items = useMemo(
    () => appState.items.filter((it) => it.listId === id),
    [appState.items, id],
  );

  const displayItems = useMemo(
    () => [
      ...items.filter((it) => it.needed),
      ...items.filter((it) => !it.needed),
    ],
    [items],
  );

  // Items grouped under category
  const itemsByCategory = useMemo(() => {
    const grouped = {};
    displayItems.forEach((it) => {
      const key = it.categoryId || "uncategorized";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(it);
    });
    return grouped;
  }, [displayItems]);

  const list = appState.lists.find((l) => l.id === id);

  if (!list) {
    return (
      <ChildrenSection title="List Not Found">
        <p>This list does not exist.</p>
        <Link to="/">Back to Home</Link>
      </ChildrenSection>
    );
  }
  function handleCreateItem(data) {
    onAddItem(id, data);
  }

  function renderItemRow(it) {
    const isEditing = editingId === it.id;
    return isEditing ? (
      <>
        <input
          type="text"
          value={editFields.name}
          onChange={(e) =>
            setEditFields((f) => ({ ...f, name: e.target.value }))
          }
          placeholder="Name"
          style={{ marginRight: "0.25rem" }}
        />
        <input
          type="number"
          value={editFields.quantity}
          onChange={(e) =>
            setEditFields((f) => ({ ...f, quantity: e.target.value }))
          }
          placeholder="Qty"
          style={{ width: "5rem", marginRight: "0.25rem" }}
        />

        <Button
          onClick={() => {
            onEditItem(it.id, {
              name: editFields.name.trim(),
              quantity: editFields.quantity,
            });
            setEditingId(null);
            setEditFields({ name: "", quantity: "" });
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            setEditingId(null);
            setEditFields({ name: "", quantity: "", unit: "" });
          }}
          style={{ marginLeft: "0.25rem" }}
        >
          Cancel
        </Button>
      </>
    ) : (
      <>
        <label>
          +{" "}
          <input
            type="checkbox"
            checked={!it.needed}
            onChange={() => onToggleNeeded(it.id)}
            style={{ marginRight: "0.5rem" }}
          />
          {it.name}
          {it.quantity ? ` — ${it.quantity}` : ""}
          {it.needed ? "" : " (in pantry)"}
        </label>
        <Button
          onClick={() => onToggleNeeded(it.id)}
          style={{ marginLeft: "0.5rem" }}
        >
          {it.needed ? "Mark in pantry" : "Mark needed"}
        </Button>
        <Button
          onClick={() => {
            setEditingId(it.id);
            setEditFields({
              name: it.name,
              quantity: it.quantity || "",
            });
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            if (confirm(`Delete "${it.name}"?`)) onDeleteItem(it.id);
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </Button>
      </>
    );
  }

  return (
    <ChildrenSection title={list.title}>
      <div style={{ marginBottom: "0.5rem" }}>
        <Button onClick={() => navigate("/")}> Back to Home</Button>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ddd",
          margin: "0.5rem 0 1rem",
        }}
      />

      <NewItemForm
        onCreate={handleCreateItem}
        categories={appState.categories.filter((c) => c.showInDropdown)}
      />
      {/* --- CATEGORY + ITEM DISPLAY --- */}
      {Object.keys(itemsByCategory).length === 0 ? (
        <p style={{ marginTop: "1rem" }}>No items yet.</p>
      ) : (
        <>
          {appState.categories
            .filter((c) => (itemsByCategory[c.id] || []).length > 0)
            .map((c) => {
              const catItems = itemsByCategory[c.id] || [];
              return (
                <div
                  key={c.id}
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "0.5rem",
                    borderTop: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <h4 style={{ margin: 0 }}>{c.name}</h4>
                    <span style={{ color: "#666" }}>({catItems.length})</span>
                    <Button
                      onClick={() => onToggleCategory(c.id)}
                      disabled={catItems.length === 0}
                    >
                      {c.collapsed ? "Show items" : "Hide items"}
                    </Button>
                  </div>
                  {!c.collapsed && catItems.length > 0 && (
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        marginTop: "0.5rem",
                      }}
                    >
                      {catItems.map((it) => (
                        <li
                          key={it.id}
                          className="row"
                          style={{ marginBottom: "0.5rem" }}
                        >
                          {renderItemRow(it)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

          {/* uncategorized items */}
          {itemsByCategory["uncategorized"]?.length ? (
            <div style={{ marginTop: "1rem" }}>
              <h4
                style={{
                  color: "#444",
                  borderTop: "1px solid #ddd",
                  paddingTop: "0.75rem",
                }}
              >
                Other Items
              </h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {itemsByCategory["uncategorized"].map((it) => (
                  <li
                    key={it.id}
                    className="row"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    {renderItemRow(it)}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}
    </ChildrenSection>
  );
}
