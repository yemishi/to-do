import axios from "axios";
import React, { useState, useEffect } from "react";
import PageTransition from "../features/PageTransition"

export default function Validation() {

    const [props, setProps] = useState({})
    const validateUser = async () => {
        try {
            const token = new URLSearchParams(window.location.search).get("token");

            const res = await axios.get(`https://node-mongodb-api-5wtv.onrender.com/confirm?token=${token}`);


       
            const { data, status } = res
            setProps({ msg: data.msg, status, route: "/login" })
            return

        } catch (error) {
            console.log(error)
            const { data, status } = await error.response
            setProps({ msg: data.msg, status, route: "/login" })
        }
    }
    useEffect(() => { validateUser() }, [])
    return (
        <div className="bg-bubble flex justify-center items-center" >
            <PageTransition props={props} />
        </div>
    )
}