import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../App"
import React, { useState } from "react"
import { Input } from "../features/FormToolkit.jsx"
import { motion } from "framer-motion"
import axios from "axios"

import PageTransition from "../features/PageTransition"

export default function Login() {
    localStorage.clear()
    const { setTask } = useGlobalState()
    const initialValues = { name: localStorage.name, password: localStorage.password }
    const initialRegister = { name: "", password: "", email: "", checkPass: "" }

    const [formRegister, setFormRegister] = useState(initialRegister)
    const [formValues, setFormValues] = useState(initialValues)
    const [props, setProps] = useState({})

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [saveLogin, setSaveLogin] = useState(false)
    const [toTransition, setToTransition] = useState(false)

    const [formErrors, setFormErrors] = useState({})
    const [resetPass, setResetPass] = useState(false)
    const [showSign, setShowSign] = useState(true)

    const validate = (v) => {
        const errors = {};

        const validatePassword = (password) => {
            const uppercaseRegex = /[A-Z]/;
            const lowercaseRegex = /[a-z]/;
            const numberRegex = /[0-9]/;
            const lengthRegex = /^.{7,}$/;

            if (!lengthRegex.test(password)) {
                return "Password must be at least 7 characters long.";
            }
            if (!uppercaseRegex.test(password)) {
                return "Password must contain at least one uppercase letter.";
            }
            if (!lowercaseRegex.test(password)) {
                return "Password must contain at least one lowercase letter.";
            }
            if (!numberRegex.test(password)) {
                return "Password must contain at least one number.";
            }

            return null;
        };

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!email) {
                return "The field email can't be empty";
            }
            if (!emailRegex.test(email)) {
                return "Incorrect email";
            }
            return null;
        };

        if (!v.name) {
            errors.name = "The field name can't be empty";
        }

        if (!v.email) {
            errors.email = validateEmail(v.email);
        }

        if (!v.password) {
            errors.password = "The field password can't be empty";
        } else {
            const passwordError = validatePassword(v.password);
            if (passwordError) {
                errors.password = passwordError;
            }
        }

        if (!v.checkPass) {
            errors.checkPass = "The field confirm password can't be empty";
        } else if (v.checkPass !== v.password) {
            errors.checkPass = "The confirm password doesn't match the password";
        }

        setFormErrors(errors);
    };


    const handleLogin = async (e) => {
        e.preventDefault()

        if (formValues.name && formValues.password) {
            try {
                const { name, password } = formValues
                const res = await axios.post('https://node-mongodb-api-5wtv.onrender.com/login', { name, password })
                console.log(res)
                const { data, status } = await res.response
                const { msg, content } = data

                localStorage.name = formValues.name
                localStorage.password = formValues.password

                if (!saveLogin) {
                    window.addEventListener('beforeunload', () => {
                        localStorage.removeItem(password)
                        localStorage.removeItem(name);
                    });
                }
                await setTask(content)
                setProps({ msg, status, route: "/home" })
                setToTransition(true)

            } catch (error) {
                const { msg } = await error.response.data
                setFormErrors({ ...formErrors, data: msg })
            }

        } else {
            setFormErrors({ ...formErrors, data: "All fields need to be filled in" })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        validate(formRegister)
        console.log(Object.values(formErrors).length)
        if (Object.values(formErrors).length === 0) {
            try {
                const { name, email, password } = formRegister
                const res = await axios.post('https://node-mongodb-api-5wtv.onrender.com/register', { name, email, password })

                const { data, status } = res
                console.log(data.msg, status)
                setProps({ msg: data.msg, status })
                setToTransition(true)
                setTimeout(() => setToTransition(false), 4000)
            } catch (error) {
                console.log(error)
            }
        } else console.log(formErrors)

    }
    const formVariants = {
        show: { top: "0%", borderRadius: "0", backgroundColor: "rgb(39 100 129 / 0%)", transitionEnd: { height: "auto" } },
        close: { top: "-100%", borderRadius: "150px 150px 0 0", transitionEnd: { backgroundColor: "#276481", top: "90%", height: "100%" } }
    }

    const handlerResetPass = async () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formValues.email) {
            setFormErrors({ ...formErrors, data: "The field email can't be empty" });
        } else if (!regex.test(formValues.email)) {
            setFormErrors({ ...formErrors, data: "Incorrect email" })
        } else {
            try {

                const res = await axios.post(`https://node-mongodb-api-5wtv.onrender.com/forgotPassword/${formValues.email}`)
                console.log('aaaaa')
                const { data, status } = res.response
                setProps({ msg: data.msg, status })

                setToTransition(true)
                setTimeout(() => setToTransition(false), 6000)
                setResetPass(false)
            } catch (error) {
                setFormErrors({ ...formErrors, data: error.response.data.msg })
            }
        }
    }


    const resetPassVariants = {
        showF: { display: "flex", opacity: 1 },
        closeF: { opacity: 0, transitionEnd: { display: "none" } },
        showD: { display: "flex", top: 0 },
        closeD: { opacity: 0, top: "-100%" }
    }

    const errorStyle = "text-red-400"

    return (
        <div className="w-full h-full flex justify-center items-center  absolute left-0 top-0">
            {toTransition ? <PageTransition props={props} /> : null}
            <div className="relative shadow-3xl overflow-hidden bg-gradient-to-b h-[32rem] w-[22rem] shadow-black">

                <motion.div onClick={() => setResetPass(false)} animate={resetPass ? "showF" : "closeF"} variants={resetPassVariants}
                    className="backdrop-blur-md absolute h-full z-20 w-full left-0 right-0">
                    <motion.div onClick={(e) => e.stopPropagation()} animate={resetPass ? "showD" : "closeD"} variants={resetPassVariants}
                        className="z-10 w-full font-montserrat bg-[#1e507975] rounded-b-3xl absolute
                        flex items-center flex-col justify-center left-0">
                        <span className="flex items-center px-8 gap-5">
                            <span className=" p-0 mb-5  ">
                                <Input props={{ formValues, setFormValues, type: "text", element: "email" }} />
                                <p className={`${errorStyle} `}>{formErrors.data}</p>
                            </span>
                            <button onClick={handlerResetPass} className="bg-[#054d7d] font-mono px-2 py-1 rounded-lg">Send</button>
                        </span>
                    </motion.div>

                </motion.div>
                <motion.form animate={showSign ? "show" : "close"} variants={formVariants} transition={{ duration: 0.5 }}
                    className="absolute pt-5 gap-4 font-montserrat flex w-full flex-col items-center rounded-lg">

                    <h1 className={showSign ? "text-2xl" : "text-xl"} onClick={() => { setShowSign(true), setFormErrors({ ...formErrors, data: false }) }}>Login in</h1>

                    <span className="mt-4">
                        <Input props={{ formValues, setFormValues, type: "text", element: "name" }} />
                    </span>

                    <div className="flex flex-col items-center">

                        <span className={`duration-300 ${passwordVisible ? "passLightOn rounded-b-2xl" : ""}`}>
                            <Input props={{ formValues, setFormValues, type: passwordVisible ? "text" : "password", element: "password" }} /></span>

                        <span className={`w-8 h-2 border border-t-0 z-10 bg-gradient-to-t cursor-pointer duration-500 border-l ${passwordVisible ? "from-red-700 to-yellow-500 border-yellow-500" :
                            "from-red-400 to-transparent border-yellow-600"} relative rounded-b-xl`}
                            onClick={() => setPasswordVisible(!passwordVisible)} >
                        </span>

                    </div>

                    <div className="flex w-6/12 flex-col text-xs gap-4 my-4 items-center ">

                        <p onClick={() => setSaveLogin(!saveLogin)} className={`cursor-pointer self-end font-mono bg-gradient-to-t
                         from-cyan-400 to-50% p-1 px-2 rounded-xl hover:brightness-75 ${saveLogin ? "brightness-100" : "brightness-50"} duration-500`}>
                            Remember me
                        </p>
                    </div>

                    <button onClick={handleLogin} className="backdrop-brightness-125 hover:backdrop-brightness-200 duration-500  rounded-lg py-1 px-7 mt-3">Login</button>

                    <p className=" text-red-300 mt-5 cursor-pointer" onClick={() => { setFormErrors({}), setResetPass(true) }}>Forgot Password ?</p>

                    <span className="w-9/12 flex flex-col justify-end items-end mt-5">
                        <p className={errorStyle}>{formErrors.data ? formErrors.data : ""}</p>
                    </span>
                </motion.form>

                <motion.form animate={showSign ? "close" : "show"} initial={{ top: "-100%" }} variants={formVariants} transition={{ duration: 0.5 }}
                    className="absolute pt-5 gap-4 font-montserrat flex w-full  flex-col items-center rounded-lg">

                    <h1 onClick={() => { setShowSign(false), setFormErrors({ ...formErrors, data: false }) }} className={showSign ? "text-lg" : "text-2xl"}>Sign up</h1>

                    <span className="w-6/12 mt-4 ">
                        <Input props={{ formValues: formRegister, setFormValues: setFormRegister, type: "text", element: "email" }} />
                    </span>

                    <Input props={{ formValues: formRegister, setFormValues: setFormRegister, type: "text", element: "name" }} />

                    <div className="flex items-center flex-col">

                        <span className={` duration-300 ${passwordVisible ? "passLightOn rounded-b-2xl" : ""} `}>
                            <Input props={{ formValues: formRegister, setFormValues: setFormRegister, type: passwordVisible ? "text" : "password", element: "password" }} /></span>

                        <span className={`w-8 h-2 border border-t-0 z-10 bg-gradient-to-t cursor-pointer duration-500 border-l ${passwordVisible ? "from-red-700 to-yellow-500 border-yellow-500" :
                            "from-red-400 to-transparent border-yellow-600"} relative rounded-b-xl`}
                            onClick={() => setPasswordVisible(!passwordVisible)} >
                        </span>

                    </div>
                    <Input props={{ formValues: formRegister, setFormValues: setFormRegister, type: "password", element: "checkPass" }} />

                    <button onClick={handleSubmit} name="register" className=" backdrop-brightness-125 hover:backdrop-brightness-200 duration-500 rounded-lg py-1 px-7 mt-6">Submit</button>
                    <span className="w-9/12 flex flex-col justify-end items-end mt-5">
                        <p className={errorStyle}>{formErrors ? Object.values(formErrors)[0] : ""}</p>
                    </span>

                </motion.form>

            </div>

        </div >
    )
}