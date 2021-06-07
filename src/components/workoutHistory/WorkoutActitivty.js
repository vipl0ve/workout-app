import React from 'react'

const WorkoutActitivtyDay = ({ item }) => {
	if (item.status) {
		return (
			<div
				className='bg-custom-color6 text-custom-color1 border border-custom-color6 rounded-3'
				style={{ width: '10%' }}
			>
				<span className='small'>{item.shortName}</span>
				<br />
				<span className='small'>{item.date}</span>
			</div>
		)
	} else {
		return (
			<div
				className='bg-custom-color2 text-custom-color4 border border-custom-color6 rounded-3'
				style={{ width: '10%' }}
			>
				<span className='small'>{item.shortName}</span>
				<br />
				<span className='small'>{item.date}</span>
			</div>
		)
	}
}

const WorkoutActitivty = ({ data }) => {
	const count = data.reduce((counter, obj) => {
		if (obj.status === true) counter += 1
		return counter
	}, 0)

	return (
		<>
			<div className='bg-custom-color2 border border-custom-color6 rounded-3 px-2 py-4'>
				<div className='text-center'>
					<h5 className='text-custom-color6'>My Week: {count} Workouts</h5>
				</div>
				<div className='d-flex text-center justify-content-around mt-3'>
					{data.map((item) => (
						<WorkoutActitivtyDay key={item.id} item={item} />
					))}
				</div>
			</div>
		</>
	)
}

export default WorkoutActitivty
