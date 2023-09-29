import defaultIcon from '../assets/imgs/icons/lifestyle/lifestyle15.svg'
import goback from "../assets/imgs/goback.svg"
import checked from "../assets/imgs/checked.svg"
import { useGlobalState } from '../App'
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

const bgs = ['bg-amber-400', 'bg-amber-300', 'bg-amber-200', 'bg-orange-300', 'bg-sky-300', 'bg-cyan-500', 'bg-cyan-400', 'bg-cyan-300', 'bg-rose-300',
  'bg-violet-400', 'bg-emerald-500', 'bg-emerald-400', 'bg-emerald-300', 'bg-indigo-400', 'bg-indigo-300', 'bg-blue-400',
  'bg-sky-400', 'bg-teal-400', 'bg-red-300', 'bg-red-400', 'bg-pink-300', 'bg-purple-400', 'bg-purple-300'
]

export const selectedIcon = () => {
  const { formConfig } = useGlobalState()
  const scrollToContainer = () => document.querySelector('.iconsContainer').scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  return (
    <div className='flex justify-center mb-7 gap-6 items-center'>
      <span onClick={scrollToContainer} className='bg-teal-700 border-2 border-teal-500 gap-4 flex items-center w-60 p-2 rounded-xl'>
        <img src={formConfig.icon ? formConfig.icon : defaultIcon} alt="icon" className={`p-2 duration-500 w-16 rounded-xl ${formConfig.bg ? formConfig.bg : formConfig.demo.bg} `} />
        <h4 className='font-title font-bold text-xl'>icon</h4>
      </span>

      <span onClick={scrollToContainer} className='bg-teal-700 border-2 border-teal-500 gap-4 flex items-center w-60 p-2 rounded-xl'>
        <span className='w-[64px] h-[64px] flex items-center justify-center rounded-xl bg-teal-600'>
          <svg width="47" height="47" className={`rounded-full duration-500 ${formConfig.bg ? formConfig.bg : bgs[3]}`} />
        </span>
        <h4 className='font-title font-bold text-xl'>color</h4>
      </span>
    </div>)
}


export const configIcon = () => {
  const [icons, setIcons] = useState([])
  const { formConfig, setFormConfig } = useGlobalState()
  useEffect(() => {
    const dynamicImport = async () => {
      const allSvgs = []
      try {
        for (let i = 1; i <= 22; i++) {
          const importeEmoji = await import(`../assets/imgs/icons/emojis/emoji${i}.svg`);
          const importedAnimals = await import(`../assets/imgs/icons/animals/animal${i}.svg`);
          const importeThings = await import(`../assets/imgs/icons/things/thing${i}.svg`);
          const importeFoods = await import(`../assets/imgs/icons/foods/food${i}.svg`);
          const importeLifestyle = await import(`../assets/imgs/icons/lifestyle/lifestyle${i}.svg`);
          allSvgs.push(importedAnimals.default, importeThings.default, importeEmoji.default, importeLifestyle.default, importeFoods.default)
        }
      }
      catch (error) {
        console.warn(error)
      }
      setIcons(allSvgs)
    }
    dynamicImport()
  }, [])
  const variantsGoback = {
    show: { opacity: 1, cursor: 'pointer' },
    close: {
      rotate: '630deg', opacity: 0, transitionEnd: {
        transition: { duration: 0 }, cursor: 'default',
      }
    }
  }

  return <div className="flex px-4 iconsContainer rounded-2xl flex-col bg-gradient-to-b from-teal-700 to-teal-500 items-center ">
    <div className="flex w-full self-end justify-between items-center">

      <motion.button
        variants={variantsGoback}
        animate={((formConfig.demo.bg == formConfig.bg && formConfig.demo.icon == formConfig.icon) || (formConfig.demo.bg == '' &&
          formConfig.demo.icon == '')) ? 'close' : 'show'}
        transition={{ type: "spring", damping: 10, stiffness: 200 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={(e) => {
          e.preventDefault(), setFormConfig({
            ...formConfig, demo: {
              ...formConfig.demo, icon: formConfig.icon,
              bg: formConfig.bg
            }
          })
        }}
        className="justify-self-end bg-teal-600 w-11 h-11   flex justify-center items-center rounded-lg">
        <img src={goback} className="w-8" alt="goback" /></motion.button>
      <h3 className="text-2xl">Selected</h3>

      <Button props={{
        icon: [checked, 'confirm'], action: (e) => {
          e.preventDefault(), setFormConfig({
            ...formConfig, icon: formConfig.demo.icon ? formConfig.demo.icon : formConfig.icon,
            bg: formConfig.demo.bg ? formConfig.demo.bg : formConfig.bg
          })
        },
      }} />

    </div>
    <p onClick={() => console.log(formConfig)}>AAA</p>
    <div className="flex w-full justify-center">
      <AnimatePresence mode='wait'>
        <motion.img
          key={formConfig.demo.icon ? formConfig.demo.icon : formConfig.bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, }}
          className={`w-28 p-3 rounded-xl duration-500 ${formConfig.demo.bg ? formConfig.demo.bg : formConfig.bg}`}
          src={formConfig.demo.icon ? formConfig.demo.icon : formConfig.icon} alt="icon" />
      </AnimatePresence>

    </div>
    <h3 className=" w-9/12 pl-4 self-center">Color</h3>
    <span className="flex flex-wrap  gap-2 w-9/12 justify-center" >
      {bgs.map(ele => <svg key={ele}

        className={`${ele} cursor-pointer rounded-full duration-300 hover:scale-110 active:scale-90`}
        onClick={() => { setFormConfig({ ...formConfig, demo: { ...formConfig.demo, bg: ele } }) }} width="50" height="50" />)}
    </span>

    <h3 className="self-start mb-4">Icons</h3>

    <ul className="gap-2  rounded-lg relative h-72 overflow-scroll  grid sm:grid-cols-9 md:grid-cols-10">
      {icons.map(e =>
        <li key={e}
        ><img className="sm:p-2 md:p-3 cursor-pointer active:scale-90 duration-500 rounded-md hover:opacity-70 bg-teal-500"
          src={e} alt="icon" onClick={() => setFormConfig({ ...formConfig, demo: { ...formConfig.demo, icon: e } })} /></li>)}
    </ul>

  </div >

}