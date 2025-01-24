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
  const theme = localStorageThemes?.find((theme) => theme.id == themeID);
  let currentThemeColors = theme.colors.map((colorId) =>
    localStorageColors.find((color) => colorId == color.id)
  );
  function onSelectTheme(themeName) {
    const filteredTheme = localStorageThemes.find((theme) => {
      return theme.name == themeName;
    });

    setCurrentThemeId(filteredTheme.id);
  }

  function onSubmitColor(data) {
    const colorId = uid();
    setLocalStorageColors([{ ...data, id: colorId }, ...localStorageColors]);
    setLocalStorageThemes(
      localStorageThemes.map((item) =>
        item.id === theme.id
          ? { ...item, colors: [colorId, ...item.colors] }
          : item
      )
    );
  }

  function handleDelete(colorId, themeId) {
    setCurrentThemeId(themeId);

    setLocalStorageThemes(
      localStorageThemes.filter((item) => {
        return item.colors.includes(colorId)
          ? (currentThemeColors = item.colors.splice(
              item.colors.indexOf(colorId),
              1
            ))
          : (currentThemeColors = item.colors);
      })
    );
    setLocalStorageColors(
      localStorageColors.filter((color) => {
        return color.id != colorId;
      })
    );
  }

  function handleEdit(data, colorId) {
    const newColors = localStorageColors.map((color) =>
      color.id === colorId
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
      <ThemeForm
        themes={localStorageThemes}
        onSelectTheme={onSelectTheme}
        // onSubmitTheme={onSubmitTheme}
        // handleThemeDelete={handleThemeDelete}
        // handleThemeEdit={handleThemeEdit}
      />
      <br />
      <ColorForm initialData={initialData} onSubmitColor={onSubmitColor} />
      <br />
      {currentThemeColors?.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            theme={theme}
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
