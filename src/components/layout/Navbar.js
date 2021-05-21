import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../asset/appLogo.png'
import NavItem from './NavItem'

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-custom-color6'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					<img src={logo} alt='' width='auto' height='50' />
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<NavItem title='Home' to='/' active={true} />
						<NavItem title='Workout' to='/workout' active={false} />
						<NavItem title='Calendar' to='/calendar' active={false} />
						<NavItem title='Breathe' to='/breathe' active={false} />
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
