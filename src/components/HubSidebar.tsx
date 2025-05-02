import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

import { RouteItem } from "@/types/navigationRouterTypes";

export type HubSidebarProps = {
    routes: RouteItem[];
    className?: string;
}
export default function HubSidebar({routes, className}: HubSidebarProps) {
    const navStyles = 'flex flex-col items-center justify-center h-20 aspect-square rounded-lg text-white hover:bg-sky-800 cursor-pointer';
    return (
        <aside className={cn("row-span-2 bg-sky-950 flex flex-col py-4", className)}>
            {routes.map((item, index) => 
                <div key={index} className="flex flex-col items-center">
                    <NavLink 
                        to={item.path}
                        className={({isActive}) =>
                            isActive ? cn(navStyles, "bg-sky-300 text-black") : navStyles
                        }
                    >
                        {item.icon}
                        <span className="font-light">{item.label}</span>
                    </NavLink>
                    <div className="h-[1px] w-10/12 border-b border-white/50 my-4"></div>
                </div>
            )}
        </aside>
    )
}