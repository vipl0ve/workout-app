import React from 'react'
import $ from 'jquery'
import { Link, useLocation } from 'react-router-dom'
import NavItem from './NavItem'

const Navbar = () => {
	let location = useLocation()
	// handleClick
	const handleNavClick = (e) => {
		e.preventDefault()
		if ($('#navbarSupportedContent').hasClass('show')) {
			$('#navbarSupportedContent').removeClass('show')
		} else {
			$('#navbarSupportedContent').addClass('show')
		}
	}

	if (location.pathname !== '/login') {
		return (
			<nav className='navbar navbar-expand-lg navbar-dark bg-custom-color6'>
				<div
					className='collapse navbar-collapse w-100 order-1 order-lg-0'
					id='navbarSupportedContent'
					onClick={handleNavClick}
				>
					<ul className='navbar-nav me-auto text-center border-top border-custom-color2'>
						<NavItem title='Home' to='/' />
						<NavItem title='Workout' to='/workout' />
						<NavItem
							title='Workout History'
							to='/workouthistory'
							active={false}
						/>
						<NavItem title='Breathe' to='/breathe' />
						<NavItem title='BW Calculator' to='/calculator' />
					</ul>
				</div>
				<div className='d-flex w-100 order-0'>
					<div className='w-100'>
						<button
							className='navbar-toggler mx-2'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarSupportedContent'
							aria-controls='navbarSupportedContent'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<span className='navbar-toggler-icon'></span>
						</button>
					</div>
					<Link className='navbar-brand w-100' to='/'>
						<h2 className='text-custom-color2'>BodyWeight App</h2>
					</Link>
					<span className='w-100'></span>
				</div>
				<span className='w-100'></span>
			</nav>
		)
	} else {
		return null
	}
}

export default Navbar
