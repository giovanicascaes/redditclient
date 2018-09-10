import React from 'react'

export const withProps = newProps => Component => props => (<Component {...props} {...newProps}/>)
