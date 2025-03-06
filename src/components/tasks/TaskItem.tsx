import {Task} from "../../types/Task.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {removeTaskFromTable} from "../../features/tableSlice.ts";
import {removeTask, setCurrentTask} from "../../features/taskSlice.ts";
import {openModal} from "../../features/modalSlice.ts";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

interface TaskItemProps {
    tableId: number;
    task: Task;
}

const TaskItem = ({task, tableId}: TaskItemProps) => {
    const dispatch = useAppDispatch();

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: task.id
    })

    const style = {
        transform: CSS.Translate.toString(transform)
    }

    const openTaskInfo = () => {
        dispatch(setCurrentTask(task));
        dispatch(openModal('infoTask'));
    };

    const deleteTask = () => {
        dispatch(removeTaskFromTable({taskId: task.id, tableId: tableId}));
        dispatch(removeTask({taskId: task.id}));
    };

    return (
        <div className="p-4 border border-white/10 rounded-lg shadow-sm flex justify-between"
             style={style} ref={setNodeRef} >
            <div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">{task.title}</h5>
                <p className="mb-3 font-normal text-gray-400">{task.description}</p>
            </div>
            <div className='flex flex-col justify-around'>
                <button {...listeners} {...attributes}>
                    <img src="svg/move.svg" alt="move" className='w-4 h-4 cursor-pointer'/>
                </button>
                <button onClick={openTaskInfo}>
                    <img src="svg/info.svg" alt="info" className='w-4 h-4 cursor-pointer'/>
                </button>
                <button onClick={deleteTask}>
                    <img src="svg/bin.svg" alt="bin" className='w-4 h-4 cursor-pointer'/>
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
