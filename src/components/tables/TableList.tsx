import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTables} from "../../features/tableSlice.ts";
import {openTableModal} from "../../features/modalSlice.ts";
import TableItem from "./TableItem.tsx";

const TableList = () => {
    const tables = useAppSelector(selectTables);
    const dispatch = useAppDispatch();

    return (
        <div
            className='container flex flex-row bg-secondaryBack mt-8 text-textPrimary p-4 rounded-lg overflow-x-auto gap-10'>
            <div className="flex gap-4">
                {tables.map(table => (
                    <TableItem table={table}/>
                ))}

                <button onClick={() => dispatch(openTableModal())}
                        className='h-[640px] text-8xl text-white/10 hover:text-white/50 w-96 border border-white/10
                         duration-300 hover:border-white/50 border-dashed rounded-xl
                         flex items-center justify-center cursor-pointer'>+</button>
            </div>
        </div>
    )
}

export default TableList;