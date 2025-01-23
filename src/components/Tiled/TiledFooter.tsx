import { Paths, pathsSample } from "./types"

type TiledFooterProps = {
    Paths?: Paths
}
export default function TiledFooter({
    Paths= pathsSample,
    ...props
}: TiledFooterProps) {
    return (
        <div className="w-full h-8 border border-sky-600" {...props}>
            <div className="flex space-x-2">
                {Paths && 
                    Paths.map((item, index) => {
                        return (
                            <p key={index}>{item.id} {index < Paths.length - 1 && '>'}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}