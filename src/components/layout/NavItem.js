import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const NavItem = ({ title, to }) => {
	let location = useLocation()

	if (location.pathname === to) {
		return (
			<>
				<li className='nav-item border border-custom-color4'>
					<Link
						className='nav-link active bg-custom-color2 text-custom-color6'
						to={to}
					>
						{title}
					</Link>
				</li>
			</>
		)
	} else {
		return (
			<>
				<li className='nav-item border border-custom-color4'>
					<Link className='nav-link text-custom-color1' to={to}>
						{title}
					</Link>
				</li>
			</>
		)
	}
}

export default NavItem
