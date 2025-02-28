import {FC, useMemo} from "react";
import {Task} from "../../types/Task.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {selectTasks} from "../../features/taskSlice.ts";
import {Table} from "../../types/Table.ts";
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
    table: Table;
    taskHandler: (tableId: number) => void
}

const TaskList: FC<TaskListProps> = ({table, taskHandler}) => {
    const tasks = useAppSelector(selectTasks);

    const taskMap = useMemo(() => {
        return tasks.reduce((acc, task) => {
            acc[task.id] = task;
            return acc;
        }, {} as Record<number, Task>)
    }, [tasks]);

    return (
        <div>
            {table.tasksIds.map((taskId) => {
                const task = taskMap[taskId];
                return (
                    <TaskItem key={taskId} task={task}/>
                )
            })}
            <button onClick={() => taskHandler(table.id)}
                    className='w-full border border-accent duration-300 hover:bg-hoverAccent hover:-translate-y-0.5 rounded-xl h-12 mt-2 cursor-pointer text-center'>
                <span className='font-bold text-2xl'>+</span>
            </button>
        </div>
    )
}

export default TaskList;