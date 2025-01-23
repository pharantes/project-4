import React from 'react'
import ColorInput from './ColorInput'
export default function ColorForm({
    onSubmitColor,
    initialData
}) {

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
        onSubmitColor(data);
    }


    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="role">Role</label>
            <input type="text"
                id="role"
                name="role"
                defaultValue={initialData.role} />
            <label htmlFor="hex">Hex</label>
            <ColorInput id="hex" defaultValue={initialData.hex} />
            <label htmlFor="contrastText">Contrast Text</label>
            <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
            <button type="submit">Add Color</button>
        </form>
    )
}
