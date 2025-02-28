import {useState, FC} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {Task} from "../../types/Task.ts";
import {addTask} from "../../features/taskSlice.ts";
import {addTaskToTable} from "../../features/tableSlice.ts";
import Modal from "../base/Modal.tsx";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    tableId: number;
}

const TaskModal: FC<TaskModalProps> = ({isOpen, onClose, tableId}) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const dispatch = useAppDispatch();
    const handleSubmit = () => {
        const now = Date.now();
        const newTask: Task = {
            id: now,
            title: taskTitle,
            description: taskDescription,
            completed: false,
            createdDate: now
        }

        dispatch(addTask(newTask));
        dispatch(addTaskToTable({tableId: tableId, taskId: newTask.id}))

        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='flex flex-col gap-2 w-64'>
                <label className='text-textPrimary'>Create new Task</label>
                <input onChange={e => setTaskTitle(e.target.value)} type="text"
                       className='bg-textPrimary text-center'/>
                <input onChange={e => setTaskDescription(e.target.value)} type="text"
                       className='bg-textPrimary text-center'/>
                <button onClick={handleSubmit}
                        className='bg-accent text-textPrimary rounded-md cursor-pointer duration-200 hover:bg-hoverAccent'>Create
                </button>
            </div>
        </Modal>
    )
}

export default TaskModal;