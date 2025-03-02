import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";

interface ModalState {
    modalType: 'newTask' | 'table' | 'infoTask' | null;
}

const initialState: ModalState = {
    modalType: null
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<'newTask' | 'infoTask' | 'table'>) {
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