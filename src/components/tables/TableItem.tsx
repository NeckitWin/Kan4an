import {FC} from "react";
import {Table} from "../../types/Table.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {openTaskModal} from "../../features/modalSlice.ts";
import {removeTable, setCurrentTableId} from "../../features/tableSlice.ts";
import TaskList from "../tasks/TaskList.tsx";

interface TableItemProps {
    table: Table;
}

const TableItem: FC<TableItemProps> = ({table}) => {
    const dispatch = useAppDispatch();

    const taskHandler = (tableId: number) => {
        dispatch(setCurrentTableId({tableId: tableId}));
        dispatch(openTaskModal());
    }

    return (
        <div key={table.id} className='border border-white/10 rounded-xl p-2'>
            <table className='h-[600px] w-96'>
                <thead>
                <tr>
                    <th className='text-center w-full font-bold p-2 text-xl border-b border-white/10'>
                        {table.title}
                    </th>
                </tr>
                </thead>
                <TaskList table={table} taskHandler={taskHandler} />
            </table>
            <div className='flex flex-row justify-around'>
                <button onClick={() => taskHandler(table.id)} className='cursor-pointer'>Add Task
                </button>
                <button className='cursor-pointer'>Clear Tasks</button>
                <button onClick={() => dispatch(removeTable({tableId: table.id}))} className='cursor-pointer'>Delete Table
                </button>
            </div>
        </div>
    )
}

export default TableItem;