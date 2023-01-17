import React from "react"
import BarIcon from "./BarIcon"
import Tippy, { tippy } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { BlockPicker } from "react-color"

import { VscMenu } from "react-icons/vsc"

import { TbSubscript, TbSuperscript } from "react-icons/tb"
import { BiBold, BiItalic, BiUnderline, BiStrikethrough, BiNote, BiImageAdd, 
  BiColorFill, BiFontColor, BiListOl, BiListUl, BiTable, BiLinkAlt, BiAlignJustify, 
  BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi"
import { RiDoubleQuotesR } from "react-icons/ri"
import { HiCode } from "react-icons/hi"
import { BsBorder, BsBorderBottom, BsBorderLeft, BsBorderRight, BsBorderTop, 
    BsBorderOuter, BsBorderStyle, BsBorderWidth } from "react-icons/bs"
import { MdOutlineBorderColor } from "react-icons/md"
import { RxBorderDashed,RxBorderDotted, RxBorderSolid } from "react-icons/rx"

// bold, italic, underline, strikethrough
// subscript, superscript
// add images, quote blocks, code blocks, tables, links
// text color, highlight color
// lists
// text alignment

const textModifierSize = 28

export default function Navbar(props) {
    function highlightModifier(event) {
        const { name, value } = event.target
        console.log(name)
        props.setModifiers(prevModifiers => {
            return {
                ...prevModifiers,
                [name]: !props.modifier[name]
            }
        })
    }

    function uploadImg() {
        document.getElementById('selectFile').click()
    }

    function executeModifier(name) {
        // props.setModifiers(prevModifiers => {
        //     return {
        //         ...prevModifiers,
        //         [name]: !props.modifiers[name]
        //     }
        // })

        if(name === "strikethrough") {
            name = "strikeThrough"
        }

        document.execCommand(name)
    }

    function onImageChange(event) {
        const img = document.createElement('img')
        const imgSrc = document.createAttribute('src')
        const editable = document.createAttribute('contenteditable')
        
        const imgTippyContent = document.getElementById('imgTippyContent')
        tippy(img, {
            content: imgTippyContent.innerHTML,
            placement: 'bottom-start',
            arrow: false,
            offset: [0, 1],
            hideOnClick: true,
            trigger: 'click',
            interactive: true,
            allowHTML: true,
            onShown() {
                const tippyId = document.querySelector('.tippy-box').parentElement.id
                document.getElementById(tippyId).contentEditable = false
            }
        })
        
        imgSrc.value = URL.createObjectURL(event.target.files[0])
        editable.value = false

        img.classList.add('editor-img')
        img.setAttributeNode(imgSrc)
        img.setAttributeNode(editable)

        document.getElementById('editor').appendChild(img)
    }

    return (
        <nav className="flex flex-row items-center w-screen bg-neutral-700">
            <h1 className={`text-white flex w-[9.1%] h-12 justify-center items-center text-sm 
              font-semibold ${props.sidebarHidden ? "bg-neutral-700" : "bg-[#333333]"} 
              transition-colors duration-500`}>
              Notes App <BiNote className="ml-[4px]" size="16" /></h1>
            <div className="flex px-4 justify-between w-screen gap-4">
                <div><NavbarIcon click={props.changeSidebarState} icon={<VscMenu className="mt-[4px]" size="32"/>}/></div>
                <div className="flex gap-8 items-center">
                    <div className="flex">
                        <Tippy content={<h2>Bold (ctrl + b)</h2>}>
                            <NavbarIcon click={() => executeModifier("bold")} icon={<BiBold className={props.modifiers.bold ?  "text-primarySelected" : ""} size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Italic (ctrl + i)</h2>}>
                            <NavbarIcon click={() => executeModifier("italic")} icon={<BiItalic size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Underline (ctrl + u)</h2>}>
                            <NavbarIcon click={() => executeModifier("underline")} icon={<BiUnderline size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Strikethrough (ctrl + 5)</h2>}>
                            <NavbarIcon click={() => executeModifier("strikethrough")} icon={<BiStrikethrough className={props.modifiers.strikethrough ?  "text-primarySelected" : ""} size={textModifierSize} />} />
                        </Tippy>
                    </div>
                    <div className="flex">
                        <Tippy content={<h2>Superscript (ctrl + .)</h2>}>
                            <NavbarIcon click={() => executeModifier("superscript")} icon={<TbSuperscript size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Subscript (ctrl + ,)</h2>}>
                            <NavbarIcon click={() => executeModifier("subscript")} icon={<TbSubscript size={textModifierSize} />} />
                        </Tippy>
                    </div>
                    <div className="flex">
                        <input id="selectFile"className="hidden" type="file" onChange={onImageChange}></input>
                        <Tippy content={<h2>Add Image</h2>}>
                            <NavbarIcon click={uploadImg} icon={<BiImageAdd size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Quote Block</h2>}>
                            <NavbarIcon icon={<RiDoubleQuotesR size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Code Block</h2>}>
                            <NavbarIcon icon={<HiCode size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Add Table</h2>}>
                            <NavbarIcon icon={<BiTable size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Add Link</h2>}>
                            <NavbarIcon icon={<BiLinkAlt size={textModifierSize} />} />
                        </Tippy>
                    </div>
                    <div className="flex mt-1">
                        <Tippy interactive={true} placement='bottom' theme='invis-bg' content={
                          <BlockPicker color={props.modifiers.textColor}  
                          onChangeComplete={(color) => props.setModifiers(prevModifiers => ({
                            ...prevModifiers, textColor: color}))} />}>
                            <TextIcon classes={`text-[${props.modifiers.textColor.hex}]`} />
                        </Tippy>
                        <Tippy interactive={true} placement='bottom' theme='invis-bg' content={
                          <BlockPicker color={props.modifiers.fillColor}
                          onChangeComplete={(color) => props.setModifiers(prevModifiers => ({
                            ...prevModifiers, fillColor: color}))}/>}>
                            <FillIcon classes={`text-[${props.fillColor}]`} />
                        </Tippy>
                    </div>
                    <div className="flex">
                        <Tippy content={<h2>Ordered List</h2>}>
                            <NavbarIcon icon={<BiListOl size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Unordered List</h2>}>
                            <NavbarIcon icon={<BiListUl size={textModifierSize} />} />
                        </Tippy>
                    </div>
                    <div className="flex">
                        <Tippy content={<h2>Align Text Left</h2>}>
                            <NavbarIcon icon={<BiAlignLeft size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Align Text Center</h2>}>
                            <NavbarIcon icon={<BiAlignMiddle size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Align Text Right</h2>}>
                            <NavbarIcon icon={<BiAlignRight size={textModifierSize} />} />
                        </Tippy>
                        <Tippy content={<h2>Justify Text</h2>}>
                            <NavbarIcon icon={<BiAlignJustify size={textModifierSize} />} />
                        </Tippy>
                    </div>
                    <div className="flex">
                        <Tippy interactive={true} content={<BorderTip />}>
                            <NavbarIcon icon={<BsBorder size={textModifierSize} />} />
                        </Tippy>
                    </div>
                </div>
                <div className="w-8 h-8"></div>
            </div>


            <div id='imgTippyContent' className="hidden">
                <div className="flex justify-center items-center">
                    <NavbarIcon icon={<BsBorder size={textModifierSize} />} />
                </div>
            </div>
        </nav>
    )
}

// TIPPY

const BorderTip = (props) => {
    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-3 gap-3">
                <NavbarIcon icon={<BsBorder size={textModifierSize} />} />
                <NavbarIcon icon={<BsBorderLeft size={textModifierSize} />} />
                <NavbarIcon icon={<BsBorderTop size={textModifierSize} />} />
                <NavbarIcon icon={<BsBorderRight size={textModifierSize} />} />
                <NavbarIcon icon={<BsBorderBottom size={textModifierSize} />} />
                <NavbarIcon icon={<BsBorderOuter size={textModifierSize} />} />
            </div>
            <div className="flex gap-3">
                <Tippy placement='bottom' content="Border Style">
                    <NavbarIcon icon={<BsBorderStyle size={textModifierSize} />} />
                </Tippy>
                <NavbarIcon icon={<BsBorderWidth size={textModifierSize} />} />
                <NavbarIcon icon={<MdOutlineBorderColor size={textModifierSize} />} />
            </div>
        </div>
    )
}

// ICONS

const NavbarIcon = React.forwardRef((props, ref) => {
    return (
        <button ref={ref} onClick={props.click} className={`navbar-icon ${props.classes}`}>
            {props.icon}
        </button>
    )
})

const TextIcon = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <BarIcon icon={<BiFontColor className={props.classes} size={textModifierSize} />} />
        </div>
    )
})

const FillIcon = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <BarIcon icon={<BiColorFill className={props.classes} size={textModifierSize} />} />    
        </div>
    )
})