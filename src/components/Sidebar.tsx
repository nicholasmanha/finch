import React from "react";

type SidebarProps = {
    children?: React.ReactNode;
    color?: `bg-${string}`
}
export default function Sidebar({
    children,
    color='bg-slate-200',
    ...props
}: SidebarProps) {
    return (
        <aside className={`w-64 ${color} h-[calc(100vh-4rem)] shadow-right z-10`} {...props}>
            {children}
        </aside>
    )
}