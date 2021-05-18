import React from 'react'

const SettingExercise = ({ keyname, value }) => {
	return (
		<li key={keyname} className='list-group-item bg-custom-color3'>
			<div className='d-flex justify-content-between'>
				<p className='mb-1 text-light'>{keyname}</p>
				<p className='mb-1 text-light'>{value + 's'}</p>
			</div>
		</li>
	)
}

export default SettingExercise
