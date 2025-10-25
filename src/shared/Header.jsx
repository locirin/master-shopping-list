import { NavLink } from "react-router-dom";

export default function Header({ theme, onCycleTheme, appliedTheme }) {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 700 : 400,
    textDecoration: "none",
    color: "inherit",
  });

  const linkButtonStyle = {
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    font: "inherit",
    color: "inherit",
    textDecoration: "none",
    fontWeight: 600,
  };

  const isDark = appliedTheme === "dark";
  const icon = isDark ? "🌙" : "☀️";
  const aria = `Theme: ${appliedTheme}${theme === "auto" ? " (auto)" : ""}. Click to switch theme.`;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.75rem 1rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "1rem",
          width: "100%",
          maxWidth: "960px",
        }}
      >
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/categories" style={linkStyle}>
          Settings
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          About
        </NavLink>
        <NavLink to="/notes" style={linkStyle}>
          Notes
        </NavLink>

        <button
          type="button"
          onClick={onCycleTheme}
          style={{ ...linkButtonStyle, fontSize: "1.15rem", lineHeight: 1 }}
          aria-label={aria}
          title={aria}
        >
          {icon}
        </button>
      </div>
    </header>
  );
}
