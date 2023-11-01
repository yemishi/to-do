import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function PageTransition({ props }) {
    const { title, route } = props
    const navigate = useNavigate()
    const [visible, setVisible] = useState("hidden")
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1
            }}
            onAnimationStart={() => setVisible("flex")}
            onAnimationComplete={(e) => {
                setTimeout(() => {
                    navigate("")
                }, 2000)
            }}
            transition={{ duration: 3 }}
            className={`w-full  ${visible} items-center justify-center absolute h-full left-0 top-0 backdrop-blur-xl backdrop-brightness-50`} >
            <h1>{title}</h1>

        </motion.div >
    )
}