import { useState } from "react";
import Button from "../../shared/Button.jsx";

export default function NewListForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed.length === 0) {
      setError("Title is required");
      return;
    }
    if (trimmed.length > 50) {
      setError("Title must be 50 characters or less");
      return;
    }
    onCreate(trimmed); // send valid title up
    setTitle("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <label htmlFor="new-list-title">List title</label>{" "}
      <input
        id="new-list-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="ex.: Weekly Groceries"
        style={{ marginRight: "0.5rem" }}
      />
      <Button type="submit">Add List</Button>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
    </form>
  );
}
