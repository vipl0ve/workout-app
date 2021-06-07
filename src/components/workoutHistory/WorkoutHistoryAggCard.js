import React from 'react'
import { secondFormatted } from '../../helper/helperfunctions'

const WorkoutHistoryAggCard = ({ data }) => {
	return (
		<>
			<hr />
			<div className='text-center'>
				<h5 className='text-custom-color6'>All Workouts History</h5>
			</div>
			<div className='d-flex text-center justify-content-around mt-3'>
				<h6 className='text-custom-color5'>
					Total Count: <ins>{data.totalWorkoutCount}</ins>
				</h6>
				<h6 className='text-custom-color5'>
					Total Duration:{' '}
					<ins>
						{data.totalWorkoutDuration
							? secondFormatted(data.totalWorkoutDuration, 'HH:mm:ss')
							: '00:00:00'}
					</ins>
				</h6>
			</div>
		</>
	)
}

export default WorkoutHistoryAggCard
