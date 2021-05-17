import React from 'react'

const SettingExercise = ({ keyname, value }) => {
	return (
		<li key={keyname} className='list-group-item'>
			<div className='d-flex justify-content-between'>
				<p className='mb-1'>{keyname}</p>
				<p>{value + 's'}</p>
			</div>
		</li>
	)
}

export default SettingExercise
