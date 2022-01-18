import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavItemProps {
    path: string,
    title: string,
    icon: JSX.Element,
}

const NavItem: React.FC<NavItemProps> = ({path, title, icon}) => {
    const {pathname} = useLocation()
    const isCurrentLocation: boolean = pathname === path

    return (
        <li className={`nav__list-item ${isCurrentLocation ? 'active' : ''}`} title={title}>
            <b></b>
            <b></b>
            <Link to={path}>
                <span className="nav__list-icon">
                    {icon}
                </span>
                <span className="nav__list-text">{title}</span>
            </Link>
        </li>
    )
}

export default NavItem

const quizes = {
    0: {
        question: 'Какого цвета небо?',
    }
}