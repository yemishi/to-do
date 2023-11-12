import axios from "axios"
import Button, { Input } from "../features/FormToolkit"
import cancel from '../assets/imgs/cancel.svg'
import bin from '../assets/imgs/bin.svg'

import PageTransition from "../features/PageTransition"

import { useGlobalState } from "../App"
import React, { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import { moreTime, selectHour, selectDuration } from "../features/store"
import { chooseBgColor, configIcon, selectedIcon } from "../features/configIcon"
import { ButtonSaveB } from "../features/FormToolkit"

export default function EditTask() {

  const { formValues, setFormValues, setDrag } = useGlobalState()
  const navigate = useNavigate()

  const { id } = useParams()
  useEffect(() => {

    const durationDrag = [15, 30, 45, 60, 120];

    const fetchData = async () => {
      try {
        const res = await axios.get(`https://node-mongodb-api-5wtv.onrender.com/${localStorage.name}/${id}`);
        const draggable = document.querySelector('.draggable');
        const chosenDurationKey = durationDrag.find(e => res.data.content.duration == e);
        if (chosenDurationKey) {
          const chooseDuration = document.querySelectorAll('.chooseDuration');
          const valueIndex = durationDrag.indexOf(chosenDurationKey)
          const textValue = chooseDuration[valueIndex].value;
          draggable.textContent = textValue;
          setDrag(chooseDuration[valueIndex].offsetLeft);

        } else draggable.classList.add('hidden')

        setFormValues({ ...formValues, ...res.data.content });

        document.querySelectorAll('.optionHour').forEach(element => {
          const inputValue = element.firstChild.value;
          if (inputValue === res.data.content.hour) {
            highlight(element);
          }
        });

        function highlight(element) {
          element.classList.add('active');
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest', });
        }

      } catch (error) {
        console.log(error)
      }
    };

    fetchData();

  }, []);

  const editTask = async () => {
    const res = await axios.patch(`https://node-mongodb-api-5wtv.onrender.com/${localStorage.name}/updateTask/${id}`, formValues)

  }

  const deleteTask = async () => {
    try {
      await axios.delete(`https://node-mongodb-api-5wtv.onrender.com/${localStorage.name}/task/${id}`).then((res) => console.log(res))
      navigate("/home")
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
        <Button props={{ icon: bin, alt: 'delete' }} />
      </Link>
      <span className="font-bold">
        <h1 className="text-center font-bold ">Edit Event</h1>
        <p className="text-center font-slab text-gray-200">
          {`${formValues.duration >= 60 ? convertMin(formValues.duration) : `${formValues.duration} MINUTES`} `}</p>
      </span>
      <Link to='/home'>
        <Button props={{ icon: cancel, alt: 'cancel' }} />
      </Link>
    </header>


    <span className="mb-6 w-6/12 md:w-2/6 lg:w-1/4 self-center">
      <Input props={{ formValues: formValues, setFormValues: setFormValues, type: "text", element: "name" }} />
    </span>
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

    <Link to='/home'> <ButtonSaveB props={{ action: () => editTask(), formValues }} />
    </Link >
  </section>

}