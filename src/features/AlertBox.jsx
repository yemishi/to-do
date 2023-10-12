import { motion } from 'framer-motion'
export default function AlertBox({ msg, isOpen, toggleOpen }) {

  const divVariant = {
    open: { opacity: 1, display: 'flex', y: 0 }, closed: {
      opacity: 0, transitionEnd: { display: 'none' }
    }
  }

  return (
    <>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={isOpen == 1 ? 'open' : 'closed'} onClick={() => toggleOpen(0)} variants={divVariant}
        className='absolute left-0 right-0 z-10 bottom-0 backdrop-blur-sm rounded-lg items-center flex  
        justify-center backdrop-brightness-50 w-full h-full'>
        <p className='leading-10 text-2xl rounded-xl font-montserrat font-extrabold text-white w-6/12 text-center '>{msg}</p>
      </motion.div>
    </>
  )
}