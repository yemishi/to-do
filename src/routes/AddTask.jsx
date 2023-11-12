import React, { useEffect } from "react"
import { chooseBgColor, configIcon, selectedIcon } from "../features/configIcon"
import { useGlobalState, weekDay } from "../App"
import { moreTime } from "../features/store"

import { Link } from "react-router-dom"
import { selectHour, selectDuration } from "../features/store"
import Button, { ButtonSaveB, ButtonSaveT, Input } from "../features/FormToolkit"

import cancel from '../assets/imgs/cancel.svg'
import { tagConfig } from "../features/store"
import axios from "axios"

export default function AddTask() {


  const { formValues, setFormValues, setDrag } = useGlobalState()

  useEffect(() => {
    const firstDrag = document.querySelector('.chooseDuration')

    setFormValues({
      ...formValues,
      duration: 15,
      name: '',
      hour: '00:00',
      weekDay: [],
      tags: [],
    })

    setDrag(firstDrag.offsetLeft)
    const hourDefault = document.querySelector('.optionHour')
    hourDefault.classList.add('active')

  }, [])
  const submitTask = async () => {
    await axios.post(`https://node-mongodb-api-5wtv.onrender.com/task`, { formValues })
    
  }

  const pushDay = () => {

    const toggleWeekDay = (index) => {

      if (formValues.weekDay.includes(index)) {
        setFormValues({
          ...formValues,
          weekDay: formValues.weekDay.filter((day) => day !== index),
        });
      } else {
        setFormValues({
          ...formValues,
          weekDay: [...formValues.weekDay, index],
        });
      }
    };

    return weekDay.map((e, i) => {
      const firstThree = e.substring(0, 3).toUpperCase()
      return <input key={e} onClick={() => toggleWeekDay(i)}
        className={`selectDay ${formValues.weekDay.includes(i) ? 'bg-teal-700 dark:bg-water-600' : ''}`} value={firstThree} type="button" />
    })
  }

  const convertMin = (event) => {
    let minToHour = 0
    while (event >= 60) event -= 60, minToHour++
    return `${minToHour} ${minToHour > 1 ? 'HOURS' : 'HOUR'}`
  }




  const myForm = <form className="wrapper">

    <header className="w-full flex mb-8 justify-between items-center" >
      <Link to='/home'>
        <ButtonSaveT props={{ action: () => submitTask({ ...formValues }), formValues }} />

      </Link>

      <span className="font-bold">
        <h1>New Event</h1>
        <p className="text-center font-slab text-gray-200">
          {`${formValues.duration >= 60 ? convertMin(formValues.duration) : `${formValues.duration} MINUTES`} `}</p>
      </span>

      <Link to='/home'>
        <Button props={{ icon: cancel, alt: 'cancel' }} />
      </Link >
    </header>

    <span className="mb-6 w-6/12 md:w-2/6 lg:w-1/4 self-center">
      <Input props={{ formValues, setFormValues, type: "text", element: "name" }} />
    </span>

    {selectedIcon()}
    {chooseBgColor()}

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

    <div className="hourContainer">
      {selectHour()}
    </div>

    {configIcon()}
    <h3 className="mb-0 2xl:w-2/3 2xl:self-center">Tags</h3>
    {tagConfig()}

    <Link to='/home'>
      <ButtonSaveB props={{ action: () => submitTask({ ...formValues }), formValues }} />
    </Link>
  </form >

  return (

    <div className="flex justify-end ">
      {myForm}
    </div>
  )
}