import goback from "../assets/imgs/goback.svg"
import checked from "../assets/imgs/checked.svg"
import { useGlobalState } from '../App'
import { useRef, useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import paw from '../assets/imgs/icons/paw.svg'
import light from '../assets/imgs/icons/light.svg'
import ramen from '../assets/imgs/icons/ramen.svg'
import smiley from '../assets/imgs/icons/smiley.svg'
import walking from '../assets/imgs/icons/walking.svg'
import flag from '../assets/imgs/icons/flag.svg'
import car from "../assets/imgs/icons/car.svg"

const animalsFile = Object.values(import.meta.globEager(`../assets/imgs/icons/animals/*.png`)).map(e => e.default)
const emojisFIle = Object.values(import.meta.globEager(`../assets/imgs/icons/emojis/*.png`)).map(e => e.default)
const foodFile = Object.values(import.meta.globEager(`../assets/imgs/icons/foods/*.png`)).map(e => e.default)
const routineFile = Object.values(import.meta.globEager(`../assets/imgs/icons/routine/*.png`)).map(e => e.default)
const ideaFile = Object.values(import.meta.globEager(`../assets/imgs/icons/idea/*.png`)).map(e => e.default)
const flagsFile = Object.values(import.meta.globEager(`../assets/imgs/icons/flags/*.png`)).map(e => e.default)
const travelFile = Object.values(import.meta.globEager(`../assets/imgs/icons/travel/*.png`)).map(e => e.default)


const iconsArray = {
  idea: ideaFile,
  animals: animalsFile,
  smiley: emojisFIle,
  foods: foodFile,
  routine: routineFile,
  travel: travelFile,
  flags: flagsFile
}

const iconsArrayControl = {
  animals: paw,
  routine: walking,
  foods: ramen,
  smiley: smiley,
  idea: light,
  travel: car,
  flags: flag
}

const entryCollection = Object.values(iconsArray)[0]
export const randomIcon = entryCollection[Math.floor(Math.random() * entryCollection.length)]
const foundEntry = Object.entries(iconsArray).find(([_, value]) => value === entryCollection)[0]
const fromBottomVariants = {
  open: {
    display: 'flex',
    y: 0,
  },
  closed: {
    y: '100%',
    display: 'none'
  }
}
const bgs = ['bg-emerald-400', 'bg-amber-300', 'bg-amber-200', 'bg-orange-300', 'bg-sky-300', 'bg-cyan-500', 'bg-cyan-400', 'bg-cyan-300', 'bg-rose-300',
  'bg-violet-400', 'bg-emerald-500', 'bg-amber-500', 'bg-emerald-300', 'bg-indigo-400', 'bg-indigo-300', 'bg-blue-400',
  'bg-sky-400', 'bg-teal-400', 'bg-red-300', 'bg-red-400', 'bg-pink-300', 'bg-purple-400', 'bg-purple-300'
]




const demo = (type) => {
  const { formConfig, setFormConfig, setBundleIcon, setBundleColor } = useGlobalState()
  const verifyType = {
    icon: formConfig.demo.icon == formConfig.icon || formConfig.demo.icon == '',
    color: formConfig.demo.bg == formConfig.bg || formConfig.demo.bg == '',
  }

  const variantTurnBack = {
    show: { opacity: 1, cursor: 'pointer' },
    close: {
      rotate: '630deg', opacity: 0, transitionEnd: {
        transition: { duration: 0 }, cursor: 'default',
      }
    }
  }
  return <div className="w-full">
    <div className="flex px-4 self-end justify-between items-center">

      <motion.button
        className="justify-self-end bg-teal-500 dark:bg-water-600 p-2 flex justify-center items-center rounded-lg"
        variants={variantTurnBack} animate={verifyType[type] ? 'close' : 'show'}
        transition={{ type: "spring", damping: 10, stiffness: 200 }} whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={(e) => {
          e.preventDefault(), setFormConfig({
            ...formConfig, demo: {
              ...formConfig.demo, icon: formConfig.icon,
              bg: formConfig.bg
            }
          })
        }} >
        <img src={goback} className="w-4 hover:rotate-180 duration-300 sm:w-6 md:w-8 xl:w-10" alt="reset" />
      </motion.button>

      <h3>{`Select ${type}`}</h3>

      <Button props={{
        icon: [checked, 'confirm'], action: (e) => {
          e.preventDefault(), setBundleIcon(false), setBundleColor(false), setFormConfig({
            ...formConfig, icon: formConfig.demo.icon ? formConfig.demo.icon : formConfig.icon,
            bg: formConfig.demo.bg ? formConfig.demo.bg : formConfig.bg
          })
        },
      }} />

    </div>

    <div className="flex w-full justify-center">

      <AnimatePresence mode='wait'>
        <motion.img
          key={formConfig.demo.icon ? formConfig.demo.icon : formConfig.bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, }}
          className={`w-16 sm:w-20 md:w-24  xl:w-28 p-3 rounded-2xl duration-500 ${formConfig.demo.bg ? formConfig.demo.bg : formConfig.bg}`}
          src={formConfig.demo.icon ? formConfig.demo.icon : formConfig.icon} alt="icon" />
      </AnimatePresence>

    </div>

  </div>
}


const demoStyle = `bg-teal-700 cursor-pointer border-2 border-teal-500 gap-4 flex items-center p-2 sm:p-4 lg:p-6 rounded-xl 
dark:bg-water-600 dark:border-water-700`

export const selectedIcon = () => {
  const { formConfig, setBundleIcon, setBundleColor } = useGlobalState()

  return (

    <div className='grid grid-cols-2 text-base font-title mb-7 gap-6 items-center md:text-lg sm:px-12 lg:px-32 xl:px-44 lg:text-xl'>

      <span onClick={(e) => { e.stopPropagation(), setBundleIcon(true) }} className={demoStyle}>
        <img src={formConfig.icon} alt="icon"
          className={`p-2 w-9 lg:w-16 sm:w-12 md:w-14 duration-500 rounded-xl ${formConfig.bg ? formConfig.bg : formConfig.demo.bg} `} />
        <p>icon</p>
      </span>

      <span onClick={() => setBundleColor(true)} className={demoStyle}>
        <span className='flex items-center h-9 sm:h-12 lg:h-16 p-2 md:h-14 justify-center rounded-xl bg-teal-600 dark:bg-water-800'>
          <svg className={`rounded-full h-6 w-6 sm:w-10 sm:h-9 lg:w-12 lg:h-12 md:h-10 md:w-10 duration-500 ${formConfig.bg ? formConfig.bg : bgs[3]}`} />
        </span>
        <p>color</p>
      </span>
    </div>
  )
}


export const configIcon = () => {

  const [nameCollection, setNameCollection] = useState(foundEntry)
  const [borderPosition, setBorderPosition] = useState()
  const { formConfig, setFormConfig, bundleIcon, setBundleIcon } = useGlobalState()

  const iconW = 'sm:w-10 md:w-12 lg:w-14 xl:w-16 2xl:w-20'
  return <motion.div
    onClick={() => setBundleIcon(false)}
    initial={{ display: 'none' }}
    animate={bundleIcon ? { display: 'flex', opacity: 1 } : { display: 'none', opacity: 0 }}

    className="bg-opacity-50 z-20 items-end backdrop-brightness-50 h-full absolute bottom-0 left-0 right-0">
    <motion.div
      onClick={(e) => e.stopPropagation()}
      transition={{ type: "tween" }}
      animate={bundleIcon ? 'open' : 'closed'}
      variants={fromBottomVariants}
      className="flex gap-y-5  rounded-2xl w-full flex-col bg-teal-600 dark:bg-water-700 items-center ">
      {demo('icon')}

      <div className="gap-2 flex flex-col w-full rounded-lg relative bg-teal-600 dark:bg-water-700">

        <nav className='flex justify-between bg-teal-600 dark:bg-water-700 relative p-1 shadow-md'>

          {Object.keys(iconsArray).map(key => {
            return <img key={key} className={`w-8 hover:opacity-100 cursor-pointer p-2 md:w-9 lg:w-10 xl:w-11 2xl:w-12  ${nameCollection !== key ? 'opacity-50' : ''} duration-500`} onClick={(e) => {
              setNameCollection(key),  setBorderPosition(e.target.offsetLeft)
            }} src={iconsArrayControl[key]} />
          })}
          <span style={{ left: borderPosition }} className={`w-8 p-2 duration-500 md:w-9 lg:w-10 xl:w-11 2xl:w-12 absolute h-0
           border-b-2 border-white bottom-0`} />

        </nav>

        <ul className='flex after:flex-auto justify-between h-72 overflow-scroll flex-wrap '>

          {iconsArray[nameCollection].map(e =>
            <AnimatePresence key={e} mode="wait">
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='p-2'>
                <img className={`${iconW} sm:p-2 w-6 md-p3 cursor-pointer active:scale-90 duration-500 rounded-md hover:opacity-70`}
                  src={e} alt="icon" onClick={() => setFormConfig({ ...formConfig, demo: { ...formConfig.demo, icon: e } })} />
              </motion.li>
            </AnimatePresence>)}
        </ul>
      </div>

    </motion.div >
  </motion.div>

}


export const chooseBgColor = () => {
  const { formConfig, setFormConfig, bundleColor, setBundleColor } = useGlobalState()
  return <motion.div className="bg-opacity-50 z-20 items-end backdrop-brightness-50 h-full absolute bottom-0 left-0 right-0"
    onClick={() => setBundleColor(false)}
    initial={{ display: 'none' }}
    animate={bundleColor ? { display: 'flex', opacity: 1 } : { display: 'none', opacity: 0 }}
  >
    <motion.div onClick={(e) => e.stopPropagation()}
      className="flex gap-y-5 rounded-2xl w-full flex-col bg-teal-600 dark:bg-water-700 items-center"
      transition={{ type: "tween" }}
      animate={bundleColor ? 'open' : 'closed'}
      variants={fromBottomVariants}
    >

      {demo('color')}
      <span className="flex after:flex-auto justify-between flex-wrap gap-2"  >
        {bgs.map(ele => <svg key={ele}
          className={`${ele} cursor-pointer rounded-full duration-300 hover:scale-110 active:scale-90 w-12 h-12`}
          onClick={() => { setFormConfig({ ...formConfig, demo: { ...formConfig.demo, bg: ele } }) }} />)}
      </span>
    </motion.div>
  </motion.div>
}