import React from 'react'

import NavItem from './NavItem'

import { IPath } from '../../App'

interface NavbarProps {
    paths: IPath[]
}

const Navbar: React.FC<NavbarProps> = React.memo(({paths}) => {
    return (
        <aside className="sidebar">
            <nav className="navigation">
                <ul className="nav__list">
                    {paths.map((pathObj, i) => (
                        <NavItem {...pathObj} key={pathObj.title + i} />
                    ))}
                </ul>
            </nav>
        </aside>
    )
})

export default Navbar
