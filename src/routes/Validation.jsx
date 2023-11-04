import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTransition from "../features/PageTransition"

export default function Validation() {

    const { userName } = useParams()
    const [props, setProps] = useState({})

    const validateUser = async () => {
        try {
            const res = await axios.get(`https://node-mongodb-api-5wtv.onrender.com/confirm/${userName}`);
            const { data, status } = res.response
            setProps({ msg: data.msg, status, route: "/login" })
            return

        } catch (error) {
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