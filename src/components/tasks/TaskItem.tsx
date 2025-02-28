import {Task} from "../../types/Task.ts";
import {FC} from "react";

interface TaskItemProps {
    task: Task;
}

const TaskItem: FC<TaskItemProps> = ({task}) => {

    return (
        <div className={`h-12`}>
                <h3 className='font-bold'>{task.title}</h3>
                {task.description}
        </div>
    )
}

export default TaskItem;