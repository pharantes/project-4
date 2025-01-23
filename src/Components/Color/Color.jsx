import "./Color.css";
import DeleteButton from './DeleteButton'
import EditButton from "./EditButton";
import CopyButton from "./CopyButton";
import ContrastChecker from "./ContrastChecker";
export default function Color({ color, handleDelete, handleEdit, handleCopy }) {



  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <CopyButton name="Copy" handleCopy={handleCopy} color={color} colorHex={color.hex} />
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <ContrastChecker hex={color.hex} contrast={color.contrastText} />
      <br />
      <DeleteButton type="delete" name="Delete" handleDelete={handleDelete} colorId={color.id} />
      <EditButton type="edit" name="Edit" handleEdit={handleEdit} color={color} colorId={color.id} />
      {/* {console.log("Found issue 1")} */}
    </div >
  );
}
