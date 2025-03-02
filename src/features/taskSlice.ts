import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../app/store.ts";
import {Task} from "../types/Task.ts";

interface TaskState {
    tasks: Task[];
    currentTask: Task | null;
}

const initialState: TaskState = {
    tasks: [],
    currentTask: null
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<{taskId: number}>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.taskId);
        },
        toggleTask: (state, action: PayloadAction<{taskId: number}>) => {
            const task = state.tasks.find(task => task.id === action.payload.taskId);
            if (task) {
                task.completed = !task.completed
            }
        },
        removeAllTasks: (state) => {
            state.tasks = [];
        },
        setCurrentTask(state, action: PayloadAction<Task>) {
            state.currentTask = action.payload;
        }
    }
})

export const {addTask, removeTask, toggleTask, removeAllTasks, setCurrentTask} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
export default taskSlice.reducer;