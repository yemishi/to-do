import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import firstsvg from './assets/imgs/icons/animals/animal1.svg'
import { useGlobalState } from "./App";
import secoundsvg from './assets/imgs/icons/animals/animal2.svg'
import threesvg from './assets/imgs/icons/animals/animal3.svg'
export default function Sketch() {
  const [ima, setIma] = useState(firstsvg)
  const margins = ['p-5 -hue-rotate-60', 'rotate-45', 'rotate-90', '']
  const [count, setCount] = useState(3)

  const c = () => {
    console.log('siuuu')
  }

  const tags = () => {
    const tagArray = document.querySelectorAll('.x')
    console.log(tagArray)
    return <motion.svg className="x w-7 h-8 bg-lime-300" onClick={() => console.log(tagArray)} />
  }
  const buttonControls = useAnimation()
  return (
    <div className="left-0  flex-col top-0 absolute flex items-center justify-center bg-slate-800 w-screen h-screen">
      <div onClick={(e) => { console.log(e.target.getBoundingClientRect().left) }} className="flex gap-2 bg-slate-500 ">
        <motion.span className="w-6 h-full bg-amber-700" />
        <motion.span className="w-10 h-10 bg-teal-400" onClick={(e) => {
          e.stopPropagation()
          console.log(e.target.getBoundingClientRect().left)
        }} />

        <motion.span initial={{ x: -(475 - 395) }} animate={{ x: 0 }} className="w-5 h-10 bg-red-950" onClick={(e) => {
          e.stopPropagation()
          console.log(e.target.parentElement.getBoundingClientRect().left)
          console.log(e.target.getBoundingClientRect().left)
        }} />


        {/* Adicione mais elementos aqui conforme necessário */}
      </div>
      {tags()}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 100, transition: { duration: 1 } }}
        exit={{ opacity: 0, y: -100, x: 100 }}

        className="text-center overflow-auto  bg-slate-600 relative p-10  rounded-xl flex items-center flex-col justify-center"
        style={{ fontSize: 100 }}
        key={ima}
      >

        <motion.img
          src={ima} className={`w-44   draggable  ${margins[count]}`}
          drag
          dragConstraints={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
          onDrag={(e, y) => {
            const button = [...document.querySelectorAll('.dragButton')]
            const drag = document.querySelector('.draggable')
            console.log(drag.getBoundingClientRect().left)
            const dragrect = drag.getBoundingClientRect()
            button.map(e => {
              const buttonrect = e.getBoundingClientRect()
              if (
                dragrect.right >= buttonrect.left &&
                dragrect.left <= buttonrect.right &&
                dragrect.bottom >= buttonrect.top &&
                dragrect.top <= buttonrect.bottom
              ) {
                e.click()
                buttonControls.start({
                  backgroundColor: "green",
                });

              } else {

                buttonControls.start({
                  backgroundColor: "blue",
                })
              }
            })
          }

          }
          onDragStartCapture={(e, i) => console.log(e, i)}
          onDragEnd={(e, i) => {
            if (i.offset.x < -200) {
              c()
            }

          }}
          alt="" />
        <motion.button animate={buttonControls} className="dragButton" onClick={(e) => setCount(0)}>3</motion.button>
      </motion.div>
      <div className="bg-gray-500 ">AAAAA</div>


    </div >
  )
}