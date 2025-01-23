import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/Color/ColorForm";
import { uid } from "uid/single";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

function App() {
  const initialData = { role: "some color", hex: "#123456", contrastText: "#ffffff" }
  const [colors, setColors] = useLocalStorageState('colors', {
    defaultValue: initialColors
  })

  function onSubmitColor(data) {
    setColors((prevState) => [...prevState, { ...data, id: uid() }])
  }
  function handleDelete(id) {
    setColors(colors.filter((color) => {
      return color.id != id
    }))
  }
  function handleEdit(data, id) {
    const newColors = colors.map((color) => color.id === id ? {
      ...color,
      role: data.role,
      hex: data.hex,
      contrastText: data.contrast,
    } : color)
    setColors(newColors)
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
      <ColorForm initialData={initialData} onSubmitColor={onSubmitColor} />
      {colors?.map((color) => {
        return <Color key={color.id} color={color} handleDelete={handleDelete} handleEdit={handleEdit} handleCopy={handleCopy} />;
      })}
      {colors?.length == 0 && <p>No colors</p>}
    </>
  );
}

export default App;
