import { motion, AnimatePresence } from 'framer-motion'
import checked from '../assets/imgs/checked.svg'
import cancel from '../assets/imgs/cancel.svg'


export default function Button({ props }) {
  return <motion.button
    transition={{ type: "spring", damping: 10, stiffness: 200 }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    className="justify-self-end bg-teal-600 w-11 h-11 flex justify-center items-center rounded-lg"
    onClick={props.action}
  >
    <img src={props.icon[0]} alt={props.icon[1]} className='w-5' />
  </motion.button>
}

