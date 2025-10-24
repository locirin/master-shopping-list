import { useNavigate } from "react-router-dom";
import ChildrenSection from "../shared/ChildrenSection.jsx";
import Button from "../shared/Button.jsx";
import { useState } from "react";

export default function Home({ appState, onDeleteList, onEditList }) {
  const { lists, items } = appState;
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  return (
    <ChildrenSection title="Master Shopping List">
      <p>Create and manage shopping lists in one place.</p>
      <p>
        Lists: <strong>{lists.length}</strong> · Items:{" "}
        <strong>{items.length}</strong>
      </p>

      <Button onClick={() => navigate("/create")}>Create New List</Button>

      {/* Empty state */}
      {lists.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>
          {/* No lists yet. Add your first list above. */}
          You don’t have any shopping lists yet.
        </p>
      ) : (
        <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
          {lists.map((list) => (
            <li
              key={list.id}
              style={{
                marginBottom: "0.5rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              {editingId === list.id ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ padding: "0.25rem", marginRight: "0.5rem" }}
                  />
                  <Button
                    onClick={() => {
                      if (newTitle.trim()) {
                        onEditList(list.id, newTitle.trim());
                        setEditingId(null);
                        setNewTitle("");
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    style={{ marginLeft: "0.5rem" }}
                    onClick={() => {
                      setEditingId(null);
                      setNewTitle("");
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="list-title">{list.title}</h3>

                  <p style={{ margin: "0.25rem 0" }}>
                    •{" "}
                    {
                      appState.items.filter((it) => it.listId === list.id)
                        .length
                    }{" "}
                    items
                  </p>
                  <Button onClick={() => navigate(`/list/${list.id}`)}>
                    View
                  </Button>
                  <Button
                    style={{ marginLeft: "0.5rem" }}
                    onClick={() => {
                      setEditingId(list.id);
                      setNewTitle(list.title);
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}

              <Button
                onClick={() => onDeleteList(list.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </ChildrenSection>
  );
}
