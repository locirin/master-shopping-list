import { Link } from "react-router-dom";
import ChildrenSection from "../shared/ChildrenSection.jsx";
import Button from "../shared/Button.jsx";
import NewListForm from "../features/lists/NewListForm.jsx";

export default function Home({ appState, onCreateList, onToggleFavorite }) {
  const { lists, items } = appState;

  return (
    <ChildrenSection title="Master Shopping List">
      <p>Welcome. Create and manage shopping lists in one place.</p>
      <p>
        Lists: <strong>{lists.length}</strong> · Items:{" "}
        <strong>{items.length}</strong>
      </p>

      <Button onClick={() => alert("TODO: navigate to create list")}>
        Create New List
      </Button>

      <NewListForm onCreate={onCreateList} />

      {/* Empty state */}
      {lists.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>
          No lists yet. Add your first list above.
        </p>
      ) : (
        <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
          {lists.map((list) => (
            <li key={list.id} style={{ marginBottom: "0.5rem" }}>
              {/* Use Link to avoid full page reloads */}
              <Link to={`/list/${list.id}`} style={{ marginRight: "0.5rem" }}>
                {list.title} {list.isFavorite ? "★" : "☆"}
              </Link>
              <Button onClick={() => onToggleFavorite(list.id)}>
                {list.isFavorite ? "Unfavorite" : "Favorite"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </ChildrenSection>
  );
}
