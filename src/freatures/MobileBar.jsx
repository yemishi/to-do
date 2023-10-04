import { useGlobalState, weekDay } from "../App"
import { motion } from "framer-motion"
import { handlerTag } from "./store"


export default function MobileBar() {

    const { chosenDay, setChosenDay, showMobBar } = useGlobalState()
    const selectDay = () => {
        return weekDay.map(e => {
            const firstThree = e.substring(0, 3)
            return <input type="button" key={e} value={firstThree} onClick={() => setChosenDay(chosenDay == e ? null : e)}
                className={`${chosenDay == e ? 'opacity-100' : 'opacity-40'} px-2 py-1 duration-500 rounded-md bg-teal-800  `} />
        })
    }
    const variants = {
        show: { y: 0, display: 'flex' },
        close: { y: 170, display: 'hidden' }
    }
    return (
        <motion.div initial={{ y: 170 }} variants={variants}
            animate={showMobBar ? 'show' : 'close'}
            transition={{ type: "tween" }}
            className="sm:hidden pb-6 flex gap-y-10 flex-col px-9 justify-between absolute left-0 right-0 bg-teal-500 rounded-t-md bottom-0" >
            {handlerTag()}

            < span className="flex justify-between font-mono" >
                {selectDay()}
            </ span>

        </motion.div >
    )
}