import { Breadcrumb } from "./types";
import { getDefaultTiledUrl } from "./apiClient";
//import blueskyLogo from "../../assets/bluesky-logo.png";
import blueskyLogo from "./bluesky_logo.png"


const chevronLeft = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>;
const chevronRight = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>;

const defaultUrl = getDefaultTiledUrl();


type TiledHeaderProps = {
    breadcrumbs?: Breadcrumb[];
    onLeftArrowClick?: Function;
    onRightArrowClick?: Function;
    onHomeClick?: Function;
    imageUrl?: string;
    title?: string;
    secondaryTitle?: string;
}
export default function TiledHeader({
    breadcrumbs=[],
    onLeftArrowClick,
    onRightArrowClick,
    onHomeClick,
    imageUrl=blueskyLogo,
    title="Tiled",
    secondaryTitle=defaultUrl,
    ...props
}: TiledHeaderProps) {
    //console.log('render TiledHeader.tsx');

    type ArrowProps = {
        onClick?: Function;
        icon: JSX.Element;
    }
    const Arrow = ({onClick, icon}: ArrowProps) => {
        return (
            <div 
                className={`w-6 aspect-square flex-shrink-0 ${onClick ? 'hover:text-slate-400 hover:cursor-pointer text-slate-600' : 'text-slate-200' } `} 
                onClick={onClick ? ()=>onClick() : ()=>{}}
            >
                {icon}
            </div>
        )
    }

    return (
        <div className="flex w-full min-h-14 pb-2 pt-2 relative pl-4 " {...props}>
            <div className="flex items-end w-1/4">
                <Arrow onClick={onLeftArrowClick} icon={chevronLeft}/>
                <Arrow onClick={onRightArrowClick} icon={chevronRight} />
                <p className="truncate"> {breadcrumbs.length > 0 && breadcrumbs[breadcrumbs.length - 1].label }</p>
            </div>
            
            <div onClick={onHomeClick ? ()=>onHomeClick() : ()=>{}} className="flex items-end justify-center space-x-4 mx-auto absolute left-1/2 transform -translate-x-1/2 hover:cursor-pointer hover:opacity-70"> 
                <img  src={imageUrl} className="w-16 h-auto "/> 
                <div className="flex items-center gap-4">
                    <h2 className="text-sky-900 font-semibold text-lg">{title}</h2> 
                    <p className="text-sm">{secondaryTitle}</p>
                </div>
            </div>

        </div>
    )
}