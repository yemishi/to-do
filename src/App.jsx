import { Outlet } from "react-router-dom"
import { useContext, useState, createContext, useRef, Suspense, useEffect } from "react"
import { useCycle } from "framer-motion";
const GlobalStateContext = createContext();
import { randomIcon } from "./features/configIcon";
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
  const [bundleIcon, setBundleIcon] = useState(false)
  const [bundleColor, setBundleColor] = useState(false)
  const [iconBg, setIconBg] = useState(false)
  const [currentBox, setCurrentBox] = useState(0)
  const [alertShow, alertHandler] = useCycle(0, 1)
  const [dragAlertShow, dragAlertHandler] = useCycle(0, 1)
  const [formConfig, setFormConfig] = useState({
    name: 'Study',
    hour: 0,
    duration: 15,
    weekDay: [],
    icon: randomIcon,
    bg: 'bg-emerald-400',
    demo: {
      bg: 'bg-emerald-400',
      icon: randomIcon,
    },
    tag: [],
  })
  const tags = ['Leisure', 'Work', 'Study', 'Meal', 'Commute', 'Chores', 'Break']
  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission()
    }
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      localStorage.theme == 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme == 'light'
    }
  }, [])

  return (

    <article className='text-white flex justify-center w-screen h-screen bg-gradient-to-b from-teal-700 dark:from-[#044068] dark:to-[#000000] to-transparent' >
      <ul className='px-8 filter-none sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-20 pt-8 w-full h-screen overflow-auto'>
        <GlobalStateContext.Provider value={{
          dragAlertShow, dragAlertHandler, alertShow, alertHandler, chosenTag, setChosenTag,
          moreTimeSeparator, currentBox, drag, setDrag, setCurrentBox, formConfig, setFormConfig, chosenDay, setChosenDay,
          showMobBar, setMobBar, iconBg, setIconBg, bundleIcon, setBundleIcon, bundleColor, setBundleColor, tags
        }}>

          <Outlet />

        </GlobalStateContext.Provider>

      </ul>

    </article >

  )
}


