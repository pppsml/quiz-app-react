import React from 'react'

interface ButtonProps {
    className?: string,
    children?: React.ReactNode,
    onClick?: () => void,
    outline?: boolean, 
}

const Button: React.FC<ButtonProps> = ({children, className, onClick, outline}) => {
    const classes = ['btn__styled']
    if ( className ) {
        classes.push(...className.split(' '))
    }

    return <button 
        className={`${classes.join(' ')} ${outline ? 'btn__styled--outline' : ''}`} 
        onClick={onClick} 
    >
        {children}
    </button>
}

export default Button
