export default function About() {
  return (
    <section style={{ padding: "1rem" }}>
      <h2>📝 About this app</h2>
      <p>
        Master Shopping List helps plan and organize shopping more efficiently.
        You can create reusable lists, group items by category, and check them
        off as you shop. Each list stays saved locally on your device.
      </p>
      <p>
        No login or account is required — all data is stored in your browser and
        never shared online.
      </p>
      <p>
        The project was built with React, Vite, and React Router. It uses
        localStorage to save data and runs entirely in your browser.
      </p>
      <a href="/">Back</a>
    </section>
  );
}
