import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export default function ErrorPage() {
  const [test, setTest] = useState()

  return <div class="flex justify-center items-end containerError">
    <div className="font-bold text-2xl flex flex-col sm:text-4xl font-montserrat h-2/3 text-center" >
      <h1 style={{ WebkitTextStroke: '1px white' }} className="text-transparent text-[80px] sm:text-[120px] font-sans">Woops!</h1>


      <button onClick={() => {


        const name = localStorage.getItem('name');
        const password = localStorage.getItem('password');
        const email = localStorage.getItem('email');

        if (!name || !password || !email) {
          console.log('Some data is missing. Cannot register.');
          return;
        }

        axios.post('https://node-mongodb-api-5wtv.onrender.com/register', {
          email: 'daviddperat2@',
          name: "mc",
          password: "123",
        }).then((res) => console.log(res))


      }}>register</button>

      <p onClick={() => {
        axios.post("https://node-mongodb-api-5wtv.onrender.com/login", { name: localStorage.name, password: localStorage.password }).then((res) => {
          setTest(res.data.data)
        })
      }}>login</p>
      <p onClick={() => {
        axios.post("https://node-mongodb-api-5wtv.onrender.com/logout").then((res) => console.log(res))
      }}>logout</p>
      <p onClick={() => {
        axios.post('https://node-mongodb-api-5wtv.onrender.com/mc/task', {
          name: "siuuu", hour: "12:00", duration: 30,
          icon: "just-a-cat-dark", tags: ["study", "work", "work-out"], weekDay: [0, 2, 3, 5, 4]
        }).then((res) => console.log(res))

      }}>newTask</p>
      <p onClick={() => console.log(test)}> consult</p>
      <p className="mt-20 md:mt-32 self-center sm:w-5/6">
        We're sorry, something is not working here
      </p>
      <Link to='/home'> <button className="toHome">Go to Home</button></Link>
    </div>
  </div>
}