import { Link, useParams } from "react-router-dom";
import ChildrenSection from "../shared/ChildrenSection.jsx";
import Button from "../shared/Button.jsx";
import NewItemForm from "../features/items/NewItemForm.jsx";

export default function ListDetail({ appState, onAddItem, onToggleNeeded }) {
  const { id } = useParams();

  const list = appState.lists.find((l) => l.id === id);
  if (!list) {
    return (
      <ChildrenSection title="List Not Found">
        <p>This list does not exist.</p>
        <Link to="/">Back to Home</Link>
      </ChildrenSection>
    );
  }

  const items = appState.items.filter((it) => it.listId === id);

  function handleCreateItem(data) {
    onAddItem(id, data);
  }

  return (
    <ChildrenSection title={list.title}>
      <p>
        <Link to="/">← Back</Link>
      </p>

      <NewItemForm onCreate={handleCreateItem} />

      {items.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>No items yet.</p>
      ) : (
        <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
          {items.map((it) => (
            <li key={it.id} style={{ marginBottom: "0.5rem" }}>
              <label>
                +{" "}
                <input
                  type="checkbox"
                  checked={!it.needed}
                  onChange={() => onToggleNeeded(it.id)}
                  style={{ marginRight: "0.5rem" }}
                />
                {/* show name, quantity, unit, and needed status */}
                {it.name}
                {it.quantity ? ` — ${it.quantity}` : ""}
                {it.unit ? ` ${it.unit}` : ""} {it.needed ? "" : "(in pantry)"}
              </label>
              {/* simple action button */}
              <Button
                onClick={() => onToggleNeeded(it.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                {it.needed ? "Mark in pantry" : "Mark needed"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </ChildrenSection>
  );
}
