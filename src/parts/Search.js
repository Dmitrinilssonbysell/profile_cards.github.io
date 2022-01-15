import React from 'react'
// STYLE
import "../style/global.css"
// ICONS
import { FaSearch } from "react-icons/fa"
import { HiOutlineViewGrid } from "react-icons/hi"
import { MdOutlineSwapVert } from "react-icons/md"

export default function Search( props ) {
    return (
        <React.Fragment>
            <div className="card-search-container">
                <MdOutlineSwapVert 
                    aria-label="This button will sort the cards by name"
                    onClick={props.onClick_search_icon} 
                    className="icon-filter-desktop"/>
                <div className="card-inner-container">
                    <FaSearch className="icon-search"/>
                    <input
                        aria-label="Use your keyboard to search for the right person"
                        onChange={props.onChange_input}
                        className="card-search"
                        type="name"/>
                </div>
                <div className="mobile-section">
                    <MdOutlineSwapVert
                        onClick={props.onClick_search_icon} 
                        className="icon-filter-mobile"/>
                    <HiOutlineViewGrid 
                        onClick={props.onClick_menu}
                        className="icon-thumb"/>
                </div>
            </div>
        </React.Fragment>
    )
}
