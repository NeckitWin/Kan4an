import TaskModal from "./tasks/TaskModal.tsx";
import TableModal from "./tables/TableModal.tsx";
import TableList from "./tables/TableList.tsx";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {closeTableModal, closeTaskModal, selectModals} from "../features/modalSlice.ts";

const Main = () => {
    const modals = useAppSelector(selectModals);
    const dispatch = useAppDispatch();

    return (
        <section
            className="mx-auto container mt-12 bg-contentBack p-8 rounded-xl border-b-2 border-accent/50 shadow-lg">
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-center text-textPrimary">
                Your <span className="font-extrabold text-accent">Kanban+</span> tables
            </h2>

            <TableList />

            <TableModal isOpen={modals.tableModalOpen} onClose={()=>dispatch(closeTableModal())} />
            <TaskModal isOpen={modals.taskModalOpen} onClose={()=>dispatch(closeTaskModal())} />
        </section>
    )
}

export default Main;