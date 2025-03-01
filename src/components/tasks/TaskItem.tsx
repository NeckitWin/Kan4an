import {Task} from "../../types/Task.ts";
import {FC} from "react";

interface TaskItemProps {
    task: Task;
}

const TaskItem: FC<TaskItemProps> = ({task}) => {

    return (
        <div className="p-4 border border-white/10 rounded-lg shadow-sm flex justify-between">
            <div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{task.description}</p>
            </div>
            <div className='flex flex-col justify-around'>
                <button>
                    <img src="svg/move.svg" alt="move" className='w-4 h-4' />
                </button>
                <button>
                    <img src="svg/info.svg" alt="info" className='w-4 h-4' />
                </button>
            </div>
        </div>
    )
}

export default TaskItem;