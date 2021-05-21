import React from 'react'

const SettingExercise = ({ keyname, data }) => {
	return (
		<li className='list-group-item bg-custom-color3'>
			<div className='d-flex justify-content-between'>
				<p className='mb-1 text-light'>{keyname}</p>
				<p className='mb-1 text-light'>{data + 's'}</p>
			</div>
		</li>
	)
}

export default SettingExercise
