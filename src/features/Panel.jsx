
import React, { useEffect, useState } from "react";
import perfilSvg from "../assets/imgs/perfil.svg"
import axios from "axios";
import Button from "./FormToolkit";
import { motion } from "framer-motion";

export default function Panel() {
    const [darkMode, setDarkMode] = useState("")
    const [isProfile, setIsProfile] = useState(false)

    useEffect(() => {
        setDarkMode(document.documentElement.classList.contains('dark') ? 'night' : '')
    }, [])

    const handlerTheme = () => {

        const doc = document.documentElement;
        if (doc.classList.contains('dark')) {
            doc.classList.remove('dark');
            localStorage.setItem("theme", 'light');
            setDarkMode('')
        } else {
            doc.classList.add('dark');
            localStorage.setItem("theme", 'dark');
            setDarkMode('night')
        }
    }
    const toggleTheme = <div className={`toggle relative m-0  hidden sm:flex ${darkMode}`}
        onClick={handlerTheme}>
        <span className={`w-10 notch absolute rounded-full h-10`} />
        <span>
            <svg className="cloud sm" />
            <svg className="cloud sm" />
            <svg className="cloud md" />
            <svg className="cloud lg" />
        </span>
    </div>

    const logout = async () => {
        try {
            await axios.post("https://node-mongodb-api-5wtv.onrender.com/logout")

        } catch (error) {
            console.log(error)
        }

    }

    return (

        <div className="flex relative">
            <Button props={{ icon: perfilSvg, alt: "profile", action: () => setIsProfile(true) }} />
            <motion.div className="bg-water-800 absolute p-5">
                {toggleTheme}

                <p onClick={logout} className="text-red-300">test</p>

            </motion.div>
        </div>
    )
}