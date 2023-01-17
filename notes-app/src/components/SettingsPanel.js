import React from "react"

export default function SettingsPanel(props) {
    const bgPrevElements = []
    for(let i = 0; i < 10; i++) {
        bgPrevElements.push(<nav onClick={() => props.setBackground(i)} className={`bg-preview bg-bg${i}-sm`}></nav>)
    }

    function handleChange(event) {
        const {checked} = event.target
        console.log(checked)
    }

    function rangeChange(event) {
        props.editorSettingsChange(event.target.name, event.target.value / 100)
    }

    return (
        <div className="SETTINGS-PANEL CENTER-POSITION">
            <nav className="absolute h-[7.5%] w-[100%] border-solid border-b-[3px] 
              border-gray-500 flex justify-start items-center pl-4">
                <h1>Settings</h1>
            </nav>
            <nav className="absolute h-[92.5%] w-[12.5%] top-[7.5%] border-solid 
              border-r-[3px] border-gray-500">
                <a href="#background-settings" className="settings-sidebar-header">Backround</a>
                <a href="#editor-settings" className="settings-sidebar-header">Editor</a>
            </nav>
            <div className="absolute w-[87.5%] h-[92.5%] bottom-0 right-0 overflow-hidden scroll-smooth">
                <div id="background-settings" className="w-full h-full">
                    <h1 className="text-black text-2xl pt-4 m-auto">Background</h1>
                    <div className="BACKGROUND-LOADER bg-bg0-sm bg-bg1-sm bg-bg2-sm bg-bg3-sm bg-bg4-sm bg-bg5-sm bg-bg6-sm bg-bg7-sm bg-bg8-sm bg-bg9-sm hidden"></div>
                    <div className="grid grid-cols-3 gap-y-4 pt-4 justify-items-center">
                        {bgPrevElements}
                    </div>
                </div>
                <div id="editor-settings" className="w-full h-full">
                    <h1 className="text-black text-2xl pt-4 m-auto">Editor</h1>
                    <div className="flex m-4">
                        {/* <ToggleSlider handleChange={handleChange} label="test" /> */}
                        <RangeSlider rangeChange={rangeChange} inputName="opacity" rangeVal={props.editorSettings.opacity} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ToggleSlider = (props) => (
    <label className={`switch ${props.classes}`}>
        <input type="checkbox" name={props.inputName} onChange={props.handleChange} />
        <span className="slider round"></span>
        <h2 className="absolute -top-[5px] left-10">{props.label}</h2>
    </label>
)

const RangeSlider = (props) => (
    <div className="relative h-12 w-[129px] flex">
        <input type="range" min="0" max="100" defaultValue={Math.round(props.rangeVal * 100)}
          draggable="false" name={props.inputName} onChange={props.rangeChange} />
        <h2 className="justify-self-center">{Math.round(props.rangeVal * 100)}</h2>
    </div>
)