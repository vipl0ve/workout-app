import React from 'react'
import { Link } from 'react-router-dom'

const ExternalLink = ({ url, title }) => {
	const confirm = () => {
		var confirmation = window.confirm('This is an external link. Are you sure?')
		return confirmation
	}

	return (
		<>
			<Link
				to={{
					pathname: { url },
				}}
				onClick={confirm}
				target='_blank'
			>
				{title}
			</Link>
		</>
	)
}

export default ExternalLink
