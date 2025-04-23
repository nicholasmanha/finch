import { cn } from "@/lib/utils";

type PaperProps = {
    size?: 'small' | 'medium' | 'large',
    title?: string,
    className?: string,
    children?: React.ReactNode,
}
export default function Paper({size="medium", title, className, children }: PaperProps) {
    const sizeClass = {
        small: 'w-32 h-32',
        medium: 'w-64 h-64',
        large: 'w-96 h-96'
    };
    return (
        <article className={cn(`bg-white shadow-lg ${sizeClass[size]}`, className)}>
            {title && <h3 className="w-full text-sky-900 font-medium text-center my-2">{title}</h3>}
            {children}
        </article>
    )
}