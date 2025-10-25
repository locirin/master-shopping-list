import { useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ListDetail from "./pages/ListDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import { loadState, saveState } from "./shared/storage.js";
import "./App.css";
import Header from "./shared/Header.jsx";
import Footer from "./shared/Footer.jsx";
import CreateList from "./pages/CreateList.jsx";
import About from "./pages/About.jsx";
import Notes from "./pages/Notes.jsx";
import CategoriesConfig from "./pages/CategoriesConfig.jsx";
import Button from "./shared/Button.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);

  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" || saved === "auto"
      ? saved
      : "auto";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const isDark = theme === "dark" || (theme === "auto" && mq.matches);
      if (isDark) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    };

    apply();
    localStorage.setItem("theme", theme);

    if (theme === "auto") {
      // live-update upon OS theme changes
      const handler = (e) => {
        const isDark = e.matches; // dark when system switched to dark
        if (isDark) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
      };
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
  }, [theme]);

  const getAppliedTheme = () => {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return theme === "auto" ? (systemDark ? "dark" : "light") : theme;
  };

  const cycleTheme = () =>
    setTheme((prev) =>
      prev === "auto" ? "dark" : prev === "dark" ? "light" : "auto",
    );

  const [appState, setAppState] = useState({
    lists: [],
    items: [],
    categories: [],
  });

  useEffect(() => {
    const data = loadState();
    setAppState({
      lists: data?.lists || [],
      items: (data?.items || []).map((it) => ({
        ...it,
        categoryId: it.categoryId ?? undefined,
      })),
      categories: (data?.categories || []).map((c) => ({
        id: c.id,
        name: c.name,
        collapsed: Boolean(c.collapsed),
        createdAt: c.createdAt || new Date().toISOString(),
        showInDropdown: c.showInDropdown ?? true,
      })),
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveState(appState);
    }
  }, [appState, loading]);

  const addList = useCallback((title) => {
    const newList = {
      id: `l_${Date.now()}`,
      title,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    setAppState((prev) => ({ ...prev, lists: [newList, ...prev.lists] }));
  }, []);

  function deleteList(listId) {
    setAppState((prev) => ({
      ...prev,
      lists: prev.lists.filter((l) => l.id !== listId),
      items: prev.items.filter((it) => it.listId !== listId),
    }));
  }
  function editList(listId, newTitle) {
    setAppState((prev) => ({
      ...prev,
      lists: prev.lists.map((l) =>
        l.id === listId ? { ...l, title: newTitle } : l,
      ),
    }));
  }

  function addCategory(name) {
    const trimmed = String(name || "").trim();
    if (!trimmed) return;
    const newCategory = {
      id: `c_${Date.now()}`,
      name: trimmed,
      collapsed: false,
      createdAt: new Date().toISOString(),
    };
    setAppState((prev) => ({
      ...prev,
      categories: [newCategory, ...prev.categories],
    }));
  }

  function toggleCategoryCollapse(categoryId) {
    setAppState((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === categoryId ? { ...c, collapsed: !c.collapsed } : c,
      ),
    }));
  }

  function addItem(listId, item) {
    const newItem = {
      id: `i_${Date.now()}`,
      listId,
      name: item.name,
      quantity: item.quantity,
      categoryId: item.categoryId ?? undefined,
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

  function editItem(itemId, updates) {
    setAppState((prev) => ({
      ...prev,
      items: prev.items.map((it) =>
        it.id === itemId ? { ...it, ...updates } : it,
      ),
    }));
  }

  function deleteItem(itemId) {
    setAppState((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== itemId),
    }));
  }

  function deleteCategories(ids) {
    setAppState((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => !ids.includes(c.id)),
      items: prev.items.map((it) =>
        it.categoryId && ids.includes(it.categoryId)
          ? { ...it, categoryId: undefined }
          : it,
      ),
    }));
  }

  function toggleShowInDropdown(ids) {
    setAppState((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        ids.includes(c.id) ? { ...c, showInDropdown: !c.showInDropdown } : c,
      ),
    }));
  }

  function editCategory(categoryId, newName) {
    const t = String(newName || "").trim();
    if (!t) return;
    setAppState((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === categoryId ? { ...c, name: t } : c,
      ),
    }));
  }

  return (
    <>
      <Header
        theme={theme}
        appliedTheme={getAppliedTheme()}
        onCycleTheme={cycleTheme}
      />

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
                onDeleteList={deleteList}
                onEditList={editList}
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
                onDeleteItem={deleteItem}
                onEditItem={editItem}
                onToggleCategory={toggleCategoryCollapse}
              />
            }
          />

          <Route
            path="/create"
            element={<CreateList onCreateList={addList} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />

          <Route
            path="/categories"
            element={
              <CategoriesConfig
                appState={appState}
                onAddCategory={addCategory}
                onDeleteCategories={deleteCategories}
                onToggleShowInDropdown={toggleShowInDropdown}
                onEditCategory={editCategory}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
