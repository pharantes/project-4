import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/Color/ColorForm";
import { useState } from "react";
import { uid } from "uid/single";

function App() {
  const initialData = { role: "some color", hex: "#123456", contrastText: "#ffffff" }
  const [colors, setColors] = useState(initialColors)
  function onSubmitColor(data) {
    setColors((prevValue) => [...prevValue, { ...data, id: uid() }])
  }
  function handleDelete(id) {
    setColors(colors.filter((color) => {
      return color.id != id
    }))
  }
  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm initialData={initialData} onSubmitColor={onSubmitColor} />
      {colors.map((color) => {
        return <Color key={color.id} color={color} onClick={handleDelete} />;
      })}
      {colors.length == 0 && <p>No colors</p>}
    </>
  );
}

export default App;
