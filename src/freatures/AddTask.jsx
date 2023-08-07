import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import plus from '../assets/imgs/plus.svg'
import cancel from '../assets/imgs/cancel.svg'
import checked from '../assets/imgs/checked.svg'


export default function AddTask({ load, setLoad }) {

  const id = useSelector(state => state.taskSlice.createId)
  const [hour, setHour] = useState(0)
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(0)
  const [count, setCount] = useState(0)
  const [weekDay, setWeekDay] = useState(0)
  const [countSlide, setCountSlide] = useState(0)
  const [equal, setEqual] = useState(true)
  const [transform, setTransform] = useState()
  const [rever, setRever] = useState()
  const [delayIncrement, setDelay] = useState(

  )
  const panda = ['https://cdna.artstation.com/p/assets/images/images/000/199/594/large/steve-wang-elle.jpg?1443930526',
    'https://img.freepik.com/fotos-premium/um-panda-andando-de-bicicleta-com-uma-planta-na-cesta_850197-2337.jpg',
    'https://pbs.twimg.com/media/FwL2uRyXoAMMZyM.png',
    'https://miro.medium.com/v2/resize:fit:1144/0*Yajhq_-TAn5XHP30.png',
    'https://blog.enterprisedna.co/wp-content/uploads/2023/06/jase888_a_photo_of_a_panda_bear_programming_on_a_computer_moder_d6cde95e-4b74-40ed-be3b-98a3964a2537.png'
  ]

  const increment = countSlide == panda.length - 1 ? 0 : countSlide + 1


  const motivation = ['Save the galaxy', 'Exercise whenever you can',
    'The space is the limit', 'TATAKAE', 'always learn something new']

  const motivationColor = ['text-blue-500 ', 'text-emerald-600 ',
    'text-orange-500 ', 'text-red-700 ', 'text-green-500']

  const changeImg = () => {
    if (countSlide == panda.length - 1) return setCountSlide(0)
    setCountSlide(countSlide + 1)
  }

  const checkBol = () => {
    if (equal) {
      setTransform('animate-rever')
      setTimeout(() => {
        changeImg()
      }, 1500)
    } else {
      setTransform('')
    }
  }

  const submiTask = (e, name, duration, hour, id) => {
    e.preventDefault()
    axios.post('http://localhost:3000/tasks', {
      name,
      hour,
      duration,
      id,
      weekDay
    })
    setCount(0)
    setLoad(!load)
  }

  setTimeout(() => {
    checkBol()
    setEqual(!equal)
    setDelay(increment)
  }, 2000);

  const myForm = <form className="grid mb-24 h-52 w-full rounded-md relative gap-4 " style={{ gridTemplateColumns: '50% 47%' }}
    onSubmit={(e) => submiTask(e, name, duration, hour, id)}>

    <span style={{ backgroundImage: `linear-gradient(to bottom,rgba(28, 28, 28, 0.84), rgba(0,0, 0, 0.0)),url(${panda[countSlide]})` }}
      className={` h-full bg-cover flex rounded-lg `} >
      <span className={`w-3/6 absolute overflow-hidden
 `}>
        <div style={{
          marginLeft: '100%', backgroundImage: ` linear-gradient(to bottom,rgba(28, 28, 28, 0.84), rgba(0,0, 0, 0.0)),url(${panda[delayIncrement]})`
        }} className={`${transform}  
         w-full h-52 bg-cover rounded-lg `} >
          <h1 className={`${motivationColor[increment]} ${transform} 
        font-slab  text-center text-xl`}>
            {motivation[increment]}
          </h1>
        </div>
      </span>
      <h1 className={`${motivationColor[countSlide]} font-slab w-full text-center text-xl`}>
        {motivation[countSlide]}

      </h1>
    </span>

    <span className="flex flex-col justify-between ">

      <input onChange={(e) => setName(e.target.value)} type="text" placeholder="task name" className="p-2 rounded-md font-semibold " />
      <input onChange={(e) => setDuration(e.target.value)} step='0' type="number" className="p-2 rounded-md font-semibold " placeholder="30 min" />
      <select name="weekDay" className="p-2 rounded-md font-semibold " onChange={e => setWeekDay(e.target.value)}>
        <option value="0">Sunday</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>

      </select>
      <div className="flex justify-between ">

        <input onChange={(e) => setHour(e.target.value)} type='time' className="p-2 rounded-md font-semibold w-36" step='0' />

        <span >
          <button type="submit"><img src={checked} className="w-8 mr-3" alt="confirm" /></button>
          <button onClick={() => setCount(0)}><img src={cancel} className="w-8" alt="cancel"></img></button>
        </span>

      </div>

    </span>
  </form>

  const myButton = <button className=" mb-8 " onClick={() => setCount(1)}>
    <img className="w-8 " src={plus} alt="plus" />
  </button>

  const currentElement = [myButton, myForm]

  return (

    <div className="flex justify-end">
      {currentElement[count]}
    </div>
  )
}