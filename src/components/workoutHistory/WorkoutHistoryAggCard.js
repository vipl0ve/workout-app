import moment from 'moment'
import React from 'react'

const WorkoutHistoryAggCard = ({ data }) => {
	return (
		<>
			<div className='d-flex text-center justify-content-around mt-3'>
				<h6 className='text-custom-color5'>
					Total Count: <ins>{data.totalWorkoutCount}</ins>
				</h6>
				<h6 className='text-custom-color5'>
					Total Duration:{' '}
					<ins>
						{data.totalWorkoutDuration
							? moment(new Date(new Date().setHours(0, 0, 0, 0)))
									.add(data.totalWorkoutDuration, 'seconds')
									.format('HH:mm:ss')
							: '00:00:00'}
					</ins>
				</h6>
			</div>
		</>
	)
}

export default WorkoutHistoryAggCard
