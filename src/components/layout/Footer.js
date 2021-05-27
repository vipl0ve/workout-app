import React from 'react'
import { useLocation } from 'react-router'

const Footer = () => {
	let location = useLocation()
	const curYear = () => new Date().getFullYear()

	if (location.pathname !== '/login') {
		return (
			<footer className='footer py-1 bg-custom-color2'>
				<div className='text-center'>
					<small className='text-muted'>
						Copyright &copy; {curYear()}. Body Workout App.
					</small>
				</div>
			</footer>
		)
	} else {
		return null
	}
}

export default Footer
