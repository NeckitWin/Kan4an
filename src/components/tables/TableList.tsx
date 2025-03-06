import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTables} from "../../features/tableSlice.ts";
import {openModal} from "../../features/modalSlice.ts";
import TableItem from "./TableItem.tsx";
import {DndContext} from "@dnd-kit/core";

const TableList = () => {
    const tables = useAppSelector(selectTables);
    const dispatch = useAppDispatch();

    return (
        <DndContext>
            <div
                className='container flex flex-row bg-secondaryBack mt-8 text-textPrimary p-4 rounded-lg overflow-x-auto gap-4  [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-neutral-500'>
                {tables.map(table => (
                    <TableItem key={table.id} table={table}/>
                ))}
                <button onClick={() => dispatch(openModal('table'))}
                        className='h-[660px] text-8xl text-white/10 hover:text-white/50 min-w-96 border border-white/10
                         duration-300 hover:border-white/50 border-dashed rounded-xl
                         flex items-center justify-center cursor-pointer'>+
                </button>
            </div>
        </DndContext>
    )
}

export default TableList;