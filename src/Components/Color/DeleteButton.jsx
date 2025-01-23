import React from 'react'
import { useState } from 'react'

export default function DeleteButton({ name, handleDelete, colorId }) {
    const [confirm, setConfirm] = useState(false)
    return (

        <>
            {confirm && <><span className='color-card-headline'>Really?</span><button onClick={() => handleDelete(colorId)}>Confirm</button><button onClick={() => setConfirm(false)}>Cancel</button></>}
            {!confirm && <button onClick={() => setConfirm(true)}>{name}</button>}
        </>
    )
}
// () => onClick(colorId)