export default function ChildrenSection({ title, children }) {
  return (
    <section className="children-section" style={{ padding: "0.75rem 1rem" }}>
      {title ? <h2 className="section-title">{title}</h2> : null}
      {children}
    </section>
  );
}
