import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../app/store.ts";
import {Task} from "../types/Task.ts";

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: []
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
        toggleTask: (state, action: PayloadAction<Task>) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.completed = !task.completed
            }
        },
        removeAllTasks: (state) => {
            state.tasks = [];
        }
    }
})

export const {addTask, removeTask, toggleTask, removeAllTasks} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export default taskSlice.reducer;