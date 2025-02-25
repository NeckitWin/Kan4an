import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {removeTable, selectTables} from "../features/tableSlice.ts";

const Header = () => {
    const tables = useAppSelector(selectTables);
    const dispatch = useAppDispatch();
    const clearTables = () => {
        tables.forEach(table=>{
            dispatch(removeTable(table));
        })
    }
    return (
        <header className='container mx-auto'>
            <nav
                className='flex flex-row justify-around items-center p-2 bg-contentBack text-white rounded-xl mt-4 border-b-2 border-accent/50'>

                <a href="/" className='flex items-center gap-2'>
                    <img src="icon/logoW.png" width='50' height='50' alt="logo"/>
                    <span className='text-3xl font-bold'>Kan4an</span>
                </a>
                <ul className='flex gap-8 text-lg'>
                    <li><button onClick={clearTables} className='cursor-pointer'>Reset All</button></li>
                    <li><button className='cursor-pointer'>Reset Tasks</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;