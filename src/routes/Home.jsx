import axios from 'axios'

import React, { useState, useEffect } from 'react'

import { useGlobalState, weekDay } from '../App.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { handlerTag, tagColor } from '../features/store.jsx'
import MobileBar from '../features/MobileBar.jsx'
import Button from '../features/FormToolkit.jsx'

import plus from '../assets/imgs/plus.svg'
import { Link, useNavigate } from 'react-router-dom'
import goback from '../assets/imgs/goback.svg'
import gear from '../assets/imgs/gear.svg'

export default function Home() {

  const date = new Date()
  const d = date.getDay()
  const currentSeconds = date.getSeconds()

  const { chosenTag, chosenDay, setChosenDay, setTask, setMobBar, showMobBar, task } = useGlobalState()
  const [darkMode, setDarkMode] = useState()
  const parseToMs = (h, m) => (h * 60 * 60 + m * 60 - currentSeconds) * 1000

  const navigate = useNavigate()
  const toMilliseconds = (myHour, weekDay, duration) => {

    const currentTime = `${date.getHours() > 9 ? date.getHours() :
      `0${date.getHours()}`}:${date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    const pickedHour = myHour.split(':')
    const regionHour = currentTime.split(':')
    const limitDuration = parseToMs(pickedHour[0], pickedHour[1]) + (duration * 60000)
    const currentHour = parseToMs(regionHour[0], regionHour[1])

    weekDay.sort((a) => { if (a == date.getDay() && limitDuration > currentHour) return -1 })

    if (weekDay[0] == date.getDay() && parseToMs(pickedHour[0], pickedHour[1]) < parseToMs(regionHour[0], regionHour[1]) &&
      limitDuration > currentHour) return 0

    else if (weekDay[0] == date.getDay() && myHour > currentTime) return parseToMs(pickedHour[0] - regionHour[0], pickedHour[1] - regionHour[1])

    else return parseToMs(pickedHour[0] - regionHour[0] + 24, pickedHour[1] - regionHour[1])
  }

  useEffect(() => {
    axios.post('https://node-mongodb-api-5wtv.onrender.com/login', { name: localStorage.name, password: localStorage.password }).then((res) => {
      setTask(res.data.content)
    })

    setDarkMode(document.documentElement.classList.contains('dark') ? 'night' : '')
    if (!localStorage.password && !localStorage.name) navigate("/login")
  }, [d])



  const eventTime = ({ id, weekDay, hour, duration, icon, name }) => {
    const element = document.getElementById(`event${id}`)
    const time = toMilliseconds(hour, weekDay, duration)
    setTimeout(() => {

      const date = new Date()
      const currentHour = `${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`}:
      ${date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()}`;
      const pickedHour = hour.split(':')
      const regionHour = currentHour.split(':')
      const durationToMs = parseToMs(pickedHour[0], pickedHour[1]) + (duration * 60000)
      const hourToMs = parseToMs(regionHour[0], regionHour[1])
      const eventLimit = durationToMs - hourToMs
      element.style.opacity = 1

      if (Notification.permission == "granted") {
        new Notification('your event has just started', {
          body: name,
          icon: icon,
          tag: name
        }).addEventListener('click', () => window.focus())
      }
      setTimeout(() => {
        element.style.opacity = 0.5
      }, eventLimit);
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

    }, time);
  }

  const convertMin = (event) => {
    let minToHour = 0
    while (event >= 60) event -= 60, minToHour++
    const rest = event ? `${event} ${event > 1 ? 'minutes' : 'minute'}` : ''

    return `${minToHour} ${minToHour > 1 ? `hours ${rest}` : `hour${rest}`}`
  }

  const until = (e, duration) => {
    const origin = e.split(':')
    let hour = Number(origin[0])
    let min = Number(origin[1]) + duration

    const filterItems = (i) => {
      const toString = String(i)
      if (toString.length < 2) return `0${i}`
      else return i
    }
    while (min >= 60) min -= 60, hour++

    return `${filterItems(hour)}:${(filterItems(min))}`
  }
  const [tagBox, setTagBox] = useState(false)
  const sortTask = (a, b) => {

    const a1 = (action) => Number(Array.from(a.hour)[action])
    const b1 = (action) => Number(Array.from(b.hour)[action])

    const verify = (a1, b1) => {
      if (a1(0) && b1(0)) {
        const aF = a1(0) + a1(1)
        const bF = b1(0) + b1(1)
        return aF - bF
      } else if (!a1(0) && !b1(0)) {
        return a1(1) - b1(1)
      } else return a1(0) - b1(0)
    }

    return verify(a1, b1)
  }

  const taskFilter = () => {
    const includeDay = (e) => e.weekDay.includes(weekDay.indexOf(chosenDay))

    if (chosenTag) {
      const filterTag = task.filter(e => {

        if (chosenDay) {
          const tagMatches = e.tag.some(tag => {
            return tag === chosenTag;
          });
          return tagMatches && includeDay(e);
        }
        else {
          return e.tag.some(e => {
            return e == chosenTag
          })
        }
      })
      return filterTag
    } else {
      if (chosenDay) return task.filter(e => includeDay(e))
      else return task
    }
  }

  const tagFilter = (array) => {
    const motionSvg = (bg, i, ad) => <motion.svg
      key={i}
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      transition={{ duration: i / 3, }}
      className={`w-3 h-1 sm:h-2 sm:w-5 xl:w-7 ${ad} rounded-lg ${bg}`}
    />

    return array.sort((a, b) => {
      if (a == chosenTag) return -1
      else return a - b
    }).map((e, i) => {
      const opacity = e.tag != chosenTag && chosenTag ? 'opacity-50' : 'opacity-100'
      return motionSvg(tagColor[e], i, opacity)
    })

  }

  const selectDay = () => {
    return weekDay.map(e => {
      const firstThree = e.substring(0, 3).toUpperCase()
      return <input key={e} type="button" value={firstThree} onClick={() => setChosenDay(chosenDay == e ? null : e)}
        className={`selectDay ${chosenDay == e ? 'bg-teal-900 dark:bg-water-600' : ''}  hidden sm:block`} />

    })
  }

  return <div className='wrapper m-0'>

    <header className='flex items-center mb-8   justify-between'>
      <span className='sm:hidden'> <Button props={{ icon: [gear, 'config'], action: () => setMobBar(!showMobBar) }} /></span>

      <div className={`toggle relative m-0 hidden sm:flex ${darkMode}`}
        onClick={() => {
          const doc = document.documentElement;

          if (doc.classList.contains('dark')) {
            doc.classList.remove('dark');
            localStorage.theme = 'light';
            setDarkMode('')
          } else {
            doc.classList.add('dark');
            localStorage.theme = 'dark';
            setDarkMode('night')
          }
        }}
      >
        <span className={`w-10 notch absolute rounded-full h-10`} />
        <span>
          <svg className="cloud sm" />
          <svg className="cloud sm" />
          <svg className="cloud md" />
          <svg className="cloud lg" />
        </span>
      </div>
      <h1 className='text-white'>{chosenDay ? chosenDay : 'Everyday'}</h1>

      <Link to='/new' >
        <Button props={{ icon: [plus, 'plus'] }} />
      </Link>

    </header>

    <div className='hidden sm:flex my-6 mt-14 justify-between'>
      {selectDay()}
      <input type="button" value="All" onClick={() => setChosenDay(null)}
        className={`selectDay  ${chosenDay == null ? 'bg-teal-900' : ''}  hidden lg:block`} />
    </div>

    <span className='flex justify-between mb-3 lg:my-5'>

      <h3>Events</h3>

      <div className="overflow-hidden hidden relative sm:flex items-center">
        {handlerTag(tagBox)}

        <span onClick={() => (setTagBox(!tagBox))} className={`border-2 hover:bg-opacity-100 cursor-pointer
        border-teal-500 dark:border-water-700 border-r-0 bg-opacity-40 z-10 w-8 h-11 xl:h-20 md:h-14 lg:h-16 rounded-l-full
        ${chosenTag ? tagColor[chosenTag] : 'bg-gray-300 dark:bg-water-700'}`} />
      </div>

    </span>

    <ul className='overflow-scroll flex-grow'>

      <AnimatePresence>
        {taskFilter().sort((a, b) => sortTask(a, b)).map(e => {
          return <Link to={`/edit/${e.id}`} key={e.id}>
            <motion.li
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 0.5, x: 0 }} whileHover={{ opacity: 1 }}
              onLoad={() => eventTime(e)} id={`event${e.id}`} className='bg-opacity-80 event duration-[125ms] '>

              <div className='flex items-center gap-4 '>

                <span className={`w-12 p-3 sm:w-14 md:w-16 rounded-2xl lg:w-20 2xl:w-1/4 ${e.bg}`}>
                  <img src={e.icon} alt="icon" />
                </span >

                <span className='flex flex-col font-serif'>
                  <h4 className='font-semibold'>{e.name}</h4>

                  <span className='flex gap-x-1'>
                    <p>{`${e.duration > 60 ? convertMin(e.duration) : `${e.duration} ${e.duration > 1 ? 'minutes' : 'minute'}`}`}</p>
                    {e.weekDay.length > 1 ? <img src={goback} className='w-4' /> : ""}
                  </span>

                  <span className='flex mt-1 items-center gap-x-1'>
                    {tagFilter(e.tag)}
                  </span>
                </span>

              </div>

              <span className='flex flex-col gap-y-2 font-bold font-slab'>
                <p className='px-2 py-1 rounded-md text-center dark:border-water-500 border-e-2 border-b-2 dark:bg-water-900' >{e.hour}</p>
                <p className='px-2 py-1 rounded-md text-center dark:border-water-500 border-e-2 border-b-2 dark:bg-water-900'>{until(e.hour, e.duration)}</p>
              </span>
            </motion.li>
          </Link>
        })}
      </AnimatePresence>
      <Link to='/new'>
        <button className='w-full font-bold bg-teal-600 dark:bg-water-800 opacity-40 duration-300 xl:p-6 hover:opacity-100 items-center text-gray-100 rounded-xl p-2 sm:p-4 flex gap-3'>
          <img src={plus} alt="plus" className='w-10 md:w-12 xl:w-14 hover:rotate-90 duration-500 p-2 rounded-full bg-teal-500 dark:bg-water-600 opacity-70' />
          Add Event
        </button>
      </Link>


    </ul>
    <MobileBar />

  </div >

}



