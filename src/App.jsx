import { Outlet } from "react-router-dom"
import { useContext, useState, createContext, useRef, Suspense } from "react"
import { useCycle } from "framer-motion";
import defaultIcon from './assets/imgs/icons/lifestyle/lifestyle15.svg'
const GlobalStateContext = createContext();

const date = new Date()
const d = date.getDay()

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
export const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export default function App() {


  const [chosenDay, setChosenDay] = useState(weekDay[d])
  const [showMobBar, setMobBar] = useState(false)
  const [chosenTag, setChosenTag] = useState(0)
  const [drag, setDrag] = useState(0)
  const moreTimeSeparator = useRef([0, 0])
  const [currentBox, setCurrentBox] = useState(0)
  const [alertShow, alertHandler] = useCycle(0, 1)
  const [dragAlertShow, dragAlertHandler] = useCycle(0, 1)
  const [formConfig, setFormConfig] = useState({
    name: 'Study',
    hour: 0,
    duration: 15,
    weekDay: [],
    icon: defaultIcon,
    bg: 'bg-amber-500',
    demo: {
      bg: 'bg-amber-500',
      icon: defaultIcon,
    },
    tag: [],
  })
  return (

    <article className='text-white  w-screen h-screen bg-gradient-to-b from-teal-700 to-transparent' >
      <ul className=' px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-20  pt-8 w-full h-screen overflow-auto'>
        <GlobalStateContext.Provider value={{
          dragAlertShow, dragAlertHandler, alertShow, alertHandler, chosenTag, setChosenTag,
          moreTimeSeparator, currentBox, drag, setDrag, setCurrentBox, formConfig, setFormConfig, chosenDay, setChosenDay,
          showMobBar, setMobBar
        }}>

          <Outlet />

        </GlobalStateContext.Provider>

      </ul>

    </article >

  )
}


