import React from 'react'
import { Link } from 'react-router-dom'
import NavItem from './NavItem'

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-custom-color6'>
			<div
				className='collapse navbar-collapse w-100 order-1 order-lg-0'
				id='navbarSupportedContent'
			>
				<ul className='navbar-nav me-auto mb-2 mb-lg-0 text-center'>
					<NavItem title='Home' to='/' active={true} />
					<NavItem title='Workout' to='/workout' active={false} />
					<NavItem
						title='Workout History'
						to='/workouthistory'
						active={false}
					/>
					<NavItem title='Breathe' to='/breathe' active={false} />
					<NavItem title='BW Report' to='/calculator' active={false} />
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
}

export default Navbar
