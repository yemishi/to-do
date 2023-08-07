import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import AddTask from './freatures/AddTask.jsx'
import { checkTask } from './freatures/checkTask.js'
import { timeCheck } from './freatures/checkTask.js'

export default function App() {

  const useTask = useSelector(state => state.taskSlice.tasks)
  const del = useSelector(state => state.taskSlice.del)
  const [task, setTask] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    useTask(task, setTask)

  }, [load])

  const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const a = () => {
    task.map(e => {
      setTimeout(() => {
        checkTask(e.weekDay, e.hour, e.duration, e.id, e.name)

      }, timeCheck(e.weekDay, e.hour, e.duration))

    })
  }
  a()

  return (

    < article className='text-black  w-screen h-screen flex items-center justify-center ' >

      <ul className=' p-2 bg-gradient-to-b from-teal-700 rounded-xl sm:w-10/12 h-3/6 overflow-auto'>

        <h1 className='text-5xl text-white font-title my-8'>PanDk</h1>
        <AddTask load={load} setLoad={setLoad} />
        {task.map(e => <li id={`list${e.id}`} onClick={() => setLoad(!load)}
          className='sm:mt-2 sm:rounded-md p-3 bg-white flex justify-between w-full' key={e.id}>


          <div className='flex justify-between'>
            <input type="checkbox" id={`check${e.id}`} onChange={(e) => console.log(e.target.checked)} />
            <span className='sm:flex sm:flex-col ml-4'>
              <h2 className='sm:text-base font-semibold font-serif'>{e.name}</h2>
              <p className='font-mono font-normal'>{`${e.duration} Min`}</p>

            </span>
          </div>

          <div >
            <span className='flex items-center sm:w-24 justify-between'>
              <p className='font-mono'>{`${e.hour} ${e.hour < '12:00' ? 'AM' : 'PM'}`}</p>
              <button onClick={() => del(e.id, load, setLoad)}>X</button>
            </span>
            <p>
              {weekDay[e.weekDay]}
            </p>

          </div>

        </li>)}

      </ul>
    </article >
  )
}


