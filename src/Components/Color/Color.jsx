import "./Color.css";
import DeleteButton from './DeleteButton'
import EditButton from "./EditButton";
export default function Color({ color, handleDelete, handleEdit }) {
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <DeleteButton type="delete" name="Delete" handleDelete={handleDelete} colorId={color.id} />
      <EditButton type="edit" name="Edit" handleEdit={handleEdit} color={color} colorId={color.id} />
      {/* {console.log("Found issue 1")} */}
    </div>
  );
}
