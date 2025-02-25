import {Task} from './taskSlice.ts';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";

interface Table {
    id: number;
    title: string;
    tasks: Task[];
}

interface TablesState {
    tables: Table[];
}

const initialState: TablesState = {
    tables: []
}

export const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        addTable: (state, action: PayloadAction<Table>) => {
            state.tables.push(action.payload);
        },
        removeTable: (state, action: PayloadAction<Table>) => {
            state.tables = state.tables.filter(table => table.id !== action.payload.id);
        },
        addTaskToTable: (state, action: PayloadAction<{ tableId: number; task: Task }>) => {
            const table = state.tables.find(table => table.id === action.payload.tableId);
            if (table) table.tasks.push(action.payload.task);
        },
        removeTaskFromTable: (state, action: PayloadAction<{ tableId: number; taskId: number; }>) => {
            const table = state.tables.find(table => table.id === action.payload.tableId);
            if (table) table.tasks = table.tasks.filter(task => task.id !== action.payload.taskId);
        },
        removeAllTables: (state) => {
            state.tables.forEach(table=>{
                table.tasks = []
            })
            state.tables = []
        }
    }
})

export const { addTable, removeTable, addTaskToTable, removeTaskFromTable, removeAllTables } = tableSlice.actions;
export const selectTables = (state: RootState) => state.tables.tables;
export default tableSlice.reducer;