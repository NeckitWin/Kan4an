import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import {DndContext} from "@dnd-kit/core";

function App() {
  return (
    <DndContext>
        <Header />
        <Main />
    </DndContext>
  )
}

export default App
