import { useState } from "react";
import Button from "../../shared/Button.jsx";

export default function NewItemForm({ onCreate }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState("");
  const [error, setError] = useState("");

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
    onCreate({ name: trimmed, quantity: n, unit: unit.trim() });
    setName("");
    setQty(1);
    setUnit("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <label htmlFor="item-name">Item</label>{" "}
      <input
        id="item-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Milk"
        style={{ marginRight: "0.5rem" }}
      />
      <label htmlFor="item-qty">Qty</label>{" "}
      <input
        id="item-qty"
        type="number"
        min="0"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        style={{ width: "5rem", marginRight: "0.5rem" }}
      />
      <label htmlFor="item-unit">Unit</label>{" "}
      <input
        id="item-unit"
        type="text"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        placeholder="L, kg, pcs"
        style={{ width: "6rem", marginRight: "0.5rem" }}
      />
      <Button type="submit">Add Item</Button>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
    </form>
  );
}
