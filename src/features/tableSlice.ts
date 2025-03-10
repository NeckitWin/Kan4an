import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import {Table} from "../types/Table.ts";

interface TablesState {
    tables: Table[];
    currentTableId: number;
}

const initialState: TablesState = {
    tables: [],
    currentTableId: 0,
}

export const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        addTable: (state, action: PayloadAction<Table>) => {
            state.tables.push(action.payload);
        },
        removeTable: (state, action: PayloadAction<{ tableId: number }>) => {
            state.tables = state.tables.filter(table => table.id !== action.payload.tableId);
        },
        addTaskToTable: (state, action: PayloadAction<{ tableId: number; taskId: number }>) => {
            const currentTable = state.tables.find(table => table.id === action.payload.tableId);
            if (currentTable) currentTable.tasksIds.push(action.payload.taskId);
        },
        moveTaskToTable: (state, action: PayloadAction<{ toTableId: number; taskId: number }>) => {
            const {taskId, toTableId} = action.payload;
            let fromTable: Table | undefined, toTable: Table | undefined;

            for (const table of state.tables) {
                if (table.tasksIds.includes(taskId)) fromTable = table;
                if (table.id === toTableId) toTable = table;
                if (fromTable && toTable) break;
            }

            if (fromTable && toTable) {
                fromTable.tasksIds = fromTable.tasksIds.filter(id => id !== taskId);
                toTable.tasksIds.push(taskId);
            }
        },
        removeTaskFromTable: (state, action: PayloadAction<{ tableId: number; taskId: number; }>) => {
            const table = state.tables.find(table => table.id === action.payload.tableId);
            if (table) table.tasksIds = table.tasksIds.filter(taskId => taskId !== action.payload.taskId);
        },
        removeAllTables: (state) => {
            state.tables = []
        },
        setCurrentTableId: (state, action: PayloadAction<{ tableId: number; }>) => {
            state.currentTableId = action.payload.tableId;
        },
        clearTasksFromTable: (state, action: PayloadAction<{ tableId: number; }>) => {
            const currentTable = state.tables.find(table=>table.id===action.payload.tableId);
            if (currentTable) currentTable.tasksIds = [];
        },
        clearAllTasksFromTables: (state) => {
            state.tables.forEach(table => {
                table.tasksIds = [];
            })
        }
    }
})

export const {
    addTable,
    removeTable,
    addTaskToTable,
    moveTaskToTable,
    removeTaskFromTable,
    removeAllTables,
    setCurrentTableId,
    clearTasksFromTable,
    clearAllTasksFromTables
} = tableSlice.actions;
export const selectTables = (state: RootState) => state.tables.tables;
export const selectCurrentTableId = (state: RootState) => state.tables.currentTableId;
export default tableSlice.reducer;