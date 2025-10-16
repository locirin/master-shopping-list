export default function ChildrenSection({ title, children }) {
  return (
    <section style={{ padding: "1rem" }}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}
