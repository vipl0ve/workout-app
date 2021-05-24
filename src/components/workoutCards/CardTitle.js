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
					<h5 className='card-title text-center text-custom-color5 mb-3'>
						{exerciseName + ' : ' + name + ' ' + reps[curSet - 1]}x
					</h5>
				)}
				{!progression && (
					<h5 className='card-title text-center text-custom-color5'>
						{name}: {qty}x
					</h5>
				)}
			</>
		)
	} else if (type === 'Duration') {
		return (
			<>
				{progression && (
					<h5 className='card-title text-center text-custom-color5 mb-3'>
						{exerciseName + ' : ' + name + ' ' + reps[curSet - 1]}s
					</h5>
				)}
				{!progression && (
					<h5 className='card-title text-center text-custom-color5'>
						{name}: {qty}s
					</h5>
				)}
			</>
		)
	} else {
		return null
	}
}

export default CardTitle
