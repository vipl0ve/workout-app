import React from 'react'

const ExternalLink = ({ url, title }) => {
	const confirm = () => {
		var confirmation = window.confirm('This is an external link. Are you sure?')
		if (confirmation) {
			window.open(url, '_blank').focus()
		}
	}

	return (
		<>
			<span className='text-custom-color6' onClick={confirm}>
				<ins>{title}</ins>
			</span>
		</>
	)
}

export default ExternalLink
