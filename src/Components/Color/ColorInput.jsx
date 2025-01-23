import React, { useState } from 'react'

export default function ColorInput({ id, defaultValue }) {
    const styles = {
        inputWrap: {
            display: "flex",
            flexDirection: "row"
        }
    }
    const [inputValue, setInputValue] = useState(defaultValue);

    function handleInputValue(event) {
        setInputValue(event.target.value);
    }
    return (
        <div style={styles.inputWrap}>
            <input
                type="text"
                id={id}
                name={id}
                value={inputValue}
                onChange={handleInputValue}
            />
            <input type="color" value={inputValue} onChange={handleInputValue} />
        </div>
    )
}
