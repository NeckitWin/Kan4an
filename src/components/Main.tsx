import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {addTable, selectTables} from "../features/tableSlice.ts";
import {useState} from "react";
import Modal from "./Modal.tsx";

const Main = () => {
    const tables = useAppSelector(selectTables);
    const [isModal, setIsModal] = useState(false);
    const dispatch = useAppDispatch();
    const [tableTitle, setTableTitle] = useState("")
    const tableHandler = () => {
        setIsModal(false)
        dispatch(addTable({id: Date.now(), title: tableTitle, tasks: []}));
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
                    {tables.length > 0 ? (
                        tables.map(table => (
                            <div className='border border-white/10 rounded-3xl p-2'>
                            <table className='h-[600px] w-96'>
                                <thead className='text-center font-bold text-xl'>{table.title}</thead>
                                <tbody>
                                {table.tasks.map((task) => (
                                    <tr>{task.title}</tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        ))
                    ) : null}

                    <button onClick={() => setIsModal(true)}
                            className='h-[600px] text-8xl w-96 border border-white/10 rounded-3xl flex items-center justify-center cursor-pointer'>
                        +
                    </button>
                </div>
            </div>

            <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
                <div className='flex flex-col gap-2 w-64'>
                    <label className='text-textPrimary'>Create new Table</label>
                    <input onChange={e => setTableTitle(e.target.value)} type="text"
                           className='bg-textPrimary text-center'/>
                    <button onClick={tableHandler}
                            className='bg-accent text-textPrimary rounded-md cursor-pointer duration-200 hover:bg-hoverAccent'>Create
                    </button>
                </div>
            </Modal>
        </section>
    )
}

export default Main;