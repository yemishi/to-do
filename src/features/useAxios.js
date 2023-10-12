import axios from "axios";
const url = 'http://localhost:3000/tasks'
const useTask = (setTask) => axios.get(url).then(res => setTask(res.data))
const id = () => axios.get(url).then(response => response.data.length + 1).catch(err => console.log(err.data))
const del = (id) => axios.delete(`${url}/${id}`).then(res => console.log(res.data))
const edit = (id, { name, duration, hour, icon, bg }) => axios.patch(`${url}/${id}`, { name, duration, hour, icon, bg })
const submitTask = ({ name, duration, hour, weekDay, icon, bg, tag }) => {
  axios.post('http://localhost:3000/tasks', {
    id, name, hour, duration, weekDay, icon, bg, tag
  })
}
export { useTask, submitTask, del, edit } 