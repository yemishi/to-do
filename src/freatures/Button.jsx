import { motion } from 'framer-motion'



export default function Button({ props }) {
  return <motion.button
    transition={{ type: "spring", damping: 10, stiffness: 200 }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    className="justify-self-end bg-teal-600 p-2 flex justify-center items-center rounded-lg"
    onClick={props.action}
  >
    <img className={`w-4 sm:w-6 md:w-8  xl:w-10 ${props.icon[1] == 'delete' || props.icon[1] == 'confirm' ? '' : 'hover:rotate-180'} 
     duration-300`} src={props.icon[0]} alt={props.icon[1]} />
  </motion.button>
}

