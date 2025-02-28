import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";

interface ModalState {
    modalType: 'task' | 'table' | null;
}

const initialState: ModalState = {
    modalType: null
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<'task' | 'table'>) {
            state.modalType = action.payload;
        },

        closeModal(state) {
            state.modalType = null;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;
export const selectModals = (state: RootState) => state.modal;
export default modalSlice.reducer;