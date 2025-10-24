// src/shared/Button.jsx
export default function Button({
  children,
  onClick,
  style,
  type = "button",
  size = "xs",
}) {
  const sizes = {
    xs: {
      padding: "0.16rem 0.42rem",
      fontSize: "0.9rem",
      borderRadius: "0.3rem",
    },
    sm: {
      padding: "0.22rem 0.52rem",
      fontSize: "0.95rem",
      borderRadius: "0.35rem",
    },
    md: {
      padding: "0.34rem 0.68rem",
      fontSize: "1rem",
      borderRadius: "0.45rem",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        cursor: "pointer",
        lineHeight: 1.1,
        ...sizes[size],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
