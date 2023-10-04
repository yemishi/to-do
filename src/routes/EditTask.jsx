import axios from "axios"
import Button from "../freatures/Button"
import { useGlobalState } from "../App"
import { del, edit } from "../freatures/useAxios"
import { moreTime, selectHour, selectDuration } from "../freatures/store"
import { useParams, Link, useNavigate } from "react-router-dom"
import { configIcon, selectedIcon } from "../freatures/configIcon"
import { useEffect } from "react"
import cancel from '../assets/imgs/cancel.svg'
import bin from '../assets/imgs/bin.svg'

export default function EditTask() {
  const { formConfig, setFormConfig, setDrag } = useGlobalState()
  const navigate = useNavigate()

  useEffect(() => {
    const durationDrag = [15, 30, 45, 60, 120];

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/tasks/${id}`);
        const draggable = document.querySelector('.draggable');
        const chosenDurationKey = durationDrag.find(e => res.data.duration == e);

        if (chosenDurationKey) {
          const chooseDuration = document.querySelectorAll('.chooseDuration');
          const valueIndex = durationDrag.indexOf(chosenDurationKey)
          const textValue = chooseDuration[valueIndex].value;
          draggable.textContent = textValue;
          setDrag(chooseDuration[valueIndex].offsetLeft);

        } else draggable.classList.add('hidden')

        setFormConfig({ ...formConfig, ...res.data });

        document.querySelectorAll('.myB').forEach(element => {
          const inputValue = element.firstChild.value;
          if (inputValue === res.data.hour) {
            highlight(element);
          }
        });

        function highlight(element) {
          element.classList.add('bg-teal-500');
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest',});
        }

      } catch (error) {
        navigate('/error')
      }
    };

    fetchData();
  }, []);

  const { id } = useParams()
  const convertMin = (event) => {
    let minToHour = 0
    while (event >= 60) event -= 60, minToHour++
    return `${minToHour} ${minToHour > 1 ? 'HOURS' : 'HOUR'}`
  }
  return (
    <section className="flex flex-col pb-11" >
      <header className="flex items-center justify-between">
        <Link onClick={() => del(formConfig.id)} className="bg-teal-600 w-11 h-11 flex justify-center items-center rounded-lg" to='/'>
          <Button props={{ icon: [bin, 'delete'] }} />
        </Link>
        <span className="flex flex-col">
          <h1 className="text-center font-bold ">Edit Event</h1>
          <p className="text-center font-slab text-gray-200 text-lg  md:font-semibold">
            {`${formConfig.duration >= 60 ? convertMin(formConfig.duration) : `${formConfig.duration} MINUTES`} `}</p>
        </span>
        <Link className="bg-teal-600 w-11 h-11 flex justify-center items-center rounded-lg" to='/'>
          <Button props={{ icon: [cancel, 'cancel'] }} />
        </Link>
      </header>

      <div className="w-full my-10 flex flex-col items-center justify-center">
        <h3 className="self-start">Name</h3>
        <input className="p-4 text-center text-gray-700 rounded-md font-semibold text-xl font-geogia outline-none w-6/12"
          type="text" onChange={(e) => setFormConfig({ ...formConfig, name: e.target.value })} placeholder={formConfig.name ? formConfig.name : formConfig.name} />
      </div>
      {selectedIcon()}
      <span className="flex justify-between items-center">
        <h3>Duration</h3>
        {moreTime()}
      </span>

      {selectDuration()}
      <h3 className="w-11/12 self-center">When</h3>
      <div className="flex  divide-y flex-col p-2 h-96 w-11/12 self-center overflow-auto bg-teal-600 rounded-lg md:h-135">
        {selectHour()}
      </div>
      <h3>Modify icon</h3>
      {configIcon()}
      <Link to='/'><button onClick={() => edit(id, { ...formConfig })}
        className={`absolute bottom-3 font-extrabold text-xl font-title ${formConfig.bg ? formConfig.bg :
          'bg-sky-400'} duration-500 rounded-xl  w-72 h-14 left-2/4 -translate-x-2/4`} >save</button>
      </Link >
    </section>
  )
}