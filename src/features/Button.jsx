import { motion } from 'framer-motion'
import checked from "../assets/imgs/checked.svg"

const checkVariant = {
  saveBottom: { show: { opacity: 1, bottom: 0 }, close: { opacity: 0, bottom: '-10%' } },
  saveTop: { show: { opacity: 1, x: 0 }, close: { x: -90, opacity: 0 } }
}

const labelVariants = {
  up: { y: 0, filter: "grayscale(100%) brightness(200%)", opacity: 0.5 },
  down: {
    y: -20,filter: "grayscale(0%) brightness(100%)", opacity: 1,
  }
}

export default function Button({ props }) {
  return <motion.button
    transition={{ type: "spring", damping: 10, stiffness: 200 }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    className="justify-self-end bg-teal-500 dark:bg-water-600  p-2 flex justify-center items-center rounded-lg"
    onClick={props.action}
  >
    <img className={`w-4 sm:w-6 md:w-8 xl:w-10 ${props.icon[1] == 'delete' || props.icon[1] == 'confirm' ? '' : 'hover:rotate-180'} 
     duration-300`} src={props.icon[0]} alt={props.icon[1]} />
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
    animate={props.formConfig.weekDay.length > 0 ? 'show' : 'close'}
    variants={checkVariant.saveBottom}
    onClick={props.action}

    className={`fixed mb-4 py-2 font-extrabold ${props.formConfig.bg} 
text-base md:text-lg md:py-3 lg:py-4 lg:text-xl xl:py-5 xl:text-2xl 2xl xl z-0 font-title rounded-3xl w-2/4 left-2/4 -translate-x-2/4`} >save</motion.button>
}

export function ButtonSaveT({ props }) {
  return <motion.button
    transition={{ type: "spring", damping: 10, stiffness: 200 }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    initial={{ x: -90 }}
    animate={props.formConfig.weekDay.length > 0 ? 'show' : 'close'}
    variants={checkVariant.saveTop}
    className="bg-teal-500 dark:bg-water-600  p-2 flex justify-center items-center rounded-lg"
    onClick={props.action}>
    <img src={checked} className="w-4 sm:w-6 md:w-8  xl:w-10" alt="confirm" />
  </motion.button>
}

export function InputName({ props }) {
  return <span className="flex flex-col mb-10 mt-3 relative items-center duration-500 font-bold">
    <motion.label
      initial={'up'}
      variants={labelVariants} animate={props.formConfig.name ? 'down' : 'up'} htmlFor="nameEvent"
      className="w-6/12 text-teal-400 dark:text-water-400 md:w-2/6  lg:w-1/4 py-2 absolute ">name</motion.label>
     
    <input name="name" id="nameEvent" onChange={(e) => { props.setFormConfig({ ...props.formConfig, name: e.target.value }) }}
      type="text" placeholder={props.formConfig.name ? props.formConfig.name : ''}
      className="px-1 hover:cursor-text py-2 hover:scale-x-105 bg-transparent border-b-2 duration-500 cursor-default
       focus:border-green-500 dark:focus:border-water-400 outline-none w-6/12 md:w-2/6 lg:w-1/4 self-center "
    />
  </span >
}