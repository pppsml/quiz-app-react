import React from 'react'

interface ButtonProps {
    type?: 'submit' | 'reset' | 'button' | undefined;
    className?: string,
    id?: string,
    children?: React.ReactNode,
    onClick?: ({}:any) => any,
    outline?: boolean, 
    circle?: boolean,
    disabled?: boolean,
    tabIndex?: number,
    title?: string,
    style?: object,
}

const Button: React.FC<ButtonProps> = ({children, className, id, onClick, outline, circle, title, tabIndex, style, type, disabled = false}) => {
    const classes = ['btn__styled']
    if ( className ) {
        classes.push(...className.split(' '))
    }

    return <button 
        disabled={disabled}
        title={title}
        id={id}
        type={type ? type : 'button'}
        className={`${classes.join(' ')} ${outline ? 'btn__styled--outline' : ''} ${circle ? 'btn__styled--circle' : ''}`} 
        onClick={onClick} 
        tabIndex={tabIndex}
        style={style}
    >
        {children}
    </button>
}

export default Button
