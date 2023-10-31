import axios from "axios"
import Button, { InputName } from "../features/Button"
import cancel from '../assets/imgs/cancel.svg'
import bin from '../assets/imgs/bin.svg'

import { useGlobalState } from "../App"
import React,{ useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import { moreTime, selectHour, selectDuration } from "../features/store"
import { chooseBgColor, configIcon, selectedIcon } from "../features/configIcon"
import { ButtonSaveB } from "../features/Button"

export default function EditTask() {
  const { formConfig, setFormConfig, setDrag } = useGlobalState()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    const durationDrag = [15, 30, 45, 60, 120];

    const fetchData = async () => {
      try {
        const res = await axios.get(`https://node-mongodb-api-5wtv.onrender.com/editUser/${localStorage.name}/${id}`);
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

        document.querySelectorAll('.optionHour').forEach(element => {
          const inputValue = element.firstChild.value;
          if (inputValue === res.data.hour) {
            highlight(element);
          }
        });

        function highlight(element) {
          element.classList.add('active');
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest', });
        }

      } catch (error) {
        navigate('/*')
      }
    };

    fetchData();
  }, []);

  const editTask = () => {
    axios.patch(`/${localStorage.name}/task/${id}`, formConfig).then((res) => console.log(res))
  }
  
  const deleteTask = () => {
    try {
      axios.delete(`/https://node-mongodb-api-5wtv.onrender.com/editUser/${localStorage.name}/task/${id}`).then((res) => console.log(res))
    } catch (error) {
    }
  }
  const convertMin = (event) => {
    let minToHour = 0
    while (event >= 60) event -= 60, minToHour++
    return `${minToHour} ${minToHour > 1 ? 'HOURS' : 'HOUR'}`
  }
  return <section className="wrapper">

    <header className="w-full flex mb-8 justify-between items-center">
      <Link onClick={(deleteTask)} to='/home'>
        <Button props={{ icon: [bin, 'delete'] }} />
      </Link>
      <span className="font-bold">
        <h1 className="text-center font-bold ">Edit Event</h1>
        <p className="text-center font-slab text-gray-200">
          {`${formConfig.duration >= 60 ? convertMin(formConfig.duration) : `${formConfig.duration} MINUTES`} `}</p>
      </span>
      <Link to='/home'>
        <Button props={{ icon: [cancel, 'cancel'] }} />
      </Link>
    </header>

    <InputName props={{ formConfig, setFormConfig }} />

    {selectedIcon()}
    {chooseBgColor()}
    {configIcon()}
    <span className="flex justify-between items-center">
      <h3>Duration</h3>
      {moreTime()}
    </span>

    {selectDuration()}
    <h3 className="w-11/12 self-center">When</h3>
    <div className="hourContainer">
      {selectHour()}
    </div>

    <Link to='/home'> <ButtonSaveB props={{ action: () => editTask }} />
    </Link >
  </section>

}