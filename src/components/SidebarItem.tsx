import React from 'react';

type SidebarItemProps = {
    children?: React.ReactNode;
    title?: string;
    icon?: JSX.Element;
    iconHeight?: `h-${string}`
    titleColor?: `text-${string}`
}
export default function SidebarItem({
    children,
    title,
    icon=<></>,
    iconHeight='h-8',
    titleColor='text-sky-900',
    ...props
}: SidebarItemProps) {
    return (
        <div {...props}>
            <h2 className={`${titleColor} font-medium text-2xl flex justify-between`}>
                <div className={`${iconHeight} aspect-square`}>{icon}</div>
                {title}
                <div className={`${iconHeight} aspect-square`}></div>
            </h2>
            <div className="text-slate-900">
                {children}  
            </div>
        </div>
    )
}