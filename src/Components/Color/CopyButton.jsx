import React from 'react'
import { useState } from 'react'

export default function CopyButton({ name, handleCopy, colorHex }) {
    const [message, showMessage] = useState(false)
    function handleClick() {
        handleCopy(colorHex)
        showMessage(true)
        setTimeout(() => {
            showMessage(false)
        }, 3000);
    }
    return (
        <>
            <button onClick={() => handleClick()}>{name}</button>
            {message && <span>Copied!</span>}
        </>
    )
}
