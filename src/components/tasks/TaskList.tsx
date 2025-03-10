import {useMemo} from "react";
import {Task} from "../../types/Task.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {selectTasks} from "../../features/taskSlice.ts";
import {Table} from "../../types/Table.ts";
import TaskItem from "./TaskItem.tsx";
import {useDroppable} from "@dnd-kit/core";

interface TaskListProps {
    table: Table;
    taskHandler: (tableId: number) => void
}

const TaskList = ({table, taskHandler}: TaskListProps) => {
    const tasks = useAppSelector(selectTasks);
    const {setNodeRef} = useDroppable({id: table.id});

    const taskMap = useMemo(() => {
        return tasks.reduce((acc, task) => {
            acc[task.id] = task;
            return acc;
        }, {} as Record<number, Task>)
    }, [tasks]);

    return (
        <ul ref={setNodeRef}
            className='h-[550px] px-2 flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-neutral-500'>
            {table.tasksIds.map((taskId) => {
                const task = taskMap[taskId];
                return (
                    <TaskItem key={taskId} tableId={table.id} task={task}/>
                )
            })}
            <li>
                <button onClick={() => taskHandler(table.id)}
                        className='w-full border border-accent duration-300 hover:bg-hoverAccent/10 hover:-translate-y-0.5 rounded-lg shadow-sm shadow-hoverAccent min-h-12 mt-2 cursor-pointer text-center'>
                    <span className='font-bold text-2xl'>+</span>
                </button>
            </li>
        </ul>
    )
}

export default TaskList;