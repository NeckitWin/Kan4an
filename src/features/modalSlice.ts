import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";

interface ModalState {
    taskModalOpen: boolean;
    tableModalOpen: boolean;
}

const initialState: ModalState = {
    taskModalOpen: false,
    tableModalOpen: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openTaskModal(state) {
            state.taskModalOpen = true
        },

        closeTaskModal(state) {
            state.taskModalOpen = false
        },

        openTableModal(state) {
            state.tableModalOpen = true
        },

        closeTableModal(state) {
            state.tableModalOpen = false
        },
    }
})

export const { openTaskModal, closeTaskModal, openTableModal, closeTableModal } = modalSlice.actions;
export const selectModals = (state: RootState) => state.modal;
export default modalSlice.reducer;