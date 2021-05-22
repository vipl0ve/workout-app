import React from 'react'
import { Link } from 'react-router-dom'

export const NavItem = ({ title, to, active }) => {
	return (
		<>
			{active ? (
				<li
					className='nav-item'
					// data-bs-toggle='collapse'
					// data-bs-target='#navbarSupportedContent'
				>
					<Link className='nav-link active text-custom-color1' to={to}>
						{title}
					</Link>
				</li>
			) : (
				<li
					className='nav-item'
					// data-bs-toggle='collapse'
					// data-bs-target='#navbarSupportedContent'
				>
					<Link className='nav-link text-custom-color1' to={to}>
						{title}
					</Link>
				</li>
			)}
		</>
	)
}

export default NavItem
