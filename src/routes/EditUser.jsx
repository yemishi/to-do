import { useState } from "react"
import { useParams } from "react-router-dom"

export default function EditUser() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [formValues, setFormValues] = useState({ password: "", checkPassword: "" })
    const inputStyle = 'bg-[#0d4f75] bg-opacity-50 backdrop-brightness-125 w-9/12 focus:bg-opacity-100  duration-500 p-2 rounded-md outline-none'
    const [errorMsg, setErrorMsg] = useState('')
    const { name } = useParams("userName")
    const handlerValue = (e) => {
        const { value, name } = e.target
        setFormValues({ ...formValues, [name]: value })
    }
    const handlerSubmit = () => {
        const { password, checkPassword } = formValues
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const lengthRegex = /^.{7,}$/;

        if (!lengthRegex.test(password)) {
            return setErrorMsg("Password must be at least 8 characters long.");
        }
        if (!uppercaseRegex.test(password)) {
            return setErrorMsg("Password must contain at least one uppercase letter.");
        }
        if (!lowercaseRegex.test(password)) {
            return setErrorMsg("Password must contain at least one lowercase letter.");
        }
        if (!numberRegex.test(password)) {
            return setErrorMsg("Password must contain at least one number.");
        }
        if (!specialCharacterRegex.test(password)) {
            return setErrorMsg("Password may contain special characters, such as @, #, $, etc.");
        }
        if (checkPassword !== password) {
            return setErrorMsg("The camp confirm password does't the same what password")
        }
        setErrorMsg("")
        if (!errorMsg) {
            axios.patch(`https://node-mongodb-api-5wtv.onrender.com/editUser/${name}`, { password: formValues.password }).then((res) => console.log(res))
        }

    }
    return (
        <div className="w-full  font-montserrat h-full flex justify-center items-center  absolute left-0 top-0">

            <div className="relative flex gap-3 flex-col justify-center items-center shadow-3xl overflow-hidden bg-gradient-to-b h-[32rem] w-[22rem] shadow-black">
                <h1>Change Password</h1>
                <p className="text-red-400 font-bold text-xs w-[58%] ">{errorMsg}</p>
                <span className="w-9/12  justify-center flex items-center">

                    <input onChange={handlerValue} type={passwordVisible ? "text" : "password"} className={inputStyle}
                        name="password" placeholder="password" />

                    <span className={`w-3 h-8 border bg-[#092e44f7] cursor-pointer duration-500  border-l-0 ${passwordVisible ? "border-[#18567f]" :
                        "border-[#1a3e56b6]"} relative rounded-r-xl `}
                        onClick={() => setPasswordVisible(!passwordVisible)} >
                        <svg className={`w-1 h-1 right-1 duration-500 ${passwordVisible ? "bg-[#398dc4]" : "bg-[#183b53]"} rounded-full absolute top-2`} />
                        <svg className={`w-1 h-1 right-1 duration-500 ${passwordVisible ? "bg-[#3b86b8]" : "bg-[#183b53]"} rounded-full absolute bottom-2`} />
                    </span>
                </span>

                <input onChange={handlerValue} type="password" placeholder="confirm password" className={`w-[59%] ${inputStyle}`} name="checkPassword" />
                <button onClick={handlerSubmit} className="rounded-xl bg-water-800 px-3  p-1 font-montserrat ">Go to Login</button>
            </div>


        </div>
    )
}