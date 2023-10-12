import AlertBox from "./AlertBox"
import { motion } from 'framer-motion'
import { useState, useEffect } from "react"
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
export const aa = 'aaa'

export const selectHour = () => inputTime.map((ele) => {
  const { formConfig, setFormConfig, } = useGlobalState()
  const handlerLiCollection = (e) => {
    e.stopPropagation()
    const collectionList = [...document.querySelectorAll('.optionHour')]
    collectionList.map(li => { if ([...li.childNodes].includes(e.target)) li.click() })
  }

  const handlerLimit = (collection, element) => {
    const reverseCollection = collection.reverse()

    const handlerElementClass = (e, selectedClass, action) => {
      const check = e.classList.contains(selectedClass)
      if (check && action == 'remove') e.classList.remove(selectedClass)
      else if (!check && action == 'add') e.classList.add(selectedClass)
    };

    const passedElement = (e) => {
      handlerElementClass(e, 'line-through', 'remove')
      setFormConfig({ ...formConfig, hour: e.firstChild.value })
      e.classList.add('active')
      e.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    };

    const rejectElement = (e) => {
      handlerElementClass(e, 'active', 'remove')
      handlerElementClass(e, 'line-through', 'add')
    };

    const clearContainer = (ele) => {
      collection.forEach(e => {
        if (e !== ele && e.classList.contains('active')) {
          handlerElementClass(e, 'active', 'remove')
        }
        if (!verifyLimit(e.firstChild.value, formConfig.duration).min) {
          handlerElementClass(e, 'line-through', 'remove')
        }
      })
    }
    element.classList.add('active')
    setFormConfig({ ...formConfig, hour: element.firstChild.value })
    clearContainer(element)
    if (verifyLimit(element.firstChild.value, formConfig.duration).min) {
      reverseCollection.find((e => {
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
  return <span key={ele} className="optionHour" onClick={(e) => handlerLimit([...document.querySelectorAll('.optionHour')], e.target)}>

    <input onClick={(e) => handlerLiCollection(e)} type='button' className="cursor-pointer" value={ele} />
    <svg onClick={(e) => handlerLiCollection(e)} width="24" height="24" fill="white">
      <path d="M16 7.328v-3.328l8 8-8 8v-3.328l-16-4.672z" /></svg>
    <input onClick={(e) => handlerLiCollection(e)} type="button" className="cursor-pointer" value={until(ele, formConfig.duration)} />

  </span >
}
)

const msg = 'Duration Limit Exceeded'

const timeConfig = (event, type, moreTimeSeparator) => {
  const time = []
  for (let i = 0; i < event; i++) {
    time.push(i)
  }

  return time.map(e => {
    if (String(e).length > 1) {
      return <li className={`${type == 'hour' ? 'hour' : 'min'} timePlus cursor-pointer duration-500`} key={e} value={e} onClick={(e) => {
        const allItems = document.querySelectorAll('.timePlus')
        allItems.forEach(element => {
          if (element.lastChild == e.target.lastChild) element.classList.add('active')
          else if (Array.from(element.classList).includes(type) == Array.from(e.target.classList).includes(type)) element.classList.remove('active')
        });
        if (type == 'hour') moreTimeSeparator[0] = 60 * e.target.value
        else moreTimeSeparator[1] = e.target.value
      }
      }> {`${e}${type == 'hour' ? 'h' : 'm'}`}</li >
    } if (String(e).length <= 1)
      return <li className={`${type == 'hour' ? 'hour' : 'min'} timePlus cursor-pointer duration-500`} key={e} value={e} onClick={(e) => {
        const allItems = document.querySelectorAll('.timePlus')
        allItems.forEach(element => {
          if (element.lastChild == e.target.lastChild) element.classList.add('active')
          else if (Array.from(element.classList).includes(type) == Array.from(e.target.classList).includes(type)) element.classList.remove('active')
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
    transition={{ type: "spring", damping: 10, stiffness: 200 }}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    className={` ${durationCheck ? Array.from(durationCheck.classList).includes('hidden') ? 'text-teal-300 dark:text-water-400' : 'text-white' : ''} 
  cursor-pointer font-bold  `} onClick={() => {
      moreTimeSeparator[0] = 0, moreTimeSeparator[1] = 0, setCurrentBox(1)
    }}> more...</motion.p >,

  <motion.div
    transition={{ type: "tween" }}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex p-2 relative gap-3 justify-around bg-gradient-to-b from-teal-700 to-teal-600 dark:from-water-950 dark:to-water-600 
     shadow-xl mb-8 rounded-lg">
    <AlertBox msg={msg} toggleOpen={alertHandler} isOpen={alertShow} />
    <ul className="moreTimeContainer overflow-auto h-40 sm:h-52 md:h-56">{timeConfig(23, 'hour', moreTimeSeparator)} </ul>
    <span className="flex font-title flex-col justify-between py-2">

      <button onClick={(e) => { e.preventDefault(), setCurrentBox(0) }}
        className=" bg-rose-400 px-2 py-1 rounded-2xl sm:px-4 sm:py-2  ">Cancel</button>

      <button onClick={(e) => {
        e.preventDefault()

        const collectionHour = [...document.querySelectorAll('.hour')]
        const firstMin = [...document.querySelectorAll('.min')][0]
        const container = document.querySelectorAll('.moreTimeContainer')

        const handleButtonClick = () => {
          const { hour } = formConfig;
          const targetValue = moreTimeSeparator[0] + moreTimeSeparator[1];

          if (verifyLimit(hour, targetValue).min) {
            for (let i = collectionHour.length - 1; i >= 0; i--) {
              if (verifyLimit(hour, collectionHour[i].value).hour) {
                collectionHour[i].click();
                setFormConfig({ ...formConfig, duration: moreTimeSeparator[0] + firstMin.value });
                const scrollToOptions = {
                  top: collectionHour[i].offsetTop - container[0].offsetTop,
                  behavior: 'smooth',
                };
                container[0].scrollTo(scrollToOptions);

                if (!verifyLimit(hour, targetValue).min) break;
              } else {
                collectionHour[i].classList.remove('bg-teal-800');
              }
            }
            alertHandler(1);
            container[1].scrollTo({ top: firstMin.scrollTop, behavior: 'smooth' });
            firstMin.click();
            setTimeout(() => alertHandler(0), 4000);
          } else {
            setFormConfig({ ...formConfig, duration: targetValue });
            durationCheck.classList.add('hidden');
            setCurrentBox(0);
          }
        };

        handleButtonClick()

      }} className="bg-sky-500 dark:bg-water-500  px-2 py-1 rounded-2xl sm:px-4 sm:py-2  ">Save</button></span>

    <ul className="moreTimeContainer overflow-auto h-40 sm:h-52 md:h-56">{timeConfig(60, 'min', moreTimeSeparator)}</ul></motion.div >][currentBox]
}


export const selectDuration = () => {
  const { drag, setDrag, dragAlertShow, dragAlertHandler, formConfig, setFormConfig } = useGlobalState()
  const container = document.querySelector('.durationContainer')
  const durationConfig = (d, e) => {
    if (verifyLimit(formConfig.hour, d).min) {
      dragAlertHandler(1)
      Array.from(container.childNodes).map((ele, y) => {
        if (ele.value == e.target.value) {
          setTimeout(() => {
            [...container.childNodes][y - 1].click()
          }, 500);
        }
      })

    } else dragAlertHandler(0)
    const draggable = document.querySelector('.draggable')
    draggable.textContent = e.target.value
    setFormConfig({ ...formConfig, duration: d })
    setDrag(e.target.offsetLeft)
    draggable.classList.remove('hidden')
  }

  const handleDrag = () => {
    const draggable = document.querySelector('.draggable')
    draggable.classList.add('duration-500')
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

  return <span className="durationContainer">
    <AlertBox msg={msg} toggleOpen={dragAlertHandler} isOpen={dragAlertShow} />
    <motion.button
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


      type="button" style={{ left: drag, translateY: '-50%', top: '50%' }} className={`justify-center flex items-center draggable duration-500 `}
    >15m</motion.button >

    <input type="button" className="chooseDuration cursor-pointer w-2/12 rounded-md" onClick={(e) => durationConfig(15, e)} value="15m" />
    <input type="button" className="chooseDuration cursor-pointer w-2/12 rounded-md" onClick={(e) => durationConfig(30, e)} value="30m" />
    <input type="button" className="chooseDuration cursor-pointer w-2/12 rounded-md" onClick={(e) => durationConfig(45, e)} value="45m" />
    <input type="button" className="chooseDuration cursor-pointer w-2/12 rounded-md" onClick={(e) => durationConfig(60, e)} value="1h" />
    <input type="button" className="chooseDuration cursor-pointer w-2/12 rounded-md" onClick={(e) => durationConfig(124, e)} value="2h" />
  </span>
}


export const tagColor = {
  Leisure: 'bg-emerald-300', Work: 'bg-red-300', Study: 'bg-cyan-300', Meal: 'bg-indigo-300', Commute: 'bg-amber-300',
  Chores: 'bg-rose-300', Break: 'bg-amber-300',
}


const gradientTag = {
  Leisure: 'from-emerald-300', Work: 'from-red-300', Study: 'from-cyan-300', Meal: 'from-indigo-300', Commute: 'from-amber-300',
  Chores: 'from-rose-300', Break: 'from-amber-300',
}

export const tagConfig = () => {
  const { formConfig, tags } = useGlobalState()
  const item = (ele, bg) => {
    const tag = { tag: ele, color: bg }
    return <span key={ele} className={`tagChoose ${bg} disabled`} onClick={(element) => {
      element.target.classList.toggle('disabled');
      formConfig.tag.some(e => e.tag == ele) ? formConfig.tag.splice(formConfig.tag.findIndex(e => e.tag == ele), 1) : formConfig.tag.push(tag)
    }}>

      <p onClick={(ele) => {
        ele.stopPropagation()
        ele.target.parentNode.click()
      }} className="bg-teal-700 dark:bg-water-800 cursor-pointer py-1 font-montserrat rounded-lg text-left px-3">{ele}</p>
    </span>
  }
  return <div className="flex flex-wrap xl:justify-between xl:p-5 2xl:w-2/3 2xl:self-center rounded-2xl mt-5 gap-x-5 p-3  bg-teal-600 dark:bg-water-600">
    {tags.map(ele => item(ele, tagColor[ele]))}
  </div >
}

export const handlerTag = (bgColor) => {
  const { chosenTag, setChosenTag, tags } = useGlobalState()

  const changeTag = (target) => {
    if (chosenTag == target) setChosenTag(null)
    else setChosenTag(target)
  }

  const items = () => {
    return tags.map(e => {
      return <span key={e} onClick={() => changeTag(e)} className={`font-montserrat 
       px-2 py-1 rounded-lg text-center bg-opacity-60 duration-500 ${chosenTag == e ? `shadow-b ${tagColor[e]} sm:bg-transparent` : ''} shadow-white`}>{e}</span>
    })
  }

  const variants = {
    open: { x: '7%', opacity: 1 },
    close: { x: '120%', },
  }
  const windowWidth = window.innerWidth
  const intermediateVariant = windowWidth >= 640 ? variants : {}
  return <motion.div
    variants={intermediateVariant}
    initial={{ x: windowWidth >= 640 ? 640 : 0 }}
    transition={{ type: "tween" }}
    animate={bgColor ? 'open' : 'close'}
    className={`hidden md:py-3 md:gap-x-3 xl:py-5 bg-gradient-to-l lg:pl-8 lg:gap-x-6 sm:flex flex-row pl-4 pr-14 to-teal-800 dark:to-sky-700  justify-center 
     flex-wrap rounded-l-lg
    ${gradientTag[chosenTag] ? gradientTag[chosenTag] : 'from-gray-300 dark:from-water-800'} bg-opacity-60 py-2
        `}>
    {items()}
  </motion.div>


}