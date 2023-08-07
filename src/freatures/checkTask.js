import { useEffect } from "react";

const d = new Date();
const currentyHour = d.getHours();
const min = d.getMinutes() < 9 ? `0${d.getMinutes()}` : d.getMinutes()
const time = `${currentyHour}:${min}`
const currentDay = d.getDay()
export const checkTask = (weekDay, hour, duration, id, name) => {
  const ele = document.getElementById(`list${id}`)
  const checkbox = document.getElementById(`check${id}`)
  const checkDay = weekDay == currentDay
  if (checkDay && checkbox && time >= hour && !checkbox.checked) {
    console.log(hour, 'SIUUUU ', name)
    return checkbox.checked = 'true'

  }
}

export const timeCheck = (weekDay, hour, duration) => {
  if (weekDay == currentDay) {
    const setHour = hour.split(':')
    const regionHour = time.split(':')
    const finalHour = regionHour[0] - setHour[0]
    const finalMin = setHour[1] - regionHour[1]
    const test = time >= hour ? 0 : finalMin * 60000
    console.log(test, hour, time)
    return test
  }
}