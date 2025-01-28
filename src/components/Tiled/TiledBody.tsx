import { useRef, useEffect } from "react";
import './Tiled.css';

type TiledBodyProps = {
    children?: React.ReactNode;
}

export default function TiledBody({
    children,
    ...props
}: TiledBodyProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //when columns load scroll to the right
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        } 
    }, [children]);
    return (
        <div className="w-full flex min-h-0 flex-grow border overflow-x-auto scrollbar-always-visible " ref={scrollContainerRef} {...props}>
            {children}
        </div>
    )
}