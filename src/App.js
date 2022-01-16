import React, { useState } from "react"
// CONTEXT
import { MenuChange } from "./Context"
// STYLE
import "./style/global.css"
// import MyCards from "./component/MyCards"
import MyCards2 from "./component/MyCards2"

function App() {

  const [menuChange, setMenuChange] = useState(true)

  return (
    <div className="app-main-container" aria-label={`
      This is the main window and it does not do anything. 
      Please continue until you reach the 
      main features of this application
    `}>
      <MenuChange.Provider value={{ menuChange, setMenuChange }}>
        <MyCards2/>
      </MenuChange.Provider>
    </div>
  );
}

export default App;