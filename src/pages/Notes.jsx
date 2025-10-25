import { useState, useEffect } from "react";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes_v1");
      if (raw) setNotes(JSON.parse(raw));
    } catch (e) {
      // ignore storage write errors
      void e;
    }
  }, []);

  function persist(next) {
    try {
      localStorage.setItem("notes_v1", JSON.stringify(next));
    } catch (e) {
      // ignore storage write errors
      void e;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!note.trim()) {
      setError("Note cannot be empty!");
      return;
    }

    setError("");
    const entry = {
      id: "n_" + Date.now(),
      title: title.trim() || "Untitled",
      text: note.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [entry, ...notes].slice(0, 20); // keep latest 20
    setNotes(next);
    persist(next);
    setTitle("");
    setNote("");
  }

  return (
    <section style={{ padding: "1rem" }}>
      <h2>🗒️ My Notes</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Title:
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </label>
        </p>
        <p>
          <label>
            My Note:
            <br />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="4"
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </label>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" size="xs">
          Add
        </button>
      </form>
      <hr style={{ margin: "1rem 0" }} />
      <h3 style={{ marginBottom: "0.5rem" }}></h3>
      {notes.length === 0 ? (
        <p classtitle="muted">No notes yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notes.map((n) => (
            <li key={n.id} className="row" style={{ marginBottom: "0.5rem" }}>
              <div style={{ fontWeight: 600 }}>{n.title}</div>
              <div style={{ fontSize: "0.95rem" }}>{n.text}</div>
              <div className="muted" style={{ fontSize: "0.8rem" }}>
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
