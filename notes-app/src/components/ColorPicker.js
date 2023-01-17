import React from "react"
import { nanoid } from "nanoid"

export default function ColorPicker(props) {
    const defaultColors = [
        "#ef4444", // red (500)
        "#f97316", // orange (500)
        "#facc15", // yellow (400)
        "#84cc16", // lime (500)
        "#16a34a", // green (600)
        "#06b6d4", // cyan (500)
        "#3b82f6", // blue (500)
        "#8b5cf6", // violet (500)
        "#f472b6", // pink (400)
        "#765341", // brown
        "#ffffff", // white
        "#d4d4d8", // light gray (gray (300))
        "#4b5563", // dark gray (gray (600))
        "#000000", // black
    ]

    const [colorElements, setColorElements] = React.useState(defaultColors.map(color => (
        <div className={`bg-[${color}] w-6 h-6 rounded-[0.25rem]`}></div>
    )))

    const [currentColor, setCurrentColor] = React.useState({
        currentHex: "#ffffff",
        currentRGB: "rgb(255, 255, 255)",
        typedHex: "",
        typedRGB: "rgb()"
    })

    function hexChange(event) {
        const { name, value } = event.target
        setCurrentColor(prevCurrentColor => {
            return {
                ...prevCurrentColor,
                [name]: value
            }
        })
        
        const splitHex = currentColor.typedHex.split('')
        if(splitHex[0] === "#") {
            const _shiftPound = splitHex.shift()
        }

        if(splitHex.match(/[0-9A-Fa-f]{6}/g)) {
            console.log("string is hex")
        } else {
            console.log("string is not hex")
        }
    }

    return (
        <div className="CENTER-POSITION w-48 h-64 bg-neutral-700 rounded-xl">
            <div className="flex h-1/3 bg-teal-400 rounded-t-xl">
                <h1 className="text-white text-xl font-bold m-auto self-center">#2dd4bf</h1>
            </div>
            <div>
                <div className="grid grid-cols-5 gap-4 m-2">
                    {colorElements}
                </div>
                <div className="flex">
                    <h2 className="text-white ml-2">Hex: </h2>
                    <input className="w-2/3 rounded-[0.25rem] m-auto" 
                      placeholder="#ffffff" value={currentColor.typedHex} 
                      onChange={hexChange} name="typedHex" />
                </div>
            </div>
        </div>
    )
}