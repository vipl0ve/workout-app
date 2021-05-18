import React from 'react'

const BasicExercise = ({ data }) => {
	return (
		<li className='list-group-item bg-custom-color3'>
			<div className='d-flex justify-content-between'>
				<p className='mb-1 text-light'>{data.name}</p>
				{data.type === 'Reps' ? (
					<p className='mb-1 text-light'>{data.qty}x</p>
				) : (
					<p className='mb-1 text-light'>{data.qty}s</p>
				)}
			</div>
		</li>
	)
}

export default BasicExercise
