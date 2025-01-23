import React from 'react'
import { useState } from "react";
import ColorInput from './ColorInput';
export default function EditButton({ name, handleEdit, color, colorId }) {
    const [confirm, setConfirm] = useState(false)
    const styles = {
        form: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            gap: ".5rem"
        }
    }
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        handleEdit(data, colorId)
    }
    return (
        <>
            {confirm && <>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="role">Role</label>
                    <input type="text"
                        id="role"
                        name="role"
                        defaultValue={color.role} />
                    <label htmlFor="hex">Hex</label>
                    <ColorInput id="hex" defaultValue={color.hex} />
                    <label htmlFor="contrastText">Contrast Text</label>
                    <ColorInput id="contrastText" defaultValue={color.contrastText} />
                    <button>Update</button><button onClick={() => setConfirm(false)}>Cancel</button>
                </form>
            </>
            }

            {!confirm && <button onClick={() => setConfirm(true)}>{name}</button>}
        </>
    )
}
