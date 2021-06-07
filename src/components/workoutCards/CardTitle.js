import React from 'react'

const CardTitle = ({
	name,
	type,
	qty,
	progression,
	exerciseName,
	curSet,
	reps,
}) => {
	if (type === 'Reps') {
		return (
			<>
				{progression && (
					<h5 className='card-title lead text-center text-custom-color5 mb-3'>
						<b>{exerciseName + ' : ' + name + ' ' + reps[curSet - 1]}x</b>
					</h5>
				)}
				{!progression && (
					<h5 className='card-title  lead text-center text-custom-color5'>
						<b>
							{name}: {qty}x
						</b>
					</h5>
				)}
			</>
		)
	} else if (type === 'Duration') {
		return (
			<>
				{progression && (
					<h5 className='card-title lead text-center text-custom-color5 mb-3'>
						<b>{exerciseName + ' : ' + name + ' ' + reps[curSet - 1]}s</b>
					</h5>
				)}
				{!progression && (
					<h5 className='card-title  lead text-center text-custom-color5'>
						<b>
							{name}: {qty}s
						</b>
					</h5>
				)}
			</>
		)
	} else {
		return null
	}
}

export default CardTitle
