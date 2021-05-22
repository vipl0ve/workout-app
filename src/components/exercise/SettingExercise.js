import React from 'react'

const SettingExercise = ({ keyname, data }) => {
	return (
		<li className='list-group-item bg-custom-color2 px-2'>
			<div className='d-flex flex-row align-items-start justify-content-between'>
				<div className='col col-9 text-start'>
					<p className='mb-1 text-custom-color6'>{keyname}</p>
				</div>
				<div className='col col-3 text-end'>
					<p className='mb-1 text-custom-color6'>{data + 's'}</p>
				</div>
			</div>
		</li>
	)
}

export default SettingExercise
