//const bluesky_logo ='/images/bluesky_logo.png';
const chevronLeft = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>;
const chevronRight = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>;



type TiledHeaderProps = {

}
export default function TiledHeader({
    ...props
}: TiledHeaderProps) {
    return (
        <div className="flex border border-sky-500 w-full min-h-14 pb-2 pt-2 relative " {...props}>
            <div className="flex items-end w-1/4">
                <div className="w-6 aspect-square hover:text-slate-400 hover:cursor-pointer">{chevronLeft}</div>
                <div className="w-6 aspect-square hover:text-slate-400 hover:cursor-pointer">{chevronRight}</div>
                <p> [] image</p>
            </div>
            
            <div className="flex items-end justify-center space-x-4 mx-auto absolute left-1/2 transform -translate-x-1/2"> 
                <img src="/images/bluesky_logo.png" className="w-16 h-auto"/> 
                <div className="flex items-center gap-4">
                    <h2 className="text-sky-900 font-semibold text-lg">Tiled</h2> 
                    <p className="text-sm">127.0.0.1:8000/api/v1</p>
                </div>
            </div>

        </div>
    )
}