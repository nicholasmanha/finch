import alsLogo from '@/assets/alsLogo.png';


export type HubHeaderProps = {
    title?: string;
    logoUrl?: string;
}
export default function HubHeader({title="ALS COMPUTING HUB", logoUrl=alsLogo}: HubHeaderProps) {
    return (
    <header className="bg-white h-16 flex justify-between items-center">
        <div className="flex items-center space-x-6 ml-6">
            <img src={logoUrl} className="h-10 aspect-square"/>
            <h1 className="text-sky-950 text-2xl font-semibold">{title}</h1>
        </div>
    </header>
    )
}