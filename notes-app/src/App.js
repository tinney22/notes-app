import React from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import SettingsPanel from "./components/SettingsPanel"

import { nanoid } from 'nanoid'

export default function App() {
  const storageKey = 'NOTE_STORAGE'

  const [sidebarHidden, setSidebarHidden] = React.useState(false)
  const [activeEditorNum, setActiveEditorNum] = React.useState()
  
  const [notes, setNotes] = React.useState([])
  const [editors, setEditors] = React.useState([])

  const [openEditors, setOpenEditors] = React.useState([])

  const [settingsActive, setSettingsActive] = React.useState(false)

  const [editorSettings, setEditorSettings] = React.useState({
    opacity: 1
  })

  const [modifiers, setModifiers] = React.useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    textColor: "#000",
    fillColor: "",
  })

  const [pickedColor, setPickedColor] = React.useState('#ffffff')

  function changeSidebarState() {setSidebarHidden(prevState => !prevState)}

  function setActiveEditor(id) {
    setActiveEditorNum(id)
  }

  // change background
  const [bgVal, setBgVal] = React.useState(0)
  function setBackground(bgNum) {
    setBgVal(bgNum)
  }

  function openSettings() {
    setSettingsActive(prevValue => !prevValue)
  }

  // navbar functions
  const [alertFullEditors, setAlertFullEditors] = React.useState(false)
  function closeMaxWindowAlert() {setAlertFullEditors(false)}
  function addFile() {
    if(editors.length < 3) {
      const newNote = {
        id: nanoid(),
        title: "Note Title",
        content: (<p>Note Content</p>)
      }

      setEditors(prevEditors => [...prevEditors, newNote])
    } else {
      setAlertFullEditors(true)
    }
  }

  function removeEditor(id) {
    const newArray = []
    for(let i = 0; i < editors.length; i++) {
      if(id === editors[i].id) {
        console.log(i)
      } else {
        newArray.push(editors[i])
      }
    }
    setEditors(newArray)
  }

  function minimizeEditor(id) {
    const editorName = ""
    for(let i = 0; i < editors.length; i++) {
      if(id === editors[id]) {
        // editorName = 
        console.log(editors[i])
      }
    }

    removeEditor(id)
  }

  function editorSettingsChange(setting, value) {
    setEditorSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }))
  }

  function updateFileSystem(name, editorContent) {
    for(let i = 0; i < window.localStorage.length; i++) {
      if(window.localStorage.key(i) === name) {
        console.log("same name")
      }
    }
    window.localStorage.setItem(name, editorContent)
  }

  function changeEditorName(editorName, id) {
    const editorNum = 3
    for(let i = 0; i < editors.length; i++) {
      if(id === editors[i]) {
        editorNum = i
      }
    }
    setEditors(prevEditors => [
      ...prevEditors
    ])
    console.log(editors[editorNum].title)
  }
  
  const editorElements = editors.map(note => (
    <Editor changeEditorName={changeEditorName} updateFileSystem={updateFileSystem} modifiers={modifiers} content={note.content} setActiveEditor={setActiveEditor} activeEditorNum={activeEditorNum}
      removeEditor={removeEditor} editorSettings={editorSettings} id={note.id} key={note.id} title={note.title} />
  ))

  return (
    <div className="">
      <Navbar modifiers={modifiers} setModifiers={setModifiers} textColor={modifiers.textColor.hex} fillColor={modifiers.fillColor.hex} sidebarHidden={sidebarHidden} changeSidebarState={changeSidebarState} />
      <Sidebar isHidden={sidebarHidden} openSettings={openSettings} addFile={addFile} openEditors={openEditors} />
      <div className="BACKGROUND-LOADER bg-bg0 bg-bg1 bg-bg2 bg-bg3 bg-bg4 bg-bg5 bg-bg6 bg-bg7 bg-bg8 bg-bg9 hidden"></div>
      <div className={`flex justify-end w-[100vw] bg-bg${bgVal} bg-no-repeat
        bg-center bg-cover -z-10 absolute transition-all duration-1000`}>
        <div className={`note-container-height flex p-[36px]
          ${sidebarHidden ? "w-screen" : "w-11/12"} h-screen transition-all 
          duration-500 justify-center gap-[36px]`}>
          {!settingsActive && editorElements}
        </div>
        <div>
          {(alertFullEditors && !settingsActive) && <div className="CENTER-POSITION ALERT-MIDDLE cursor-pointer" 
          onClick={closeMaxWindowAlert}>Maximum of 3 editor windows are allowed open at once</div>}
          {(editors.length < 1 && !settingsActive) && 
          <div className="CENTER-POSITION ALERT-MIDDLE">
            <h1 className="text-black text-lg w-[100%]">You have no notes opened</h1>
            <div className="flex justify-evenly">
              <button onClick={() => addFile()} className="no-note-button">Create Note</button>
              <button className="no-note-button">Open Note</button>
            </div>
          </div>}
          {settingsActive && <SettingsPanel editorSettingsChange={editorSettingsChange} editorSettings={editorSettings} setBackground={setBackground} />}
        </div>
      </div>
      {/* {(fillColorActive || textColorActive) && <BlockPicker className="absolute" color={pickedColor}
        id='colorPicker' onChangeComplete={(color) => setPickedColor(color)} />} */}
    </div>
  )
}