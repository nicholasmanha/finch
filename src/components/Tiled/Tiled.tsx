import TiledHeader from "./TiledHeader"
import TiledColumns from "./TiledColumns"
import TiledPreview from "./TiledPreview"
import TiledFooter from "./TiledFooter"

type TiledProps = {

}
export default function Tiled({
    ...props
}: TiledProps) {


    return (
        <div className="w-screen border h-screen flex justify-center items-center" {...props}>
            <div className="flex flex-col min-w-[500px] max-w-[1000px] w-1/2 max-h-[2000px] min-h-[700px] h-1/2 border border-green-600">
                <TiledHeader />
                <div className="w-full flex min-h-0 flex-grow border border-red-300">
                    <TiledColumns />
                    <TiledPreview />
                </div>
                <TiledFooter />
            </div>
        </div>
    )
}