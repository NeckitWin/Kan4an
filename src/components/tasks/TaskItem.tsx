import {Task} from "../../types/Task.ts";
import {FC} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {removeTaskFromTable} from "../../features/tableSlice.ts";
import {removeTask} from "../../features/taskSlice.ts";

interface TaskItemProps {
    tableId: number;
    task: Task;
}

const TaskItem: FC<TaskItemProps> = ({task, tableId}) => {
    const dispatch = useAppDispatch();

    const deleteTask = () => {
        dispatch(removeTaskFromTable({taskId: task.id, tableId: tableId}));
        dispatch(removeTask({taskId: task.id}))
    }
    return (
        <div className="p-4 border border-white/10 rounded-lg shadow-sm flex justify-between">
            <div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">{task.title}</h5>
                <p className="mb-3 font-normal text-gray-400">{task.description}</p>
            </div>
            <div className='flex flex-col justify-around'>
                <button>
                    <img src="svg/move.svg" alt="move" className='w-4 h-4 cursor-pointer'/>
                </button>
                <button>
                    <img src="svg/info.svg" alt="info" className='w-4 h-4 cursor-pointer'/>
                </button>
                <button onClick={deleteTask}>
                    <img src="svg/bin.svg" alt="bin" className='w-4 h-4 cursor-pointer'/>
                </button>
            </div>
        </div>
    )
}

export default TaskItem;