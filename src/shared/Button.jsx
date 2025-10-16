export default function Button({ children, ...props }) {
  return (
    <button {...props} style={{ padding: "0.5rem 0.75rem", cursor: "pointer" }}>
      {children}
    </button>
  );
}
