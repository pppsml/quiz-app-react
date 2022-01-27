import React from 'react'
import { Style } from 'util'

interface ButtonProps {
    className?: string,
    children?: React.ReactNode,
    onClick?: () => void,
    outline?: boolean, 
    title?: string,
    style?: object,
}

const Button: React.FC<ButtonProps> = ({children, className, onClick, outline, title, style}) => {
    const classes = ['btn__styled']
    if ( className ) {
        classes.push(...className.split(' '))
    }

    return <button 
        title={title}
        className={`${classes.join(' ')} ${outline ? 'btn__styled--outline' : ''}`} 
        onClick={onClick} 
        style={style}
    >
        {children}
    </button>
}

export default Button
