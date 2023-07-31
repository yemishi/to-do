import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Panda from './assets/imgs/panda.jsx'
import plus from './assets/imgs/plus.svg'
import AddTask from './freatures/AddTask.jsx'

export default function App() {

  const useTask = useSelector(state => state.taskSlice.tasks)
  const del = useSelector(state => state.taskSlice.del)
  const add = useSelector(state => state.taskSlice.createId)
  const [task, setTask] = useState([])
  const [count, setCount] = useState()
  const [load, setLoad] = useState(false)

  add(setCount)
  useEffect(() => {
    useTask(task, setTask)
  }, [load])

  const d = new Date();
  const hour = d.getHours();
  const min = d.getMinutes()
  const time = `${hour}:${min}`

  return (

    <article className='text-black  w-screen h-screen flex items-center justify-center '>

      <ul className=' p-2 bg-gradient-to-b from-teal-700 rounded-xl sm:w-10/12 h-3/6 overflow-auto'>

        <h1 className='text-5xl text-white font-title my-8'>PanDk</h1>
        <AddTask load={load} setLoad={setLoad} />
        {task.map(e => <li className='sm:mt-2 sm:rounded-md p-3 bg-white flex justify-between w-full' key={e.id}>

          <div className='flex justify-between'>

            <input type="checkbox" />
            <span className='sm:flex sm:flex-col ml-4'>
              <h2 className='sm:text-base font-semibold font-serif'>{e.name}</h2>
              <p className='font-mono font-normal'>{`${e.duration} Min`}</p>

            </span>
          </div>

          <span className='flex items-center sm:w-24 justify-between'>
            <p className='font-mono'>{`${e.hour} ${e.hour < '12:00' ? 'AM' : 'PM'}`}</p>
            <button onClick={() => del(e.id, load, setLoad)}>X</button>
          </span>

        </li>)}

      </ul>
    </article >
  )
}


