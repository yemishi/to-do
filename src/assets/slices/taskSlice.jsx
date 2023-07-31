import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = 'http://localhost:3000/tasks'


const initialState = {
  tasks: (task, setTask) => {
    axios.get(url)
      .then(response => setTask(response.data))
      .catch(err => console.log(err.data))
  },
  createId: (setId) => {
    axios.get(url)
      .then(response => setId(response.data.length + 1))
      .catch(error => console.log(error.data))
  },
  del: (e, load, setLoad) => {
    axios.delete(`${url}/${e}`)
      .then(response => console.log(response))
      .catch(err => console.log(err))
    setLoad(!load)
  }
}


const tasksReducer = createSlice({
  name: "tasks",
  initialState
})

export const taskSlice = tasksReducer.reducer