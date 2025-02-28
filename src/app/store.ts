import { configureStore } from '@reduxjs/toolkit';
import taskReducer from "../features/taskSlice.ts";
import tableReducer from "../features/tableSlice.ts";
import modalReducer from "../features/modalSlice.ts";

const saveStateToLocalStorage = (state: RootState) => {
  const jsonStateData = JSON.stringify(state);
  localStorage.setItem('reduxState', jsonStateData);
}

const getStateFromLocalStorage = () => {
  const stateData = localStorage.getItem('reduxState');
  if (!stateData) return undefined;
  return JSON.parse(stateData);
}

const store = configureStore({
  reducer: {
    // @ts-expect-error: Ignoring types error because the file is being bundled correctly by Webpack
    tasks: taskReducer,
    tables: tableReducer,
    modal: modalReducer,
  },
  preloadedState: getStateFromLocalStorage()
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;