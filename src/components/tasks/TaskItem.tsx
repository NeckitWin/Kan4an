import {Task} from "../../types/Task.ts";
import {FC} from "react";

interface TaskItemProps {
    task: Task;
}

const TaskItem: FC<TaskItemProps> = ({task}) => {
    return (
        <tr key={task.id} className='h-12'>
            <td>
                <h3 className='font-bold'>{task.title}</h3>
                {task.description}
            </td>
        </tr>
    )
}

export default TaskItem;