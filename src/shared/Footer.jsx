import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "1rem",
        marginTop: "2rem",
        fontSize: "0.9rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        <span>© 2025 locirin. All rights reserved.</span>
      </div>
    </footer>
  );
}
