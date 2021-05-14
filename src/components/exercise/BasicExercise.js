import React from 'react'

const BasicExercise = ({ data }) => {
	return (
		<li className='list-group-item'>
			<div className='d-flex justify-content-between'>
				<p className='mb-1'>{data.name}</p>
				{data.type === 'Reps' ? <p>X {data.qty}</p> : <p>{data.qty}</p>}
			</div>
		</li>
	)
}

export default BasicExercise
