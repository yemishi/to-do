import { useState, useEffect } from "react"
import { configIcon, selectedIcon } from "../freatures/configIcon"
import { useGlobalState } from "../App"
import { moreTime } from "../freatures/store"
import { submitTask } from '../freatures/useAxios'
import { Link } from "react-router-dom"
import { selectHour, selectDuration } from "../freatures/store"
import { motion } from 'framer-motion'
import checked from '../assets/imgs/checked.svg'
import Button from "../freatures/Button"
import cancel from '../assets/imgs/cancel.svg'
import { tagConfig } from "../freatures/store"

export default function AddTask() {

  const [handlerCheck, setHandlerCheck] = useState(false)
  const { formConfig, setFormConfig, setLight } = useGlobalState()

  useEffect(() => {

    setFormConfig({
      ...formConfig,
      duration: 15,
      name: 'Study',
      hour: '00:00',
      weekDay: [],
      tag: [],
    })
    setLight(0)
    const hourDefault = document.querySelector('.myB')
    hourDefault.classList.add('bg-teal-500')

  }, [])

  const pushDay = (e, i, array) => {
    console.log(formConfig.weekDay)
    e.target.checked = !e.target.checked

    e.target.checked ? e.target.classList.add('bg-teal-900') : e.target.classList.remove('bg-teal-900')
    if (e.target.checked && !array.includes(i)) {
      array.push(i)
    } if (!e.target.checked && array.includes(i)) {
      array.forEach((index, indice) => {
        if (index == i) {
          array.splice(indice, 1)
        }
      });

    }
    if (formConfig.weekDay.length == 0) {
      setHandlerCheck(false)
    } else setHandlerCheck(true)
  }
  const checkVariant = {
    saveBottom: { show: { x: -144, y: 0, opacity: 1 }, close: { x: -144, y: 90, opacity: 0 } },
    saveTop: { show: { x: 0, opacity: 1 }, close: { x: -90, opacity: 0 } }
  }
  const convertMin = (event) => {
    let minToHour = 0
    while (event >= 60) event -= 60, minToHour++
    return `${minToHour} ${minToHour > 1 ? 'HOURS' : 'HOUR'}`
  }
  const myForm = <form className=" mb-24  w-full rounded-md">

    <fieldset className="flex flex-col justify-between relative">
      <header className="w-full flex mb-8 justify-between items-center" >
        <Link to='/'>

          <motion.button
            transition={{ type: "spring", damping: 10, stiffness: 200 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            animate={handlerCheck ? 'show' : 'close'}
            variants={checkVariant.saveTop}
            className="bg-teal-600 w-11 h-11 flex justify-center items-center rounded-lg"
            onClick={() => submitTask({ ...formConfig })}>
            <img src={checked} className="w-6 h-5" alt="confirm" />
          </motion.button>
        </Link>
        <span className="font-bold">
          <h1>New Event</h1>
          <p className="text-center font-slab text-gray-200 text-lg">
            {`${formConfig.duration >= 60 ? convertMin(formConfig.duration) : `${formConfig.duration} MINUTES`} `}</p>
        </span>

        <Link to='/'>
          <Button props={{ icon: [cancel, 'cancel'] }} />
        </Link >
      </header>
      <input onChange={(e) => { setFormConfig({ ...formConfig, name: e.target.value }), console.log(formConfig) }}
        type="text" placeholder={formConfig.name ? formConfig.name : 'Event name...'}
        className="p-4 rounded-md mt-8 mb-10 text-gray-700 font-bold text-xl text-center outline-none w-6/12 self-center md:p-5"
      />
      {selectedIcon()}
      <h3>Repeat</h3>
      <p onClick={() => console.log({ ...formConfig })}>AAAAAA</p>
      <div className="w-full flex mb-8 justify-between">
        <input className="inputCheck" type="button" onClick={(e) => pushDay(e, 0, formConfig.weekDay)} value='SUN' />
        <input className="inputCheck" type="button" onClick={(e) => pushDay(e, 1, formConfig.weekDay)} value='MON' />
        <input className="inputCheck" type="button" onClick={(e) => pushDay(e, 2, formConfig.weekDay)} value='TUE' />
        <input className="inputCheck" type="button" onClick={(e) => pushDay(e, 3, formConfig.weekDay)} value='WED' />
        <input className="inputCheck" type="button" onClick={(e) => pushDay(e, 4, formConfig.weekDay)} value='THU' />
        <input className="inputCheck" type="button" onClick={(e) => pushDay(e, 5, formConfig.weekDay)} value='FRI' />
        <input className="inputCheck" type="button" onClick={(e) => pushDay(e, 6, formConfig.weekDay)} value='SAT' />
      </div>

      <span className="flex justify-between items-center ">
        <h3 className="">Duration</h3>
        {moreTime()}
      </span>
      {selectDuration()}

      <h3 className="w-11/12 self-center">When</h3>

      <div className=" flex divide-y flex-col p-2 h-96 overflow-auto w-11/12 self-center gap-y-1 bg-teal-600 rounded-lg md:h-135 ">
        {selectHour()}
      </div>

    </fieldset >
    <h3>Modify icon</h3>
    {configIcon()}
    {tagConfig()}

    <Link to='/'><motion.button
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        duration: 1

      }}
      onAnimationStart={() => document.querySelector('.save').classList.remove('duration-500')}
      animate={handlerCheck ? 'show' : 'close'}
      variants={checkVariant.saveBottom}
      onClick={() => submitTask({ ...formConfig })}
      className={`absolute save bottom-8 font-extrabold ${formConfig.bg} duration-500
      text-xl font-title rounded-xl w-72 h-14 left-2/4 -translate-x-2/4`} >save</motion.button>
    </Link>
  </form >

  return (

    <div className="flex justify-end ">
      {myForm}
    </div>
  )
}