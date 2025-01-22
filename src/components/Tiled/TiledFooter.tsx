type TiledFooterProps = {

}
export default function TiledFooter({
    ...props
}: TiledFooterProps) {
    return (
        <div className="w-full h-8 border border-sky-600" {...props}>
            tiled
        </div>
    )
}