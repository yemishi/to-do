import { useState, useEffect } from "react"
import { configIcon, selectedIcon } from "../freatures/configIcon"
import { useGlobalState, weekDay } from "../App"
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


  const { formConfig, setFormConfig, setDrag } = useGlobalState()

  useEffect(() => {
    const firstDrag = document.querySelector('.chooseDuration')
    setFormConfig({
      ...formConfig,
      duration: 15,
      name: '',
      hour: '00:00',
      weekDay: [],
      tag: [],
    })
    setDrag(firstDrag.offsetLeft)
    const hourDefault = document.querySelector('.myB')
    hourDefault.classList.add('bg-teal-500')

  }, [])

  const pushDay = () => {

    const toggleWeekDay = (index) => {

      if (formConfig.weekDay.includes(index)) {
        setFormConfig({
          ...formConfig,
          weekDay: formConfig.weekDay.filter((day) => day !== index),
        });
      } else {
        setFormConfig({
          ...formConfig,
          weekDay: [...formConfig.weekDay, index],
        });
      }
    };

    return weekDay.map((e, i) => {
      const firstThree = e.substring(0, 3).toUpperCase()
      return <input key={e} onClick={() => toggleWeekDay(i)}
        className={`inputCheck ${formConfig.weekDay.includes(i) ? 'bg-teal-700' : ''}`} value={firstThree} type="button" />
    })
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
  const labelVariants = {
    up: { y: 0, opacity: 0.5 },
    down: { y: -20, color: 'rgb(80, 199, 93)', opacity: 1, }
  }
  const myForm = <form className="mb-24 text-xs font-sans w-full rounded-md sm:text-sm md:text-base lg:text-lg xl:text-xl">

    <div className="flex flex-col justify-between relative">
      <header className="w-full flex mb-8 justify-between items-center" >
        <Link to='/'>

          <motion.button
            transition={{ type: "spring", damping: 10, stiffness: 200 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            initial={{ x: -90 }}
            animate={formConfig.weekDay.length > 0 ? 'show' : 'close'}
            variants={checkVariant.saveTop}
            className="bg-teal-600  p-2 flex justify-center items-center rounded-lg"
            onClick={() => submitTask({ ...formConfig })}>
            <img src={checked} className="w-4 sm:w-6 md:w-8  xl:w-10" alt="confirm" />
          </motion.button>

        </Link>

        <span className="font-bold">
          <h1>New Event</h1>
          <p className="text-center font-slab text-gray-200">
            {`${formConfig.duration >= 60 ? convertMin(formConfig.duration) : `${formConfig.duration} MINUTES`} `}</p>
        </span>

        <Link to='/'>
          <Button props={{ icon: [cancel, 'cancel'] }} />
        </Link >
      </header>

      <span className="flex flex-col mb-10 mt-3  items-center font-bold">
        <motion.label

          initial={{ y: 25 }}
          variants={labelVariants} animate={formConfig.name ? 'down' : 'up'} htmlFor="nameEvent"
          className="w-6/12 md:w-2/6 lg:w-1/4 py-2 focus:text-green-700 absolute ">name</motion.label>

        <input name="name" id="nameEvent" onChange={(e) => { setFormConfig({ ...formConfig, name: e.target.value }), console.log(e.target.offsetTop) }}
          type="text" placeholder={formConfig.name ? formConfig.name : ''}
          className="px-1 py-2 bg-transparent border-b-2 hover:scale-x-105 duration-500
           focus:border-green-500 outline-none w-6/12 md:w-2/6 lg:w-1/4 self-center "
        />
      </span>

      {selectedIcon()}

      <h3>Repeat</h3>

      <div className="w-full flex mb-8 justify-between">
        {pushDay()}
      </div>

      <span className="flex justify-between items-center ">
        <h3 className="">Duration</h3>
        {moreTime()}
      </span>
      {selectDuration()}

      <h3 className="w-11/12 self-center">When</h3>

      <div className="flex divide-y flex-col p-2 h-96 overflow-auto w-11/12 self-center gap-y-1 bg-teal-600 rounded-lg md:h-[40rem] 2xl:h-[50rem]">
        {selectHour()}
      </div>

    </div >
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
      animate={formConfig.weekDay.length > 0 ? 'show' : 'close'}
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