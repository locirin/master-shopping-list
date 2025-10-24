import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    // <h1>Page Not Found</h1>;
    <section style={{ padding: "1rem", textAlign: "center" }}>
      <h2>Oops! This page doesn’t exist.</h2>
      <Link to="/">Go to Home</Link>
    </section>
  );
}
