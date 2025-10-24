import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Message cannot be empty!");
      return;
    }
    setError("");
    alert("Message sent! (for demo purposes only)");
    setName("");
    setMessage("");
  }

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Contact Developer</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Your name:
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </label>
        </p>
        <p>
          <label>
            Message:
            <br />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </label>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" size="xs">
          Send Message
        </button>
      </form>
    </section>
  );
}
