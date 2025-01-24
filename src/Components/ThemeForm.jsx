import { useState } from "react";

export default function ThemeForm({
  themes,
  onSelectTheme,
  onSubmitTheme,
  handleThemeDelete,
  handleThemeEdit,
}) {
  const styles = {
    marginRight: ".5rem",
  };
  const [themeName, setThemeName] = useState("Default Theme");
  function selectedTheme(themeName) {
    onSelectTheme(themeName);
    setThemeName(themeName);
  }
  function handleAdd() {
    onSubmitTheme();
  }
  function handleDelete() {
    handleThemeDelete();
  }
  function handleEdit() {
    handleThemeEdit();
  }
  return (
    <>
      <form>
        <select
          name="selectedTheme"
          id="selectedTheme"
          onChange={(e) => selectedTheme(e.target.value)}
        >
          {themes.map((theme) => {
            return (
              <option key={theme.id} value={theme.name}>
                {theme.name}
              </option>
            );
          })}
        </select>
      </form>
      <br />
      <button style={styles} onClick={handleAdd}>
        Add
      </button>
      <button
        style={styles}
        disabled={themeName == "Default Theme" ? true : false}
        onClick={handleDelete}
      >
        Edit
      </button>
      <button
        disabled={themeName == "Default Theme" ? true : false}
        onClick={handleEdit}
      >
        Delete
      </button>
      <br />
    </>
  );
}
