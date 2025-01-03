const als_logo = "/images/als_logo_wheel.png";
type HeaderProps = {
    title?: string;
}
export default function Header({
    title
}: HeaderProps) {
    return (
        <header className="w-full border-b-slate-300 border-b flex items-center h-8 py-8 justify-center space-x-4">
            <img src={als_logo} className="h-8 w-auto"/>
            <h1 className="text-4xl text-sky-700">{title}</h1>
        </header>
    )
}