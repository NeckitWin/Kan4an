import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {addTable, removeTable, selectTables} from "../features/tableSlice.ts";
import {useMemo, useState} from "react";
import Modal from "./base/Modal.tsx";
import {selectTasks} from "../features/taskSlice.ts";
import {Task} from "../types/Task.ts";
import TaskModal from "./tasks/TaskModal.tsx";

const Main = () => {
    const tables = useAppSelector(selectTables);
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();
    const [isModalTable, setIsModalTable] = useState(false);
    const [isModalTask, setIsModalTask] = useState(false);
    const [tableTitle, setTableTitle] = useState("");
    const [currentTableId, setCurrentTableId] = useState(0);

    const taskMap = useMemo(() => {
        return tasks.reduce((acc, task) => {
            acc[task.id] = task;
            return acc;
        }, {} as Record<number, Task>)
    }, [tasks])

    const tableHandler = () => {
        setIsModalTable(false);
        dispatch(addTable({id: Date.now(), title: tableTitle, tasksIds: []}));
    }

    const taskHandler = (tableId: number) => {
        setCurrentTableId(tableId);
        setIsModalTask(true);
    }

    const deleteTable = (tableId: number) => {
        dispatch(removeTable({tableId: tableId}))
    }

    return (
        <section
            className="mx-auto container mt-12 bg-contentBack p-8 rounded-xl border-b-2 border-accent/50 shadow-lg">
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-center text-textPrimary">
                Your <span className="font-extrabold text-accent">Kanban+</span> tables
            </h2>
            <div
                className='container flex flex-row bg-secondaryBack mt-8 text-textPrimary p-4 rounded-lg overflow-x-auto gap-10'>
                <div className="flex gap-4">
                    {tables.map(table => (
                        <div key={table.id} className='border border-white/10 rounded-xl p-2'>
                            <table className='h-[600px] w-96'>
                                <thead>
                                <tr>
                                    <th className='text-center w-full font-bold p-2 text-xl border-b border-white/10'>
                                        {table.title}
                                    </th>
                                </tr>
                                </thead>
                                <tbody className='align-top'>
                                {table.tasksIds.map((taskId) => {
                                    const task = taskMap[taskId];
                                    return (
                                        <tr key={task.id} className='h-max'>
                                            <td className='h-max'>
                                                <h3>{task.title}</h3>
                                                {task.description}
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <th>
                                        <button onClick={() => taskHandler(table.id)}
                                                className='w-full border border-accent duration-300 hover:bg-hoverAccent hover:-translate-y-0.5 rounded-xl h-12 mt-2 cursor-pointer text-center'>
                                            <span className='font-bold text-2xl'>+</span>
                                        </button>
                                    </th>
                                </tr>
                                </tbody>
                            </table>
                            <div className='flex flex-row justify-around'>
                                <button onClick={() => taskHandler(table.id)} className='cursor-pointer'>Add Task
                                </button>
                                <button className='cursor-pointer'>Clear Tasks</button>
                                <button onClick={() => deleteTable(table.id)} className='cursor-pointer'>Delete Table
                                </button>
                            </div>
                        </div>
                    ))}

                    <button onClick={() => setIsModalTable(true)}
                            className='h-[640px] text-8xl text-white/10 hover:text-white/50 w-96 border border-white/10 duration-300 hover:border-white/50 border-dashed rounded-xl flex items-center justify-center cursor-pointer'>
                        +
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalTable} onClose={() => setIsModalTable(false)}>
                <div className='flex flex-col gap-2 w-64'>
                    <label className='text-textPrimary'>Create new Table</label>
                    <input onChange={e => setTableTitle(e.target.value)} type="text"
                           className='bg-textPrimary text-center'/>
                    <button onClick={tableHandler}
                            className='bg-accent text-textPrimary rounded-md cursor-pointer duration-200 hover:bg-hoverAccent'>Create
                    </button>
                </div>
            </Modal>

            <TaskModal isOpen={isModalTask} onClose={()=>setIsModalTask(false)} tableId={currentTableId}/>
        </section>
    )
}

export default Main;