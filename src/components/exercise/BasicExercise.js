import React from 'react'

const BasicExercise = ({ data }) => {
	return (
		<li className='list-group-item bg-custom-color2 px-2'>
			<div className='d-flex flex-row align-items-start justify-content-between'>
				<div className='col col-9 text-start'>
					<p className='mb-1 text-custom-color6 fs-6'>
						<small>{data.name}</small>
					</p>
				</div>
				<div className='col col-3 text-end'>
					{data.type === 'Reps' ? (
						<p className='mb-1 text-custom-color6 fs-6 '>
							<small>{data.qty}x</small>
						</p>
					) : (
						<p className='mb-1 text-custom-color6 fs-6 small'>
							<small>{data.qty}s</small>
						</p>
					)}
				</div>
			</div>
		</li>
	)
}

export default BasicExercise
