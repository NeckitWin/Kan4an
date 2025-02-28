import {Task} from './taskSlice.ts';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";

interface Table {
    id: number;
    title: string;
    tasksIds: number[];
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
        removeTable: (state, action: PayloadAction<{tableId: number}>) => {
            state.tables = state.tables.filter(table => table.id !== action.payload.tableId);
        },
        addTaskToTable: (state, action: PayloadAction<{ tableId: number; taskId: number }>) => {
            const currentTable = state.tables.find(table => table.id === action.payload.tableId);
            if (currentTable) currentTable.tasksIds.push(action.payload.taskId);
        },
        removeTaskFromTable: (state, action: PayloadAction<{ tableId: number; taskId: number; }>) => {
            const table = state.tables.find(table => table.id === action.payload.tableId);
            if (table) table.tasksIds = table.tasksIds.filter(taskId => taskId !== action.payload.taskId);
        },
        removeAllTables: (state) => {
            state.tables = []
        }
    }
})

export const { addTable, removeTable, addTaskToTable, removeTaskFromTable, removeAllTables } = tableSlice.actions;
export const selectTables = (state: RootState) => state.tables.tables;
export default tableSlice.reducer;