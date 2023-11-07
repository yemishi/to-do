import { Outlet } from "react-router-dom"
import React, { useContext, useState, createContext, useRef, useEffect } from "react"
import { useCycle } from "framer-motion";
import PageTransition from "./features/PageTransition";

const GlobalStateContext = createContext();

const date = new Date()
const d = date.getDay()

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function App() {

  const [chosenDay, setChosenDay] = useState(weekDay[d])
  const [task, setTask] = useState([])
  const [chosenTag, setChosenTag] = useState(0)
  const [drag, setDrag] = useState(0)
  const moreTimeSeparator = useRef([0, 0])

  const [showMobBar, setMobBar] = useState(false)
  const [bundleIcon, setBundleIcon] = useState(false)
  const [bundleColor, setBundleColor] = useState(false)

  const [transitionState, setTransitionState] = useState({ msg: "", status: 200, isTransition: false, route: false })

  const [iconBg, setIconBg] = useState(false)
  const [currentBox, setCurrentBox] = useState(0)
  const [alertShow, alertHandler] = useCycle(0, 1)
  const [dragAlertShow, dragAlertHandler] = useCycle(0, 1)

  const [formValues, setFormValues] = useState({
    name: '',
    hour: "00:00",
    duration: 15,
    weekDay: [],
    icon: "",
    bg: 'bg-cyan-300',
    demo: {
      bg: '',
      icon: "",
    },
    tags: [],
  })
  const tags = ['Leisure', 'Work', 'Study', 'Meal', 'Commute', 'Chores', 'Break']
  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission()
    }
    if (!localStorage.password || !localStorage.name) {
      setTransitionState({ msg: "please log in first", status: 401, route: "/login", isTransition: true })
    }

    if (localStorage.getItem("theme") === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", 'light')
    }
  }, [])

  return (

    <article className='text-white flex justify-center w-screen h-screen bg-gradient-to-b from-teal-700 dark:from-[#044068] dark:to-[#000000] to-transparent' >
      <ul className='px-8 filter-none sm:text-sm text-xs md:text-base lg:text-lg xl:text-xl sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-20 pt-8 w-full h-screen overflow-auto'>
        <GlobalStateContext.Provider value={{
          dragAlertShow, dragAlertHandler, alertShow, alertHandler, chosenTag, setChosenTag,
          moreTimeSeparator, currentBox, transitionState, setTransitionState, drag, setDrag, setCurrentBox, formValues, setFormValues,
          chosenDay, setChosenDay, showMobBar, setMobBar, iconBg, setIconBg, bundleIcon, setBundleIcon, bundleColor, setBundleColor, tags, task, setTask
        }}>
          <Outlet />
          {transitionState.isTransition ? <PageTransition onClick={() => console.log('aa')} props={{ msg: "siuuuuuu", route: false, status: 200 }} /> : null}

        </GlobalStateContext.Provider>

      </ul>

    </article >

  )
}


