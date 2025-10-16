import { useEffect, useState, useCallback } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ListDetail from "./pages/ListDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import { loadState, saveState } from "./shared/storage.js";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [appState, setAppState] = useState({ lists: [], items: [] });

  // load on mount
  useEffect(() => {
    const data = loadState();
    setAppState(data);
    setLoading(false);
  }, []);

  // persist whenever state changes (after initial load)
  useEffect(() => {
    if (!loading) {
      saveState(appState);
    }
  }, [appState, loading]);

  // handlers (useCallback)
  const addList = useCallback((title) => {
    const newList = {
      id: `l_${Date.now()}`,
      title,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    setAppState((prev) => ({ ...prev, lists: [newList, ...prev.lists] }));
  }, []);

  const toggleFavorite = useCallback((listId) => {
    setAppState((prev) => ({
      ...prev,
      lists: prev.lists.map((l) =>
        l.id === listId ? { ...l, isFavorite: !l.isFavorite } : l,
      ),
    }));
  }, []);

  function addItem(listId, item) {
    const newItem = {
      id: `i_${Date.now()}`,
      listId,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      needed: true,
      notes: "",
      createdAt: new Date().toISOString(),
    };
    setAppState((prev) => ({ ...prev, items: [newItem, ...prev.items] }));
  }

  function toggleItemNeeded(itemId) {
    setAppState((prev) => ({
      ...prev,
      items: prev.items.map((it) =>
        it.id === itemId ? { ...it, needed: !it.needed } : it,
      ),
    }));
  }

  if (loading) {
    return <p style={{ padding: "1rem" }}>Loading…</p>;
  }

  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}
        >
          Home
        </NavLink>
        <NavLink
          to="/list/123"
          style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}
        >
          Sample List
        </NavLink>
      </nav>

      <main
        data-lists={appState.lists.length}
        data-items={appState.items.length}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                appState={appState}
                onCreateList={addList}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/list/:id"
            element={
              <ListDetail
                appState={appState}
                onAddItem={addItem}
                onToggleNeeded={toggleItemNeeded}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
