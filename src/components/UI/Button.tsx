import React from 'react'
import { Style } from 'util'

interface ButtonProps {
    type?: 'submit' | 'reset' | 'button' | undefined;
    className?: string,
    children?: React.ReactNode,
    onClick?: ({}:any) => any,
    outline?: boolean, 
    circle?: boolean,
    disabled?: boolean,
    title?: string,
    style?: object,
}

const Button: React.FC<ButtonProps> = ({children, className, onClick, outline, circle, title, style, type, disabled = false}) => {
    const classes = ['btn__styled']
    if ( className ) {
        classes.push(...className.split(' '))
    }

    return <button 
        disabled={disabled}
        title={title}
        type={type ? type : 'button'}
        className={`${classes.join(' ')} ${outline ? 'btn__styled--outline' : ''} ${circle ? 'btn__styled--circle' : ''}`} 
        onClick={onClick} 
        style={style}
    >
        {children}
    </button>
}

export default Button
