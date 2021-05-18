import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../asset/appLogo.png'

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
						<li className='nav-item'>
							<Link
								className='nav-link active text-light'
								aria-current='page'
								to='/'
							>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link text-light' to='/workout'>
								Workout
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link text-light' to='/calendar'>
								Calendar
							</Link>
						</li>
						<li className='nav-item float-end'>
							<Link className='nav-link text-light' to='/breathe'>
								Breathe
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
