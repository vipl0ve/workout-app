import React from 'react'

const BasicExercise = ({ data }) => {
	return (
		<li className='list-group-item'>
			<div className='d-flex justify-content-between'>
				<p className='mb-1'>{data.name}</p>
				{data.type === 'Reps' ? <p>{data.qty}x</p> : <p>{data.qty}s</p>}
			</div>
		</li>
	)
}

export default BasicExercise
