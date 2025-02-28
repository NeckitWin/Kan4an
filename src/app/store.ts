import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../features/taskSlice.ts";
import tableReducer from "../features/tableSlice.ts";
import modalReducer from "../features/modalSlice.ts";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    tables: tableReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;