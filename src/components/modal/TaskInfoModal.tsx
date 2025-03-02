import Modal from "../base/Modal.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import {selectModals} from "../../features/modalSlice.ts";
import {selectCurrentTask} from "../../features/taskSlice.ts";

const dateToString = (date: number) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hours = d.getHours();
    const mins = d.getMinutes();
    return `${day}/${month}/${year} ${hours}:${mins}`;
}

const TaskInfoModal = () => {
    const task = useAppSelector(selectCurrentTask);
    const modal = useAppSelector(selectModals);
    if (!task) return null;
    const isOpen = modal.modalType === 'infoTask';
    return (
        <Modal isOpen={isOpen}>
            <div className='text-textPrimary py-4 px-8'>
                <h3 className='font-bold text-xl text-center text-accent'>{task.title}</h3>
                <p>Description: {task.description}</p>
                <p>{dateToString(task.createdDate)}</p>
                <p>completed: {task.completed ? 'yes' : 'no'}</p>
            </div>
        </Modal>
    )
}

export default TaskInfoModal;