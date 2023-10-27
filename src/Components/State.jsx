import React from 'react'

export default function State({ state, value, border }) {
    return (
        <div className={`one-third ${border}`}>
            <div className="stat">{state}</div>
            <div className="stat-value">{value}</div>
        </div>
    )
}
