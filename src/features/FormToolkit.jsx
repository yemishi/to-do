import { motion } from 'framer-motion'
import checked from "../assets/imgs/checked.svg"
import { useRef } from 'react'

const checkVariant = {
  saveBottom: { show: { opacity: 1, bottom: 0 }, close: { opacity: 0, bottom: '-10%' } },
  saveTop: { show: { opacity: 1, x: 0 }, close: { x: -90, opacity: 0 } }
}

const labelVariants = {
  up: { y: 0, filter: "grayscale(100%) brightness(200%)", opacity: 0.5 },
  down: {
    y: -20, filter: "grayscale(0%) brightness(100%)", opacity: 1,
  }
}

export default function Button({ props }) {
  const { icon, rotate, alt, action } = props
  return <motion.button
    transition={{ type: "spring", damping: 10, stiffness: 200 }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    className="justify-self-end bg-teal-500 dark:bg-water-600  p-2 flex justify-center items-center rounded-lg"
    onClick={action}
  >
    <img className={`w-4 sm:w-6 md:w-8 xl:w-10 ${rotate ? 'hover:rotate-180' : ''} 
     duration-300`} src={icon} alt={alt} />
  </motion.button>
}
export function ButtonSaveB({ props }) {
  return <motion.button
    transition={{
      type: "spring",
      damping: 10,
      stiffness: 50,
      duration: 1

    }}
    initial={{ bottom: '-10%' }}
    animate={props.formValues.weekDay.length > 0 ? 'show' : 'close'}
    variants={checkVariant.saveBottom}
    onClick={props.action}

    className={`fixed mb-4 py-2 font-extrabold ${props.formValues.bg} 
text-base md:text-lg md:py-3 lg:py-4 lg:text-xl xl:py-5 xl:text-2xl 2xl xl z-0 font-title rounded-3xl w-2/4 left-2/4 -translate-x-2/4`} >save</motion.button>
}

export function ButtonSaveT({ props }) {
  return <motion.button
    transition={{ type: "spring", damping: 10, stiffness: 200 }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    initial={{ x: -90 }}
    animate={props.formValues.weekDay.length > 0 ? 'show' : 'close'}
    variants={checkVariant.saveTop}
    className="bg-teal-500 dark:bg-water-600  p-2 flex justify-center items-center rounded-lg"
    onClick={props.action}>
    <img src={checked} className="w-4 sm:w-6 md:w-8  xl:w-10" alt="confirm" />
  </motion.button>
}

export function Input({ props }) {

  const { formValues, setFormValues, element, type } = props

  return <span className={`flex flex-col relative duration-500 font-bold`}>
    <motion.label
      initial={'up'}
      variants={labelVariants} animate={formValues[element] ? 'down' : 'up'} htmlFor="nameEvent"
      className="text-teal-400 z-0 dark:text-water-400 py-2  absolute"
    >{element}</motion.label>


    <input onChange={(e) => setFormValues({ ...formValues, [element]: e.target.value })}
      type={type} placeholder={formValues[element]} name={element}
      className={` ${formValues[element] ? "pb-0" : "pb-2"} inputStyle`}
    />
  </span >
}