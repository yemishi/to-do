import { InputName } from "../features/Button"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../App"
import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"

export default function Login() {
    localStorage.clear()
    const { setTask } = useGlobalState()
    const initialValues = { name: localStorage.name, password: localStorage.password }
    const initialRegister = { name: "", password: "", email: "", checkPass: "" }
    const [formRegister, setFormRegister] = useState(initialRegister)
    const [formValues, setFormValues] = useState(initialValues)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [saveLogin, setSaveLogin] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [resetPass, setResetPass] = useState(false)
    const [showSign, setShowSign] = useState(true)

    const handleValues = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value });
    }
    const handleRegister = (e) => {
        const { name, value } = e.target
        setFormRegister({ ...formRegister, [name]: value })
    }
    const validate = (v) => {
        const errors = {};
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const lengthRegex = /^.{7,}$/;

        if (!lengthRegex.test(password)) {
            errors.password = "Password must be at least 8 characters long."
        }
        if (!uppercaseRegex.test(password)) {
            errors.password = "Password must contain at least one uppercase letter."
        }
        if (!lowercaseRegex.test(password)) {
            errors.password = "Password must contain at least one lowercase letter."
        }
        if (!numberRegex.test(password)) {
            errors.password = "Password must contain at least one number."
        }
        if (!specialCharacterRegex.test(password)) {
            errors.password = "Password may contain special characters, such as @, #, $, etc."
        }
        if (checkPassword !== password) {
            errors.checkPass = "The camp confirm password does't the same what password"
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!v.name) {
            errors.name = "The field name can't be empty";
        }
        if (!v.email) {
            errors.email = "The field email can't be empty";
        } else if (!regex.test(v.email)) {
            errors.email = "Incorrect email";
        }
        if (!v.password) {
            errors.password = "The field password can't be empty";
        } else if (v.password.length < 6) {
            errors.password = "Password needs to be at least 6 characters";
        } if (!v.checkPass) {
            errors.checkPass = "The field confirm password can't be empty"
        } else if (v.checkPass !== formValues.password) {
            errors.checkPass = "The field confirm password has a different password"
        }
        setFormErrors(errors);
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        validate(formValues)
        if (Object.keys(formErrors).length === 0) {
            try {
                const { name, password } = formValues
                const res = await axios.post('https://node-mongodb-api-5wtv.onrender.com/login', { name, password })
                await setTask(res.data)

                localStorage.name = formValues.name
                localStorage.password = formValues.password

                if (!saveLogin) {
                    window.addEventListener('beforeunload', () => {
                        localStorage.removeItem(password)
                        localStorage.removeItem(name);
                    });
                }
                navigate('/home')
            } catch (error) {
                console.log(error)
            }
        } else {
            e.classList.add('bg-red-300')
            console.log("you have some error")
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        validate(formValues)
        if (Object.keys(formErrors).length === 0) {
            try {
                const { name, email, password } = formRegister
                const res = await axios.post('https://node-mongodb-api-5wtv.onrender.com/register', { name, email, password })
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        } else console.log("you have some error")

    }
    const formVariants = {
        show: { top: "0%", borderRadius: "0", backgroundColor: "rgb(39 100 129 / 0%)", transitionEnd: { height: "auto" } },
        close: { top: "-100%", borderRadius: "150px 150px 0 0", transitionEnd: { backgroundColor: "#276481", top: "90%", height: "100%" } }
    }

    const handlerResetPass = async () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formValues.email) {
            setFormErrors({ ...formErrors, email: "The field email can't be empty" });
        } else if (!regex.test(formValues.email)) {
            setFormErrors({ ...formErrors, email: "Incorrect email" })
        } else {
            try {
                await axios.patch(`https://node-mongodb-api-5wtv.onrender.com/forgotPassword/${formValues.email}`).then((res) => console.log(res.msg))
                setResetPass(false)
            } catch (error) {
                console.log(error.message)
            }
        }
    }


    const resetPassVariants = {
        showF: { display: "flex", opacity: 1 },
        closeF: { opacity: 0, transitionEnd: { display: "none" } },
        showD: { display: "flex", top: 0 },
        closeD: { opacity: 0, top: "-100%" }
    }

    const errorStyle = "text-red-400 font-bold text-sm"
    const inputStyle = 'bg-[#0d4f75] bg-opacity-50 backdrop-brightness-125 w-9/12 focus:bg-opacity-100  duration-500 p-2 rounded-md outline-none'

    const navigate = useNavigate()

    return (
        <div className="w-full h-full flex justify-center items-center  absolute left-0 top-0">
            <div className="relative shadow-3xl overflow-hidden bg-gradient-to-b h-[32rem] w-[22rem] shadow-black">

                <motion.div onClick={() => setResetPass(false)} animate={resetPass ? "showF" : "closeF"} variants={resetPassVariants} className="backdrop-blur-md absolute h-full z-10 w-full left-0 right-0">

                    <motion.div onClick={(e) => e.stopPropagation()} animate={resetPass ? "showD" : "closeD"} variants={resetPassVariants}
                        className="z-10 w-full font-montserrat py-5  bg-[#1e507975] rounded-b-3xl absolute
                     flex items-center  flex-col justify-center left-0">
                        <p className={`${errorStyle} ml-10 self-start`}>{formErrors.email}</p>
                        <span className="flex items-center px-8 gap-5">
                            <input className={`${inputStyle} py-2 `} onChange={handleValues} name="email" type="text" placeholder={formValues.email ? formValues.email : "email"} />
                            <button onClick={handlerResetPass} className="bg-[#054d7d] font-mono px-2 py-1 rounded-lg">Send</button>
                        </span>
                    </motion.div>

                </motion.div>
                <motion.form animate={showSign ? "show" : "close"} variants={formVariants} transition={{ duration: 0.5 }}
                    className="absolute pt-5 font-montserrat flex w-full gap-3  flex-col items-center rounded-lg">

                    <h1 className={showSign ? "text-2xl" : "text-xl"} onClick={() => setShowSign(true)}>Login in</h1>

                    <input type="text" className={inputStyle} name="name" onChange={handleValues} placeholder="name" />

                    <span className="w-9/12 flex items-center">

                        <input type={passwordVisible ? "text" : "password"} className={inputStyle}
                            name="password" onChange={handleValues} placeholder="password" />

                        <span className={`w-3 h-8 border bg-[#092e44f7] cursor-pointer duration-500  border-l-0 ${passwordVisible ? "border-[#18567f]" :
                            "border-[#1a3e56b6]"} relative rounded-r-xl `}
                            onClick={() => setPasswordVisible(!passwordVisible)} >
                            <svg className={`w-1 h-1 right-1 duration-500 ${passwordVisible ? "bg-[#398dc4]" : "bg-[#183b53]"} rounded-full absolute top-2`} />
                            <svg className={`w-1 h-1 right-1 duration-500 ${passwordVisible ? "bg-[#3b86b8]" : "bg-[#183b53]"} rounded-full absolute bottom-2`} />
                        </span>
                    </span>

                    <span className="flex w-9/12 text-xs gap-1 items-center ">

                        <input type="checkbox" id="saveUser" onClick={() => setSaveLogin(!saveLogin)}
                            className={`w-4 h-4 appearance-none outline-none duration-500 rounded-sm bg-[#0d4f75] ${saveLogin ? "bg-opacity-100" : "bg-opacity-40"}`}
                        />
                        <label htmlFor="saveUser" className={`${saveLogin ? "brightness-100" : "brightness-50"} duration-500`}>
                            Remember me
                        </label>

                        <p className="ml-auto text-red-300 cursor-pointer" onClick={() => setResetPass(true)}>Forgot Password ?</p>
                    </span>
                    <button onClick={handleLogin} className="backdrop-brightness-125 hover:backdrop-brightness-200 duration-500 w-2/4 rounded-lg p-1 mt-3">Login</button>
                    <span className="w-9/12 flex flex-col justify-end items-end mt-5">

                        <p className={errorStyle}>{formErrors.name}</p>
                        <p className={errorStyle}>{formErrors.password}</p>

                    </span>
                </motion.form>

                <motion.form animate={showSign ? "close" : "show"} initial={{ top: "-100%" }} variants={formVariants} transition={{ duration: 0.5 }}
                    className="absolute pt-5 font-montserrat flex w-full gap-3 flex-col items-center rounded-lg">

                    <h1 onClick={() => setShowSign(false)} className={showSign ? "text-lg" : "text-2xl"}>Sign up </h1>

                    <input type="text" name="email" className={inputStyle} onChange={handleRegister} placeholder="email" />
                    <input type="text" name="name" className={inputStyle} onChange={handleRegister} placeholder="name" />

                    <span className="w-9/12 flex items-center">
                        <input type={passwordVisible ? "text" : "password"} className={inputStyle}
                            name="password" onChange={handleRegister} placeholder="password" />
                        <span className={`w-3 h-8 border cursor-pointer duration-500  border-l-0 ${passwordVisible ? "backdrop-brightness-150 border-[#18567f]" : "backdrop-brightness-90 border-[#1a3e56b6]"} relative rounded-r-xl `}
                            onClick={() => setPasswordVisible(!passwordVisible)} >
                            <svg className={`w-1 h-1 right-1 duration-500 ${passwordVisible ? "bg-[#398dc4]" : "bg-[#183b53]"} rounded-full absolute top-2`} />
                            <svg className={`w-1 h-1 right-1 duration-500 ${passwordVisible ? "bg-[#3b86b8]" : "bg-[#183b53]"} rounded-full absolute bottom-2`} />
                        </span>
                    </span>
                    <input type="password" className={inputStyle} placeholder="confirm password" name="checkPass" onChange={handleRegister} />

                    <button onClick={handleSubmit} className="backdrop-brightness-125 hover:backdrop-brightness-200 duration-500 w-2/4 rounded-lg p-1 mt-3">Submit</button>
                    <span className="w-9/12 flex flex-col justify-end items-end mt-5">

                        <p className={errorStyle}>{formErrors.email}</p>
                        <p className={errorStyle}>{formErrors.name}</p>
                        <p className={errorStyle}>{formErrors.password}</p>
                        <p className={errorStyle}>{formErrors.checkPass}</p>
                    </span>
                </motion.form>

            </div>

        </div >
    )
}