type MainProps = {
    children?: JSX.Element
};

export default function Main({
    children
}: MainProps) {
    return (
        <main className="flex-grow bg-slate-500 overflow-auto z-0">
            {children}
        </main>
    )
}