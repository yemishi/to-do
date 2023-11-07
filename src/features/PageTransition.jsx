import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../App";

export default function PageTransition({ props }) {
    const { transitionState, setTransitionState } = useGlobalState()

    const { msg, status, route } = transitionState

    const navigate = useNavigate()

    const waitForMsg = async () => {
        if (msg) {
            if (route) navigate(route)
            setTransitionState(false)
            setVisible("hidden")
        } else {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            waitForMsg()
        }
    }

    const [visible, setVisible] = useState("hidden")
    const boxStyle = `text-2xl flex justify-center font-mono border-opacity-30 bg-opacity-25 border-y-2  py-6 w-full text-center  ${status == 200 ?
        " text-emerald-300 bg-emerald-900 border-emerald-800" : "text-red-300 bg-red-900 border-red-800 "}`
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            onAnimationStart={() => setVisible("flex")}
            onClick={() => { setTransitionState({ ...transitionState, isTransition: false }), navigate(route) }}
            onAnimationComplete={() => setTimeout(() => { waitForMsg() }, 3000)}
            transition={{ duration: 1 }}
            className={`w-full ${visible} flex z-20 items-center justify-center absolute h-full  left-0 top-0 backdrop-blur-xl backdrop-brightness-50`} >

            <motion.span initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className={boxStyle}>
                {msg ? <h1 className="w-3/5">{msg}</h1> : <div className="loader w-10 h-10" />}
            </motion.span>

        </motion.div >
    )
}