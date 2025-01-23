import React from 'react'
import { useState, useEffect } from 'react'

export default function ContrastChecker({ hex, contrast }) {
    const [overallContrast, setContrast] = useState("")

    useEffect(() => {
        async function startFetching() {
            const response = await fetch(
                "https://www.aremycolorsaccessible.com/api/are-they",
                {
                    method: "POST",
                    mode: 'cors',
                    body: JSON.stringify({ colors: [hex, contrast] }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            let data = await response.json()
            setContrast(data.overall)
        }

        startFetching();
    }, []);

    return (
        <><span>Overall Contrast Score: {overallContrast}</span></>
    )

}
