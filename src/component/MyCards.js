import React, { 
  lazy, 
  Suspense, 
  useContext,
  useEffect,
  useState
} from "react"
// CONTEXT
import { MenuChange } from "../Context"
const Thumb = lazy(() => import("../parts/Thumb.js"))
const List = lazy(() => import("../parts/List.js"))

export default function MyCards() {

  const { menuChange } = useContext(MenuChange)

  

  return (
    <React.Fragment>

      <p className="app-top-title">Meet the Team</p>    

      {
          menuChange ?
          <Suspense fallback={""}><Thumb/></Suspense>
          :
          <Suspense fallback={""}><List/></Suspense>
      }

    </React.Fragment>
  )
}