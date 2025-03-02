import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Task} from "../../types/Task.ts";
import {addTask} from "../../features/taskSlice.ts";
import {addTaskToTable, selectCurrentTableId} from "../../features/tableSlice.ts";
import Modal from "../base/Modal.tsx";
import {closeModal, selectModals} from "../../features/modalSlice.ts";

const NewTaskModal = () => {
    const currentTableId = useAppSelector(selectCurrentTableId);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const dispatch = useAppDispatch();
    const modal = useAppSelector(selectModals);
    const isOpen = modal.modalType === 'newTask';

    const onClose = () => dispatch(closeModal());
    const handleSubmit = () => {
        const now = Date.now();
        const newTask: Task = {
            id: now,
            title: taskTitle,
            description: taskDescription,
            completed: false,
            createdDate: now
        };

        dispatch(addTask(newTask));
        dispatch(addTaskToTable({tableId: currentTableId, taskId: newTask.id}));

        setTaskTitle('');
        setTaskDescription('');

        onClose();
    }

    return (
        <Modal isOpen={isOpen}>
            <div className='flex flex-col gap-2 w-64'>
                <label className='text-textPrimary'>Create new Task</label>
                <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} type="text"
                       className='bg-textPrimary text-center' placeholder='Title'/>
                <input value={taskDescription} onChange={e => setTaskDescription(e.target.value)} type="text"
                       className='bg-textPrimary text-center' placeholder='Description'/>
                <button onClick={handleSubmit}
                        className='bg-accent text-textPrimary rounded-md cursor-pointer duration-200 hover:bg-hoverAccent'>Create
                </button>
            </div>
        </Modal>
    )
}

export default NewTaskModal;