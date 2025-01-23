import "./Color.css";
import DeleteButton from './DeleteButton'
export default function Color({ color, onClick }) {
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
      <DeleteButton type="delete" name="Delete" onClick={onClick} colorId={color.id} />
      {/* {console.log("Found issue 1")} */}
    </div>
  );
}
