import { useState } from "react";
import Button from "../../shared/Button.jsx";

export default function NewItemForm({
  onCreate,
  categories = [],
  onAddCategory,
}) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length === 0) {
      setError("Name is required");
      return;
    }
    const n = Number(qty);
    if (Number.isNaN(n) || n < 0) {
      setError("Quantity must be 0 or more");
      return;
    }
    onCreate({
      name: trimmed,
      quantity: n,
      categoryId: categoryId || undefined,
    });
    setName("");
    setQty(1);
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "1rem", maxWidth: "360px" }}
    >
      <label htmlFor="item-name">Item</label>{" "}
      <input
        id="item-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Milk"
        style={{ width: "100%", maxWidth: "360px", marginBottom: "0.5rem" }}
      />
      {/* <label htmlFor="item-qty">Qty</label>{" "}
      <input
        id="item-qty"
        type="number"
        min="0"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        style={{ width: "5rem", marginRight: "0.5rem" }}
      />
      <select
        value={categoryId}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "__new__") {
            setShowNewCat(true);
            setCategoryId("");
          } else {
            setShowNewCat(false);
            setCategoryId(val);
          }
        }}
        style={{ marginRight: "0.5rem" }}
      >
        <option value="">No category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
        {onAddCategory && <option value="__new__">+ New category…</option>}
      </select> */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <label htmlFor="item-qty" style={{ whiteSpace: "nowrap" }}>
          Qty
        </label>
        <input
          id="item-qty"
          type="number"
          min="0"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          style={{ width: "5rem" }}
        />
        <select
          value={categoryId}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "__new__") {
              setShowNewCat(true);
              setCategoryId("");
            } else {
              setShowNewCat(false);
              setCategoryId(val);
            }
          }}
          style={{ flex: 1 }}
        >
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
          {onAddCategory && <option value="__new__">+ New category…</option>}
        </select>
      </div>
      {showNewCat && onAddCategory && (
        <>
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Category name"
            style={{ marginRight: "0.5rem" }}
          />
          <Button
            type="button"
            onClick={() => {
              const t = newCatName.trim();
              if (!t) return;
              onAddCategory(t);
              setNewCatName("");
              setShowNewCat(false);
              // user can now pick it from the dropdown
            }}
          >
            Add
          </Button>
        </>
      )}
      <Button
        type="submit"
        size="xs"
        style={{
          width: "auto",
          padding: "0.25rem 0.6rem",
          minWidth: "fit-content",
        }}
      >
        Add Item
      </Button>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
    </form>
  );
}
