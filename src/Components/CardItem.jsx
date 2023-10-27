import React from 'react'

export default function CardItem({type, children}) {
    return (
        <div className={type}>{children}</div>
    )
}
