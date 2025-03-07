import NewTaskModal from "./modal/NewTaskModal.tsx";
import TableModal from "./modal/TableModal.tsx";
import TableList from "./tables/TableList.tsx";
import TaskInfoModal from "./modal/TaskInfoModal.tsx";

const Main = () => {

    return (
        <section
            className="mx-auto container mt-12 bg-contentBack p-8 rounded-xl border-b-2 border-accent/50 shadow-lg">
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-center text-textPrimary">
                Your <span className="font-extrabold text-accent">Kanban+</span> tables
            </h2>

            <TableList />

            <TableModal />
            <NewTaskModal />
            <TaskInfoModal />
        </section>
    )
}

export default Main;