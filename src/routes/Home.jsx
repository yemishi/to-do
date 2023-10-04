import { useState, useEffect } from 'react'
import { useGlobalState, weekDay } from '../App.jsx'
import { useTask } from '../freatures/useAxios.js'
import { motion, AnimatePresence } from 'framer-motion'
import toUp from '../assets/imgs/toUp.svg'
import toDown from '../assets/imgs/toDown.svg'
import plus from '../assets/imgs/plus.svg'
import { Link } from 'react-router-dom'
import Button from '../freatures/Button.jsx'
import goback from '../assets/imgs/goback.svg'
import { handlerTag, tagColor } from '../freatures/store.jsx'
import MobileBar from '../freatures/MobileBar.jsx'
import gear from '../assets/imgs/gear.svg'

export default function Home() {

  const date = new Date()
  const d = date.getDay()
  const currentSeconds = date.getSeconds()
  const [task, setTask] = useState([])
  const { chosenTag, chosenDay, setChosenDay, setMobBar, showMobBar } = useGlobalState()
  const [arrow, setArrow] = useState(toDown)

  const parseToMs = (h, m) => (h * 60 * 60 + m * 60 - currentSeconds) * 1000

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
    useTask(setTask)
  }, [d])


  const eventTime = ({ id, weekDay, hour, duration }) => {
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
      console.log('siuuu')
      setTimeout(() => {
        element.style.opacity = 0.5
        console.log('f')
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

  const scrollArrow = () => {

    const container = document.querySelector('.eventContainer')
    const result = container.scrollHeight - container.clientHeight
    container.scrollBy({ top: container.scrollTop == result ? -container.scrollHeight : 305, behavior: 'smooth' })
    if (container.scrollTop == result) setArrow(toDown)
    else if (container.scrollTop + 305 >= result) setArrow(toUp)
    else setArrow(toDown)
  }

  const taskFilter = () => {
    const includeDay = (e) => e.weekDay.includes(weekDay.indexOf(chosenDay))

    if (chosenTag) {
      const filterTag = task.filter(e => {

        if (chosenDay) {
          const tagMatches = e.tag.some(tag => {
            return tag.tag === chosenTag;
          });
          return tagMatches && includeDay(e);
        }
        else {
          return e.tag.some(ele => {
            return ele.tag == chosenTag
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
      initial={{ scale: 0 }} animate={{
        scale: 1, transitionEnd: {
          transition: { duration: 2 }
        }
      }}

      transition={{ duration: i / 5, }}
      className={`w-3 h-1  ${ad} rounded-lg ${bg}`}
    />

    return array.sort((a, b) => {
      if (a.tag == chosenTag) return -1
      else return a - b
    }).map((e, i) => {
      const opacity = e.tag != chosenTag && chosenTag ? 'opacity-50' : 'opacity-100'
      return motionSvg(e.color, i, opacity)
    })

  }

  const selectDay = () => {
    return weekDay.map(e => {
      const firstThree = e.substring(0, 3).toUpperCase()
      return <input key={e} type="button" value={firstThree} onClick={() => setChosenDay(chosenDay == e ? null : e)}
        className={`inputCheck ${chosenDay == e ? 'bg-teal-900' : ''}  hidden sm:block`} />

    })
  }

  return <div className='h-full flex  flex-col'>

    <header className='flex items-center mb-8 justify-between  '>

      <Button props={{ icon: [gear, 'config'], action: () => setMobBar(!showMobBar) }} />

      <h1 className='text-white text-center'>{chosenDay ? chosenDay : 'Everyday'}</h1>

      <Link to='/new' className="bg-teal-600  flex justify-center items-center rounded-lg" >
        <Button props={{ icon: [plus, 'plus'] }} />
      </Link>

    </header>

    <div className='hidden sm:flex my-6 mt-14 justify-between'>
      {selectDay()}
      <input type="button" value="All" onClick={() => setChosenDay(null)}
        className={`inputCheck  ${chosenDay == null ? 'bg-teal-900' : ''}  hidden lg:block`} />
    </div>

    <span className='flex justify-between'>
      <h3>Events</h3>

      <div className="overflow-hidden hidden relative sm:flex items-center">
        {handlerTag(tagBox, setTagBox)}
        <span onClick={() => (setTagBox(!tagBox))} className={`border-2 hover:bg-opacity-100
        border-teal-500 border-r-0 bg-opacity-40 z-10 w-8 h-11 rounded-l-full
        ${chosenTag ? tagColor[chosenTag] : 'bg-gray-300'}`} />
      </div>

    </span>

    <ul className='eventContainer flex-1 overflow-auto text-xs relative  '>

      <AnimatePresence>
        {taskFilter().sort((a, b) => sortTask(a, b)).map(e => {
          return <Link to={`/edit/${e.id}`} key={e.id}>
            <motion.li

              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.5, x: 0 }}
              whileHover={{ opacity: 1 }}

              onLoad={() => eventTime(e)} id={`event${e.id}`} className='event duration-[125ms] '>

              <div className='flex items-center gap-4'>

                <span className={`w-12 p-2 rounded-2xl ${e.bg}`}>
                  <img src={e.icon} alt="icon" />
                </span >

                <span className='flex flex-col font-serif'>
                  <h4 className='text-sm font-semibold md:text-xl'>{e.name}</h4>

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
                <p className='px-2 py-1 rounded-md text-center border-e-2 border-b-2 border-teal-400' >{e.hour}</p>
                <p className='px-2 py-1 rounded-md text-center border-e-2 border-b-2 border-teal-400'>{until(e.hour, e.duration)}</p>
              </span>
            </motion.li>
          </Link>
        })}
      </AnimatePresence>
      <Link to='/new'>
        <button className='w-full text-sm font-extrabold bg-teal-600 items-center text-gray-100 rounded-xl p-2 flex gap-3'>
          <img src={plus} alt="plus" className='w-10 p-2 rounded-full bg-teal-500 opacity-70' />
          Add Event
        </button>
      </Link>


    </ul>


    <MobileBar />
  </div >

}



