import { useGlobalState, weekDay } from "../App"
import { motion } from "framer-motion"
import { useState } from "react"
import moon from '../assets/imgs/moon.svg'
import sun from '../assets/imgs/sun.svg'

export default function MobileBar() {
    const [currentTagInfo, setCurrentTagInfo] = useState({ width: 0, left: 0 })
    const [darkModeMob, setDarkModeMob] = useState(document.documentElement.classList.contains('dark') ? true : false)
    const { chosenDay, setChosenDay, showMobBar, setMobBar, tags, chosenTag, setChosenTag } = useGlobalState()
    const selectDay = () => {
        return weekDay.map(e => {
            const firstThree = e.substring(0, 3)
            return <input type="button" key={e} value={firstThree} onClick={() => setChosenDay(chosenDay == e ? null : e)}
                className={`${chosenDay == e ? 'opacity-100' : 'opacity-40'} px-2 py-1 cursor-pointer duration-500 rounded-md bg-teal-800 dark:bg-water-900 `} />
        })
    }

    const handlerTagMob = () => {
        return tags.map(element => {
            return <span key={element} className="cursor-pointer"
                onClick={(e) => {
                    setCurrentTagInfo({ width: e.target.clientWidth, left: e.target.offsetLeft }),
                        setChosenTag(chosenTag == element ? null : element)
                }}>{element}</span>
        })
    }

    const variants = {
        show: { y: 0, display: 'flex' },
        close: { y: 170, display: 'hidden' }
    }
    return (
        <motion.div onClick={() => setMobBar(false)} className='backdrop-brightness-50 h-full w-full absolute left-0 top-0  items-end justify-center'
            initial={{ opacity: 0, display: 'none' }}
            animate={showMobBar ? { display: 'flex', opacity: 1 } : { display: 'none', opacity: 0 }}
        >
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: 170 }} variants={variants}
                animate={showMobBar ? 'show' : 'close'}
                transition={{ type: "tween" }}
                className="sm:hidden pb-6 pt-3 flex gap-y-10 flex-col px-9 justify-between  w-full left-0 right-0 bg-teal-500 dark:bg-water-700 rounded-t-md 
            bottom-0" >
                <span className="flex flex-row justify-between ">
                    {handlerTagMob()}
                    <p style={{ left: currentTagInfo.left, width: currentTagInfo.width }} className={`${chosenTag ? 'block' : 'hidden'} 
                 p-[0.55rem] duration-500 absolute border-y-2 pointer-events-none border-white `}></p>
                </span>
                <div className="w-full flex justify-center">

                    <span className={`toggleMob ${darkModeMob ? 'night' : ''}`}>
                        <svg className="notchMob" />
                        <img src={sun}alt="sun" className="w-5 cursor-pointer" onClick={() => {
                            document.documentElement.classList.remove('dark');
                            setDarkModeMob(false)
                            localStorage.theme = 'light';
                        }}  />
                        <img src={moon} alt="moon" className="w-5 cursor-pointer" onClick={(e) => {
                            setDarkModeMob(true)

                            localStorage.theme = 'dark';
                            document.documentElement.classList.add('dark');
                        }}  />
                    </span>
                </div>
                <span className="flex justify-between font-mono" >
                    {selectDay()}
                </span>
            </motion.div >
        </motion.div>
    )
}