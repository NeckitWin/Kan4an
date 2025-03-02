import Modal from "../base/Modal.tsx";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addTable} from "../../features/tableSlice.ts";
import {Table} from "../../types/Table.ts";
import {closeModal, selectModals} from "../../features/modalSlice.ts";

const TableModal = () => {
    const [tableTitle, setTableTitle] = useState('');
    const dispatch = useAppDispatch();
    const modal = useAppSelector(selectModals);
    const isOpen = modal.modalType==='table'
    const onClose = () => dispatch(closeModal());

    const handleSubmit = () => {
        const now = Date.now();
        const newTable: Table = {
            id: now,
            title: tableTitle,
            tasksIds: [],
            createdDate: now
        }

        dispatch(addTable(newTable));

        onClose();

        setTableTitle('');
    }


    return (
        <Modal isOpen={isOpen}>
            <div className='flex flex-col gap-2 w-64'>
                <label className='text-textPrimary'>Create new Table</label>
                <input value={tableTitle} onChange={e => setTableTitle(e.target.value)} type="text"
                       className='bg-textPrimary text-center' placeholder='Title'/>
                <button onClick={handleSubmit}
                        className='bg-accent text-textPrimary rounded-md cursor-pointer duration-200 hover:bg-hoverAccent'>Create
                </button>
            </div>
        </Modal>
    )
}

export default TableModal;