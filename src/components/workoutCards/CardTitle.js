import React from 'react'

const CardTitle = ({
	name,
	type,
	qty,
	progression,
	curSet,
	totalSets,
	reps,
}) => {
	if (progression) {
		if (type === 'Reps') {
			return (
				<>
					<h5 className='card-title text-center text-custom-color5'>
						{name + ' [' + curSet + '/' + totalSets + ']'}:
						{' ' + reps[curSet - 1]}x
					</h5>
				</>
			)
		} else if (type === 'Duration') {
			return (
				<>
					<h5 className='card-title text-center text-custom-color5'>
						{name + ' [' + curSet + '/' + totalSets + ']'}:
						{' ' + reps[curSet - 1]}s
					</h5>
				</>
			)
		} else {
			return null
		}
	} else {
		if (type === 'Reps') {
			return (
				<>
					<h5 className='card-title text-center text-custom-color5'>
						{name}: {qty}s
					</h5>
				</>
			)
		} else if (type === 'Duration') {
			return (
				<>
					<h5 className='card-title text-center text-custom-color5'>
						{name}: {qty}x
					</h5>
				</>
			)
		} else {
			return null
		}
	}
}

export default CardTitle
