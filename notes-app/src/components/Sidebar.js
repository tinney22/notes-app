import React from "react"
import BarIcon from "./BarIcon"

import { VscFile, VscSettingsGear, VscFolderOpened } from "react-icons/vsc"

export default function Sidebar(props) {

    const openEditorsDisplay = props.openEditors.map(editor => (
        <h1>12</h1>
    ))

    return (
        <nav>
            <nav className={`fixed bg-neutral-700 ${props.isHidden ? "w-0" : "w-1/12"} 
              h-screen transition-all duration-500 justify-center overflow-hidden`}>
                <h1 className="sidebar-text">New Note <BarIcon classes="ml-2" click={props.addFile} icon={<VscFile size="20"/>} /></h1>
                <h1 className="sidebar-text">Open Note <BarIcon classes="ml-1" click={props.addFile} icon={<VscFolderOpened size="20"/>} /></h1>
                {openEditorsDisplay}
                <h1 className="absolute bottom-16 sidebar-text">Settings <BarIcon classes="ml-2" click={props.openSettings} icon={<VscSettingsGear className="rotate-90 mt-[4px]" size="20"/>} /></h1>
            </nav>
        </nav>
    )
}