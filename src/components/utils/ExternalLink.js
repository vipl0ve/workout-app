import React from 'react'
import { Link } from 'react-router-dom'

const ExternalLink = ({ url, title }) => {
	return (
		<>
			<Link
				to={{
					pathname: { url },
				}}
				target='_blank'
			>
				{title}
			</Link>
		</>
	)
}

export default ExternalLink
