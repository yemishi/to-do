import { useState, useEffect } from 'react'
import { useTask } from '../freatures/useAxios.js'
import { motion, AnimatePresence } from 'framer-motion'
import toUp from '../assets/imgs/toUp.svg'
import toDown from '../assets/imgs/toDown.svg'
import plus from '../assets/imgs/plus.svg'
import { Link } from 'react-router-dom'
import Button from '../freatures/Button.jsx'
import goback from '../assets/imgs/goback.svg'
export default function Home() {

  const date = new Date()
  const d = date.getDay()
  const currentSeconds = date.getSeconds()
  const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const [task, setTask] = useState([])
  const [chosenDay, setChosenDay] = useState(weekDay[d])
  const [chosenTag, setChosenTag] = useState('')
  const [arrow, setArrow] = useState(toDown)

  const parseToMs = (h, m) => (h * 60 * 60 + m * 60 - currentSeconds) * 1000

  const toMilliseconds = (myHour, weekDay, duration) => {
    const currentTime = `${date.getHours() > 9 ? date.getHours() :
      `0${date.getHours()}`}:${date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    const pickedHour = myHour.split(':')
    const regionHour = currentTime.split(':')
    const limitDuration = parseToMs(pickedHour[0], pickedHour[1]) + (duration * 60000)
    const currentyHour = parseToMs(regionHour[0], regionHour[1])
    weekDay.sort((a) => { if (a == date.getDay() && limitDuration > currentyHour) return -1 })
    if (weekDay[0] == date.getDay() && parseToMs(pickedHour[0], pickedHour[1]) < parseToMs(regionHour[0], regionHour[1]) &&
      limitDuration > currentyHour) return 0
    else if (weekDay[0] == date.getDay() && myHour > currentTime) return parseToMs(pickedHour[0] - regionHour[0], pickedHour[1] - regionHour[1])
    else return parseToMs(pickedHour[0] - regionHour[0] + 24, pickedHour[1] - regionHour[1])
  }

  useEffect(() => {
    useTask(setTask)
    const dayDefault = document.querySelectorAll('.inputCheck')
    dayDefault[d].classList.add('bg-teal-900')
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

  const selectDay = (e, day) => {

    const allInput = document.querySelectorAll('.inputCheck')
    Array.from(allInput).map(ele => {
      if (ele != e.target) ele.checked = false, ele.classList.remove('bg-teal-900')
      else ele.classList.add('bg-teal-900'), ele.checked = true
    })
    setChosenDay(day)
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
    if (chosenTag == '') {
      if (chosenDay != 'Everyday') return task.filter(e => includeDay(e))
      else return task
    }
    else {
      const filterTag = task.filter(e => {

        if (chosenDay != 'Everyday') {
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
    }
  }
  const tagFilter = (array) => {
    const motionSvg = (bg, i, ad) => <motion.svg
      initial={{ scale: 0 }} animate={{
        scale: 1, transitionEnd: {
          transition: { duration: 2 }
        }
      }}

      transition={{ duration: i / 5, }}
      className={`w-4 h-2  ${ad} rounded-lg ${bg}`}
    />

    return array.sort((a, b) => {
      if (a.tag == chosenTag) return -1
      else return a - b
    }).map((e, i) => {
      const upScale = e.tag != chosenTag && chosenTag != '' ? 'opacity-50' : 'opacity-100'
      return motionSvg(e.color, i, upScale)
    })

  }

  return <div className='h-full flex flex-col relative '>

    <p onClick={() => setChosenTag('Work')}>BNBBBB</p>
    <p onClick={() => setChosenTag('Study')}>S</p>
    <p onClick={() => setChosenTag('Leisure')}>L</p>
    <header className='flex items-center  justify-between mb-14 '>
      <h1 className='text-white text-center'>{chosenDay}</h1>
      <Link to='/new' className="bg-teal-600  w-11 h-11 flex justify-center items-center rounded-lg" >
        <Button props={{ icon: [plus, 'plus'] }} /></Link></header>
    <nav className='flex my-6  justify-between'>
      <input type="button" value="SUN" onClick={(e) => selectDay(e, weekDay[0])} className='inputCheck hidden sm:block' />
      <input type="button" value="MON" onClick={(e) => selectDay(e, weekDay[1])} className='inputCheck hidden sm:block' />
      <input type="button" value="TUE" onClick={(e) => selectDay(e, weekDay[2])} className='inputCheck hidden sm:block' />
      <input type="button" value="WED" onClick={(e) => selectDay(e, weekDay[3])} className='inputCheck hidden sm:block' />
      <input type="button" value="THU" onClick={(e) => selectDay(e, weekDay[4])} className='inputCheck hidden sm:block' />
      <input type="button" value="FRI" onClick={(e) => selectDay(e, weekDay[5])} className='inputCheck hidden sm:block' />
      <input type="button" value="SAT" onClick={(e) => selectDay(e, weekDay[6])} className='inputCheck hidden sm:block' />
      <input type="button" value="ALL" onClick={(e) => selectDay(e, 'Everyday')} className='inputCheck hidden sm:block' />

    </nav>

    <h3 className='text-2xl px-3 '>Events</h3>
    <ul

      className='eventContainer flex-1 overflow-auto relative  '>

      <AnimatePresence>
        {taskFilter().sort((a, b) => sortTask(a, b)).map(e => {
          return <Link to={`/edit/${e.id}`} key={e.id}>
            <motion.li

              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.5, x: 0 }}
              whileHover={{ opacity: 1 }}

              onLoad={() => eventTime(e)} id={`event${e.id}`} className='event duration-[125ms] '>

              <div className='flex items-center gap-4'>

                <span className={`w-16 p-3 rounded-2xl  ${e.bg}`}>
                  <img src={e.icon} alt="icon" />
                </span >

                <span className='flex flex-col '>
                  <h4 className='text-lg font-extrabold md:text-xl'>{e.name}</h4>

                  <span className='flex gap-x-1'>
                    <p className='text-gray-200'>{`${e.duration > 60 ? convertMin(e.duration) : `${e.duration} ${e.duration > 1 ? 'minutes' : 'minute'}`}`}</p>
                    {e.weekDay.length > 1 ? <img src={goback} className='w-4 ' /> : ""}
                  </span>

                  <span className='flex mt-1 items-center gap-x-1'>
                    {tagFilter(e.tag)}
                  </span>
                </span>

              </div>

              <span className='flex flex-col gap-y-3 font-bold font-slab'>
                <p className='px-2 py-1 rounded-md text-center border-e-2 border-b-2 border-teal-400' >{e.hour}</p>
                <p className='px-2 py-1 rounded-md text-center border-e-2 border-b-2 border-teal-400'>{until(e.hour, e.duration)}</p>
              </span>
            </motion.li>
          </Link>
        })}
      </AnimatePresence>
      <Link to='/new'>
        <button className='w-full text-lg font-extrabold bg-teal-600 items-center text-gray-100 rounded-xl p-4 flex gap-3'>
          <img src={plus} alt="plus" className='w-16 p-4 rounded-full bg-teal-500 opacity-70' />
          Add Event
        </button>
      </Link>


    </ul>
    <div className={`${taskFilter().length >= 7 ? 'absolute' : 'hidden'} px-3 bottom-12 h-0 w-full`}>
      <button onClick={() => scrollArrow()} className='bg-teal-800 opacity-50 
          gap-x-3 py-5 flex items-center justify-center bg shadow-2xl rounded-b-xl h-12 w-full'>
        <img src={arrow} alt="w-5" className='w-8' />
        <img src={arrow} alt="w-5" className='w-8' />
        <img src={arrow} alt="w-5" className='w-8' />
      </button>
    </div>

    <p onClick={() => {
      console.log(tagFilter(task[0].tag))
    }}>aa</p>
  </div >

}



