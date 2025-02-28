import {FC} from "react";
import {Table} from "../../types/Table.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {openModal} from "../../features/modalSlice.ts";
import {clearTasksFromTable, removeTable, setCurrentTableId} from "../../features/tableSlice.ts";
import TaskList from "../tasks/TaskList.tsx";

interface TableItemProps {
    table: Table;
}

const TableItem: FC<TableItemProps> = ({table}) => {
    const dispatch = useAppDispatch();

    const taskHandler = (tableId: number) => {
        dispatch(setCurrentTableId({tableId: tableId}));
        dispatch(openModal('task'));
    }

    return (
        <div className='flex flex-col border border-white/10 rounded-xl p-2'>
            <div className='w-96 h-[600px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-neutral-500'>
                <h3 className='font-bold text-center text-xl'>{table.title}</h3>
                <TaskList table={table} taskHandler={taskHandler}/>
            </div>
            <div className='flex flex-row justify-around items-center h-[40px]'>
                <button onClick={() => taskHandler(table.id)} className='cursor-pointer'>Add Task
                </button>
                <button onClick={()=>dispatch(clearTasksFromTable({tableId: table.id}))} className='cursor-pointer'>Clear Tasks</button>
                <button onClick={() => dispatch(removeTable({tableId: table.id}))} className='cursor-pointer'>Delete
                    Table
                </button>
            </div>
        </div>
    )
}

export default TableItem;