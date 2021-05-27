import React from 'react'

const PageHeader = ({ text }) => {
	return (
		<>
			<h5 className='text-center text-custom-color6 mb-3'>
				<b>{text}</b>
			</h5>
		</>
	)
}

export default PageHeader
