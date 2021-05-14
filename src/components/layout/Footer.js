import React from 'react'

const Footer = () => {
	const curYear = () => new Date().getFullYear()

	return (
		<footer className='footer py-1 bg-light'>
			<div className='text-center'>
				<span className='text-muted'>
					Copyright &copy; {curYear()}. Body Workout App.
				</span>
			</div>
		</footer>
	)
}

export default Footer
