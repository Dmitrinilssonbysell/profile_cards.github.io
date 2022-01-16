import React, {
    useState,
    useEffect,
    useContext
} from 'react'
// CONTEXT
import { MenuChange } from "../Context"
// STYLE
import "../style/thumb.css"
// PARTS
import Search from "./Search"
// ICONS
import { AiOutlineMail } from "react-icons/ai"
import { BiPhoneCall } from "react-icons/bi"

export default function Thumb() {

    const { menuChange, setMenuChange } = useContext(MenuChange)
    
    const [userCardMapData, setUserCardMapData] = useState([{}])

    useEffect(() => {
        
        let data = []
        let rows = {}
        
        fetch(" https://randomuser.me/api/?results=50", {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        .then(response => {
            if (response.status === 200) {
                response.json().then(res => {
                    for (let e of res.results) {
                        data.push({
                            first_name: e.name.first,
                            location: e.location.city,
                            email: e.email,
                            phone: e.phone,
                            id: e.id.value,
                            picture_thumbnail_large: e.picture.large,
                            picture_thumbnail_small: e.picture.medium,
                            gender: e.gender,
                            age: e.dob.age
                        })
                    }
                    data.push(rows)
                    data.pop()
                    setUserCardMapData(data)
                })
            } else {
                let message = "Data was not found, please return later."
                data.push({
                    first_name: message,
                    location: message,
                    email: message,
                    phone: message,
                    id: message,
                    picture_thumbnail_large: message,
                    picture_thumbnail_small: message,
                    gender: message,
                    age: message
                })
                data.push(rows)
                data.pop()
                setUserCardMapData(data)
            }
        })
        return () => { setUserCardMapData([{}]) }
    }, [])

    const [sortList, setSortList] = useState(true)

    function sortUpdateListByDate(par1, par2) {
        return function(a,b) {
            if(a.first_name>b.first_name){return par1}
            else if(a.first_name<b.first_name){return par2}
            return 0
        }
    }

    const [searchValue, setSearchValue] = useState("")
    const [searchEmpty, setSearchEmpty] = useState(true)

    useEffect(() => {
        if (searchValue.length) { setSearchEmpty(false) } 
        else { setSearchEmpty(true) }
    }, [searchValue])

    return (
        <React.Fragment>
            <Search
                onClick_search_icon={() => {
                    if (sortList) setSortList(false)
                    else { setSortList(true) }
                }}
                onChange_input={(e) => {
                    let string = e.target.value
                    setSearchValue(string.charAt(0).toUpperCase() + string.slice(1))
                }}
                onClick_menu={() => {
                    if (!menuChange) { setMenuChange(true) }
                    else { setMenuChange(false) }
                }}/>
            <div aria-label={`Please continue`} className="thumb-display-main-container">
                {
                    userCardMapData.sort(
                        sortList ? sortUpdateListByDate(1,-1) : sortUpdateListByDate(-1,1)
                    ).filter(searchEmpty ? name => name.first_name : name => name.first_name >= searchValue).map((elem, index) => {
                        
                        let color
                        if (index % 5 === 0) { color = "rgba(167, 184, 168, 1)" }
                        else if (index % 2 === 0) { color = "rgba(231, 205, 171, 1)" }
                        else if (index % 1 === 0) { color = "rgba(225, 211, 199, 1)" }

                        let gender
                        let genderPic
                        if (elem.gender === "male") { gender = "His"; genderPic = "He" } 
                        else { gender = "Her"; genderPic = "She" }

                        return(
                            <React.Fragment key={`${elem.first_name}_${elem.phone}`}>
                                <div aria-label={`
                                    Profile card for ${elem.first_name}
                                `} style={{ background:color}} className="thumb-card">
                                    <div style={{background: color}} className="inner-top">
                                        <p aria-label={`This is, ${elem.first_name}`}>{ elem.first_name }</p>
                                        <div className="inner-box1"/>
                                        <div style={{background: color}} className="inner-box2"/>
                                    </div>
                                    <div aria-label={`
                                            This is a picture of ${elem.first_name}. And ${genderPic} is ${elem.age} years old
                                        `} 
                                        style={{
                                        background:`url(${elem.picture_thumbnail_large})`,
                                        backgroundRepeat:"no-repeat",
                                    }} id="thumbnail-photo-desktop"/>
                                    <div aria-label={`
                                        This is a picture of ${elem.first_name}. And ${genderPic} is ${elem.age} years old
                                        `}  
                                        style={{
                                        background:`url(${elem.picture_thumbnail_small})`,
                                        backgroundRepeat:"no-repeat",
                                    }} id="thumbnail-photo-mobile"/>
                                    <div aria-label={`Contact information for, ${elem.first_name}`} className="inner-bottom">
                                        <p aria-label={`${elem.first_name}, is located in ${elem.location}`}>{ elem.location }</p>
                                        <div aria-label={`
                                            Send email to ${elem.first_name}, or give a call
                                        `} className="contact-container">
                                            <AiOutlineMail aria-label={
                                                `Send email to, ${elem.first_name}.`
                                            } className="icon-contact"/>
                                            <BiPhoneCall aria-label={
                                                `Use the telephone to call ${elem.first_name}. ${gender} phone number is ${elem.phone}`
                                            } className="icon-contact"/>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}