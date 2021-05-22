import React from 'react'
import { Link } from 'react-router-dom'

const LinkBtn = ({ route, title }) => {
	return (
		<>
			<Link className='btn btn-outline-custom-color6' to={route}>
				{title}
			</Link>
		</>
	)
}

export default LinkBtn
