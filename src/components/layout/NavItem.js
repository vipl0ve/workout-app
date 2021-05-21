import React from 'react'
import { Link } from 'react-router-dom'

export const NavItem = ({ title, to, active }) => {
	return (
		<>
			{active ? (
				<li className='nav-item'>
					<Link
						className='nav-link active text-light'
						to={to}
						aria-current='page'
					>
						{title}
					</Link>
				</li>
			) : (
				<li className='nav-item'>
					<Link className='nav-link text-light' to={to}>
						{title}
					</Link>
				</li>
			)}
		</>
	)
}

export default NavItem
