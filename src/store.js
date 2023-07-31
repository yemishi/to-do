import { taskSlice } from "./assets/slices/taskSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    taskSlice
  }
})