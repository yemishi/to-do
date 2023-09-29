import { Outlet } from "react-router-dom"
import { useContext, useState, createContext, useRef } from "react"
import { useCycle } from "framer-motion";
import defaultIcon from './assets/imgs/icons/lifestyle/lifestyle15.svg'
const GlobalStateContext = createContext();

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
export default function App() {
  const [light, setLight] = useState(0)
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

    < article className='text-white  w-screen h-screen bg-gradient-to-b from-teal-700 to-transparent' >
      <ul className=' p-8 w-full h-screen overflow-auto'>
        <GlobalStateContext.Provider value={{ dragAlertShow, dragAlertHandler, alertShow, alertHandler, moreTimeSeparator, currentBox, light, setLight, setCurrentBox, formConfig, setFormConfig }}>
          <Outlet />
        </GlobalStateContext.Provider>

      </ul>

    </article >
  )
}


