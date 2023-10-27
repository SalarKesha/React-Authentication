import React from 'react'
import State from './State'

export default function UnitStates({units, name}) {

    const states = units.map((unit, index) => <State state={unit.state} value={unit.value} border={units.length==index+1 && "no-border"} />)

    return (
        <div className={`clash-card__unit-stats clash-card__unit-stats--${name} clearfix`}>
            {states}
        </div>

    )
}
