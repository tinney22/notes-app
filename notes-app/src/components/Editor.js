import React from "react"
import { VscCircleFilled } from "react-icons/vsc"
import { FaRegFolderOpen } from "react-icons/fa"
import { BiTrash } from "react-icons/bi"
import { HiPlus } from "react-icons/hi"

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

export default function Editor(props) {
    const [editorActive, setEditorActive] = React.useState(false)
    const [activeStorageName, setActiveStorageName] = React.useState("")
    const [fileSystemOpen, setFileSystemOpen] = React.useState(false)

    const [refreshE, setRefreshE] = React.useState(false)

    React.useEffect(() => {
        if(props.activeEditorNum === props.id) {
            setEditorActive(true)
        } else {
            setEditorActive(false)
        }
        console.log(editorActive + " " + props.id)
    }, [props.activeEditorNum])

    function titleChange(event) {
        const { innerHTML } = event.target
        window.localStorage.removeItem(activeStorageName)
        props.updateFileSystem(innerHTML, document.getElementById('editor').innerHTML)
        setActiveStorageName(innerHTML)
    }

    function changeFileSystem() {
        setFileSystemOpen(prevState => !prevState)
    }

    async function openNote(noteName) {
        setFileSystemOpen(false)
        await delay(100)
        setActiveStorageName(noteName)
        document.getElementById('thisTitle').innerHTML = noteName
        document.getElementById('editor').innerHTML = window.localStorage.getItem(noteName)
    }

    function deleteNote(noteName) {
        window.localStorage.removeItem(noteName)
        setRefreshE(prevVal => !prevVal)
    }

    function addFileFromStorage() {
        window.localStorage.setItem()
    }

    const [prevContent, setPrevContent] = React.useState()

    const storedNoteNames = []
    for(let i = 0; i < window.localStorage.length; i++) {
        storedNoteNames.push(window.localStorage.key(i))
    }

    console.log(storedNoteNames)

    const storedNotes = storedNoteNames.map(storedNote => (
        <div className="flex relative border-b-2 border-gray-600 p-1 hover:bg-gray-400
        transition-colors duration-200">
            <h1 className="filePickerSize cursor-pointer" 
            onClick={() => openNote(storedNote)}>{storedNote}</h1>
            <BiTrash className="absolute mt-1 right-4 cursor-pointer
            hover:text-primary transition-colors duration-200" 
            onClick={() => deleteNote(storedNote)} size="20" />
        </div>
    ))

    return (
        <div style={{backgroundColor: `rgba(255,255,255,${props.editorSettings.opacity}`}} className={`note-height w-3/4 min-w-[25%] max-w-[75%] box-border border-2 border-opacity-0
          ${fileSystemOpen ? "overflow-auto" : ""} rounded-lg shadow-blurred ${props.classes} ${props.activeEditorNum === props.id ? "border-primary border-opacity-100" : "border-black"}`} onClick={() => props.setActiveEditor(props.id)}>
            <div className="flex items-center justify-self-stretch h-8 
            border-solid border-b-[3px] border-gray-500 relative">
                {!fileSystemOpen && <h2 id={editorActive ? "thisTitle" : ""} 
                className="ml-2 border-solid min-w-[8px] border-[rgba(107,114,128,0.35)]
                border-b-2 h-6 focus:outline-none font-bold truncate max-w-[90%]" 
                contentEditable="true" spellCheck="false" onInput={titleChange}>{props.title}</h2>}
                {fileSystemOpen && <h2 className="font-bold ml-2">Local Storage</h2>}
                <HiPlus onClick={changeFileSystem} className="absolute text-black cursor-pointer right-24" />
                <FaRegFolderOpen onClick={changeFileSystem} className="absolute text-black cursor-pointer right-[3.75rem]" />
                <VscCircleFilled onClick={() => props.removeEditor(props.id)} 
                className="absolute text-yellow-500 cursor-pointer right-5" size="24" />
                <VscCircleFilled onClick={() => props.removeEditor(props.id)} 
                className="absolute text-red-500 cursor-pointer right-0" size="24" />
            </div>
            {!fileSystemOpen && <div id={editorActive ? "editor" : ""} contentEditable="true" style={{color: props.modifiers.textColor.hex}} className={`editor-content-size overflow-auto focus:outline-none ml-1`}>
                {props.content}
            </div>}

            {fileSystemOpen && <div>
                {window.localStorage.length === 0 && <h1 className="ml-1">storage empty...</h1>}
                {storedNotes}
            </div>}
        </div>
    )
}

const QuoteBlock = () => (
    <div contentEditable="false" className="flex w-fit h-auto rounded-sm items-center opacity-70">
        <div className="w-1 min-h-[2rem] h-auto bg-gray-500 rounded-sm" />
        <h2 contentEditable="true" className="ml-1 focus:outline-none">This is a quote block element</h2>
    </div>
)

const Table = () => (
    <div className="grid">
    </div>
)