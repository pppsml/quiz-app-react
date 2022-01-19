import React from 'react'

const Button: React.FC = ({children, className, onClick}) => {
    const classes = ['btn__styled', ...className.split(' ')]
    return <button onCLick={onClick}>{children}</button>
}

export default Button
