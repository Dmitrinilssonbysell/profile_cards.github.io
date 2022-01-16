import React, { useState, lazy, Suspense } from "react"
// CONTEXT
import { MenuChange } from "./Context"
// STYLE
import "./style/global.css"
const MyCards = lazy(() => import("./component/MyCards2"))

function App() {

  const [menuChange, setMenuChange] = useState(true)

  return (
    <div className="app-main-container" aria-label={`
      This is the main window and it does not do anything. 
      Please continue until you reach the 
      main features of this application
    `}>
      <MenuChange.Provider value={{ menuChange, setMenuChange }}>
        <Suspense fallback={""}>
          <MyCards/>
        </Suspense>
      </MenuChange.Provider>
    </div>
  );
}

export default App;