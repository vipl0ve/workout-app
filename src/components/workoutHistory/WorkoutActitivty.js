import React from 'react'

const WorkoutActitivtyDay = ({ data, status }) => {
	if (status) {
		return (
			<span
				className='bg-custom-color6 text-custom-color1 border border-custom-color6'
				style={{ width: '14.3%' }}
			>
				{data}
			</span>
		)
	} else {
		return (
			<span
				className='bg-custom-color1 text-muted border border-custom-color6'
				style={{ width: '14.3%' }}
			>
				{data}
			</span>
		)
	}
}

const WorkoutActitivty = ({ data }) => {
	return (
		<>
			<div className='d-flex text-center justify-content-around mt-3 border border-custom-color6'>
				{Object.keys(data).map((key) => (
					<WorkoutActitivtyDay key={key} status={data[key]} data={key} />
				))}
			</div>
		</>
	)
}

export default WorkoutActitivty
