import AlertBox from "./AlertBox"
import { motion } from 'framer-motion'
import { useState } from "react"
import { useGlobalState } from "../App"

const inputTime = []
const minutes = ['00', '15', '30', '45', '60']
let hourCount = 0
let minCount = 0
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

while (hourCount <= 23) {
  if (hourCount <= 9) {
    inputTime.push(`0${hourCount}:${minutes[minCount]}`)
  } else inputTime.push(`${hourCount > 9 ? '' : 0}${hourCount}:${minutes[minCount]}`)
  if (minCount >= 3) {
    minCount = 0
    hourCount++
  }
  else minCount += 1
}
export const verifyLimit = (settedHour, add = 0) => {
  const parseToMs = (h, m) => (h * 60 * 60 + m * 60) * 1000

  const time = settedHour.split(':')
  const hour = Number(time[0])
  const minute = Number(time[1])
  return {
    min: parseToMs(hour, minute) + (add) * 60000 >= 86400000,
    hour: parseToMs(hour, minute) + (add * 3600000) <= 86400000
  }
}

export const selectHour = () => inputTime.map((ele) => {
  const { formConfig, setFormConfig, } = useGlobalState()
  const handleDad = (e) => {
    e.stopPropagation()
    const colectionList = [...document.querySelectorAll('.myB')]
    colectionList.map(li => { if ([...li.childNodes].includes(e.target)) li.click() })
  }

  const handlerLimit = (colection, element) => {
    const reverseColection = colection.reverse()

    const handlerElementClass = (e, selectedClass, action) => {
      const check = e.classList.contains(selectedClass)
      if (check && action == 'remove') e.classList.remove(selectedClass)
      else if (!check && action == 'add') e.classList.add(selectedClass)
    };

    const passedElement = (e) => {
      handlerElementClass(e, 'line-through', 'remove')
      setFormConfig({ ...formConfig, hour: e.firstChild.value })
      e.classList.add('bg-teal-500')
      e.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    };

    const rejectElement = (e) => {
      handlerElementClass(e, 'bg-teal-500', 'remove')
      handlerElementClass(e, 'line-through', 'add')
    };

    const clearContainer = (ele) => {
      colection.forEach(e => {
        if (e !== ele && e.classList.contains('bg-teal-500')) {
          handlerElementClass(e, 'bg-teal-500', 'remove')
        }
        if (!verifyLimit(e.firstChild.value, formConfig.duration).min) {
          handlerElementClass(e, 'line-through', 'remove')
        }
      })
    }
    element.classList.add('bg-teal-500')
    setFormConfig({ ...formConfig, hour: element.firstChild.value })
    clearContainer(element)
    if (verifyLimit(element.firstChild.value, formConfig.duration).min) {
      reverseColection.find((e => {
        if (verifyLimit(e.firstChild.value, formConfig.duration).min) {
          rejectElement(e)
        }
        else {
          passedElement(e);
          return true
        }
      }))
    }
  }
  return <span key={ele} className="myB font-bold relative text-md cursor-pointer flex duration-500 justify-between px-9 py-4
   rounded-lg md:py-6 md:text-lg decoration-4 decoration-red-200" onClick={(e) => handlerLimit([...document.querySelectorAll('.myB')], e.target)}>

    <input onClick={(e) => handleDad(e)} type='button' className="cursor-pointer" value={ele} />
    <svg onClick={(e) => handleDad(e)} width="24" height="24" fill="white">
      <path d="M16 7.328v-3.328l8 8-8 8v-3.328l-16-4.672z" /></svg>
    <input onClick={(e) => handleDad(e)} type="button" className="cursor-pointer" value={until(ele, formConfig.duration)} />

  </span >
}
)

const msg = 'Duration Limite Exceeded'

const timeConfig = (event, type, moreTimeSeparator) => {
  const time = []
  for (let i = 0; i < event; i++) {
    time.push(i)
  }

  return time.map(e => {
    if (String(e).length > 1) {
      return <li className={`${type == 'hour' ? 'hour' : 'min'} myL cursor-pointer duration-500`} key={e} value={e} onClick={(e) => {
        const allItems = document.querySelectorAll('.myL')
        allItems.forEach(element => {
          if (element.lastChild == e.target.lastChild) element.classList.add('bg-teal-800')
          else if (Array.from(element.classList).includes(type) == Array.from(e.target.classList).includes(type)) element.classList.remove('bg-teal-800')
        });
        if (type == 'hour') moreTimeSeparator[0] = 60 * e.target.value
        else moreTimeSeparator[1] = e.target.value
      }
      }> {`${e}${type == 'hour' ? 'h' : 'm'}`}</li >
    } if (String(e).length <= 1)
      return <li className={`${type == 'hour' ? 'hour' : 'min'} myL cursor-pointer duration-500`} key={e} value={e} onClick={(e) => {
        const allItems = document.querySelectorAll('.myL')
        allItems.forEach(element => {
          if (element.lastChild == e.target.lastChild) element.classList.add('bg-teal-800')
          else if (Array.from(element.classList).includes(type) == Array.from(e.target.classList).includes(type)) element.classList.remove('bg-teal-800')
        });
        if (type == 'hour') moreTimeSeparator[0] = 60 * e.target.value
        else moreTimeSeparator[1] = e.target.value
      }
      }> {`0${e}${type == 'hour' ? 'h' : 'm'}`}</li >
  })
}

export const moreTime = () => {
  const durationCheck = document.querySelector('.draggable')
  const { currentBox, setCurrentBox, moreTimeSeparator, alertShow, alertHandler, formConfig, setFormConfig } = useGlobalState()
  return [<motion.p
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{
      type: "spring",
      damping: 10,
      stiffness: 200
    }}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    className={` ${durationCheck ? Array.from(durationCheck.classList).includes('hidden') ? 'text-teal-300' : 'text-white' : ''} 
  cursor-pointer font-geogia rota font-bold text-lg `} onClick={() => {
      moreTimeSeparator[0] = 0, moreTimeSeparator[1] = 0, setCurrentBox(1)
    }}> more...</motion.p >,

  <motion.div
    transition={{ type: "tween" }}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}

    className="flex w-64 p-2 relative  justify-around bg-gradient-to-br from-teal-800 to-teal-600 shadow-xl mb-8 rounded-lg">
    <AlertBox msg={msg} toggleOpen={alertHandler} isOpen={alertShow} />
    <ul className="moreTimeContainer overflow-auto h-52">{timeConfig(23, 'hour', moreTimeSeparator)} </ul>
    <span className="w-20 flex flex-col justify-between py-2">

      <button onClick={(e) => { e.preventDefault(), setCurrentBox(0) }}
        className=" bg-rose-400 font-title w-20 h-9 rounded-2xl font-semibold">Cancel</button>
      <button onClick={(e) => {
        e.preventDefault()

        const colectionHour = [...document.querySelectorAll('.hour')]
        const firstMin = [...document.querySelectorAll('.min')][0]
        const container = document.querySelectorAll('.moreTimeContainer')
        if (verifyLimit(formConfig.hour, moreTimeSeparator[0] + moreTimeSeparator[1]).min) {
          for (let i = colectionHour.length - 1; i >= 0; i--) {
            if (verifyLimit(formConfig.hour, colectionHour[i].value).hour) {
              colectionHour[i].click()
              setFormConfig({ ...formConfig, duration: moreTimeSeparator[0] + firstMin.value })
              container[0].scrollTo({ top: colectionHour[i].offsetTop - container[0].offsetTop, behavior: 'smooth' })
              if (!verifyLimit(formConfig.hour, moreTimeSeparator[0] + moreTimeSeparator[1]).min) break;
            } else colectionHour[i].classList.remove('bg-teal-800')

          }
          alertHandler(1)
          container[1].scrollTo({ top: firstMin.scrollTop, behavior: 'smooth' })
          firstMin.click()
          setTimeout(() => alertHandler(0), 4000);
        } else if (!verifyLimit(formConfig.hour, moreTimeSeparator[0] + moreTimeSeparator[1]).min) {
          setFormConfig({ ...formConfig, duration: moreTimeSeparator[0] + moreTimeSeparator[1] })
          durationCheck.classList.add('hidden')
          setCurrentBox(0)
        }


      }} className="test2 bg-sky-500 font-title  w-20 h-9 rounded-2xl font-semibold">Save</button></span>

    <ul className="moreTimeContainer overflow-auto h-52">{timeConfig(60, 'min', moreTimeSeparator)}</ul></motion.div >][currentBox]
}

const lightEffect = [
  { effec: 'lightZero', content: '15m' },
  { effec: 'lightOne', content: '30m' },
  { effec: 'lightTwo', content: '45m' },
  { effec: 'lightThree', content: '1h' },
  { effec: 'lightFour', content: '2h' },
  { effec: 'hidden', content: '' }
]
export const selectDuration = () => {
  const { light, setLight, dragAlertShow, dragAlertHandler, formConfig, setFormConfig } = useGlobalState()
  const container = document.querySelector('.durationContainer')
  const durationConfig = (d, c, e) => {
    if (verifyLimit(formConfig.hour, d).min) {
      dragAlertHandler(1)
      Array.from(container.childNodes).map((ele, y) => {
        if (ele.value == e.target.value) {
          setTimeout(() => {
            Array.from(container.childNodes)[y - 1].click()
          }, 500);
        }
      })

    } else dragAlertHandler(0)

    setFormConfig({ ...formConfig, duration: d })
    setLight(c)
    const duration = document.querySelector('.draggable')
    duration.classList.remove('hidden')
  }

  const handleDrag = () => {
    const draggable = document.querySelector('.draggable')
    const draggableRect = draggable.getBoundingClientRect()
    const durations = document.querySelectorAll('.chooseDuration')
    const container = Array.from(durations)
    container.sort((a, b) => {
      const aRect = a.getBoundingClientRect()
      const bRect = b.getBoundingClientRect()
      return Math.abs(aRect.left - draggableRect.left) - Math.abs(bRect.left - draggableRect.left)
    })
    container[0].click()
  }

  return <span className="durationContainer  flex font-semibold mb-8 justify-between bg-teal-700 h-16 rounded-lg relative  px-4 overflow-hidden 
  md:h-20 md:text-lg">
    <AlertBox msg={msg} toggleOpen={dragAlertHandler} isOpen={dragAlertShow} />
    <motion.input
      ref={lightEffect[light]}
      dragElastic={1}
      drag="x"
      onDragStart={() => {
        const ele = document.querySelector('.draggable')
        ele.classList.remove('duration-500')
      }}
      onDragEnd={() => { handleDrag() }}
      whileDrag={{}}
      dragTransition={{ bounceStiffness: 10, bounceDamping: 20000 }}
      whileTap={{ cursor: 'pointer' }}
      dragConstraints={{ left: 0, right: 0 }}

      type="button" className={`draggable w-24 duration-500 absolute h-14 ${lightEffect[light].effec} top-1 rounded-md bg-teal-600 md:h-16 md:w-28 md:top-2`}
      value={lightEffect[light].content} />

    <input type="button" className="a w-24 chooseDuration cursor-pointer rounded-md" onClick={(e) => durationConfig(15, 0, e)} value="15m" />
    <input type="button" className="b w-24 chooseDuration cursor-pointer rounded-md" onClick={(e) => durationConfig(30, 1, e)} value="30m" />
    <input type="button" className="c w-24 chooseDuration cursor-pointer rounded-md" onClick={(e) => durationConfig(45, 2, e)} value="45m" />
    <input type="button" className="d w-24 chooseDuration cursor-pointer rounded-md" onClick={(e) => durationConfig(60, 3, e)} value="1h" />
    <input type="button" className="e w-24 chooseDuration cursor-pointer rounded-md" onClick={(e) => durationConfig(120, 4, e)} value="2h" />
  </span>
}



export const tagConfig = () => {
  const { formConfig } = useGlobalState()
  const bgs = {
    Leisure: 'bg-emerald-300', Work: 'bg-red-300', Study: 'bg-cyan-300', Meal: 'bg-indigo-300', Commute: 'bg-amber-300',
    Chores: 'bg-rose-300', Break: 'bg-amber-300',
  }
  const defaultTags = ['Leisure', 'Work', 'Study', 'Meal', 'Commute', 'Chores', 'Break']
  const item = (ele, bg) => {
    const tag = { tag: ele, color: bg }
    return <span key={ele} className={`pl-2  rounded-lg mb-3 bg-teal-800 duration-300 `} onClick={(e) => {
      if ([...e.target.classList].includes(bg)) e.target.classList.remove(bg), e.target.classList.add('bg-teal-800')
      else e.target.classList.add(bg), e.target.classList.remove('bg-teal-800')
      formConfig.tag.some(e => e.tag == ele) ? formConfig.tag.splice(formConfig.tag.findIndex(e => e.tag == ele), 1) : formConfig.tag.push(tag)
    }}>
      <p onClick={(ele) => {
        ele.stopPropagation()
        ele.target.parentNode.click()
      }} className="bg-teal-700 py-1 font-montserrat rounded-lg text-left px-3">{ele}</p>
    </span>
  }
  return <div className="flex flex-wrap rounded-2xl mt-5 gap-x-5 p-3 bg-teal-600">
    {defaultTags.map(ele => item(ele, bgs[ele]))}
  </div >
}