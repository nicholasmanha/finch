import { Breadcrumb  } from "./types"

type TiledFooterProps = {
    breadcrumbs?: Breadcrumb[]
}
export default function TiledFooter({
    breadcrumbs,
    ...props
}: TiledFooterProps) {
    return (
        <div className="w-full h-8 " {...props}>
            <div className="flex space-x-2">
                {breadcrumbs && 
                    breadcrumbs.map((item, index) => {
                        return (
                            <p key={index}>{item.label} {index < breadcrumbs.length - 1 && '>'}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}