import React from "react";
import { useNavigate } from "react-router-dom";


export default function Validation() {
    const navigate = useNavigate()
    return (
        <>
            <div className="h-full font-montserrat w-full items-center flex flex-col justify-center gap-9">
                <h1>Account validate with successfully</h1>
                <p className="text-lg">please click bellow to be logged</p>
                <button onClick={() => navigate("/login")} className="rounded-xl bg-water-700 px-6  p-3 font-montserrat text-lg">Go to Login</button>
            </div>
        </>
    )
}