import { initialColors } from "./lib/colors";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/Color/ColorForm";
import ThemeForm from "./Components/ThemeForm";
import { uid } from "uid/single";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

function App() {
  const initialData = {
    role: "some color",
    hex: "#123456",
    contrastText: "#ffffff",
  };
  const [localStorageColors, setLocalStorageColors] = useLocalStorageState(
    "colors",
    {
      defaultValue: initialColors,
    }
  );
  const [localStorageThemes, setLocalStorageThemes] = useLocalStorageState(
    "themes",
    {
      defaultValue: initialThemes,
    }
  );
  const [themeID, setCurrentThemeId] = useState("t1");
  const theme = localStorageThemes.find((theme) => theme.id == themeID);
  const currentThemeColors = theme.colors.map((colorId) =>
    localStorageColors.find((color) => colorId == color.id)
  );
  // localStorage.clear();
  function onSelectTheme(themeName) {
    const filteredTheme = localStorageThemes.find((theme) => {
      return theme.name == themeName;
    });
    if (!filteredTheme) {
      setLocalStorageColors(initialColors);
      return;
    }
    setCurrentThemeId(filteredTheme.id);
  }
  function onSubmitColor(data) {
    setLocalStorageColors((prevState) => [
      { ...data, id: uid() },
      ...prevState,
    ]);
  }
  function handleDelete(id) {
    setLocalStorageColors(
      localStorageColors.filter((color) => {
        return color.id != id;
      })
    );
  }
  function handleEdit(data, id) {
    const newColors = localStorageColors.map((color) =>
      color.id === id
        ? {
            ...color,
            role: data.role,
            hex: data.hex,
            contrastText: data.contrast,
          }
        : color
    );
    setLocalStorageColors(newColors);
  }
  async function handleCopy(hex) {
    try {
      await navigator.clipboard.writeText(hex);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeForm themes={localStorageThemes} onSelectTheme={onSelectTheme} />
      <br />
      <ColorForm initialData={initialData} onSubmitColor={onSubmitColor} />
      <br />
      {currentThemeColors?.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleCopy={handleCopy}
          />
        );
      })}
      {localStorageColors?.length == 0 && <p>No colors</p>}
    </>
  );
}

export default App;
