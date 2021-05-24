import React from 'react'
import { Link } from 'react-router-dom'

const ColoredLink = ({ route, title }) => {
	return (
		<>
			<Link className='text-custom-color6' to={route}>
				{title}
			</Link>
		</>
	)
}

export default ColoredLink
