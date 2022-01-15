import React, { useState } from "react"
// CONTEXT
import { MenuChange } from "./Context"
// STYLE
import "./style/global.css"
import MyCards from "./component/MyCards"

function App() {

  const [menuChange, setMenuChange] = useState(true)

  return (
    <div className="app-main-container" aria-label={`
      This is the main window and it does not do anything. 
      Please continue until you reach the 
      main features of this application
    `}>
      <MenuChange.Provider value={{ menuChange, setMenuChange }}>
        <MyCards/>
      </MenuChange.Provider>
    </div>
  );
}

export default App;