import React, { CSSProperties } from 'react'

type RelatedDispProps = {
    style?: CSSProperties
}

function RelatedDisp({
    style
}: RelatedDispProps) {
    return (
        <div style={style}>RelatedDisp</div>
    )
}

export default RelatedDisp