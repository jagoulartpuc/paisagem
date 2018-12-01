import React from 'react'

export const show_stringify = (props) => {
    return <pre>{JSON.stringify(props, null, 2)}</pre>
}