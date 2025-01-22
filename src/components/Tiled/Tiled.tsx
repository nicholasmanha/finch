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
            <div className="flex flex-col w-1/2 h-1/2 border border-green-600">
                <TiledHeader />
                <div className="w-full h-full flex  border border-red-300">
                    <TiledColumns />
                    <TiledPreview />
                </div>
                <TiledFooter />
            </div>
        </div>
    )
}