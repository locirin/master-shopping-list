import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button.jsx";

export default function CreateList({ onCreateList }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a list name.");
      return;
    }
    setError("");
    onCreateList(title);
    navigate("/");
  }

  return (
    <section style={{ padding: "1rem" }}>
      <h2>📝 Name your shopping list</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Weekly Groceries"
          style={{ width: "100%", maxWidth: "300px", marginBottom: "0.5rem" }}
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div
          style={{ display: "inline-flex", gap: "0.5rem", marginTop: "0.5rem" }}
        >
          <Button type="submit" size="xs" style={{ width: "auto" }}>
            Save
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/")}
            size="xs"
            style={{ width: "auto" }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
