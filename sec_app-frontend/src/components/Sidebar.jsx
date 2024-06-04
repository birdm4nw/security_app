import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import VpnLockIcon from '@mui/icons-material/VpnLock';

export const SidebarContext = createContext(); 

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="mt-2 mb-4 p-4 pb-2 flex justify-between items-center">
                    <VpnLockIcon sx={{ fontSize: 35, ml: 2}} />
                    <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>
                <div className="border-t flex p-3">

                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold">Artificial Vision Project</h4>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    );
}

import { NavLink } from 'react-router-dom';

export function SidebarItem({ icon, text, to, alert }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <li className="relative">
            <NavLink
                to={to}
                exact
                className="flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group text-gray-600 hover:bg-indigo-50"
                activeClassName="bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            >
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                    {text}
                </span>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>
                )}
                {!expanded && (
                    <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                        {text}
                    </div>
                )}
            </NavLink>
        </li>
    );
}
