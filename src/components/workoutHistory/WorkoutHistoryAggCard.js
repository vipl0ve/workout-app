import moment from 'moment'
import React from 'react'

const WorkoutHistoryAggCard = ({ data }) => {
	return (
		<>
			<div className='d-flex text-center justify-content-around'>
				<h6 className='text-custom-color4'>
					Total Count: <ins>{data.totalWorkoutCount}</ins>
				</h6>
				<h6 className='text-custom-color4'>
					Total Duration:{' '}
					<ins>
						{data.totalWorkoutDuration
							? moment
									.utc(
										moment
											.duration(data.totalWorkoutDuration, 'seconds')
											.as('milliseconds')
									)
									.format('mm:ss')
							: '00:00'}
					</ins>
				</h6>
			</div>
		</>
	)
}

export default WorkoutHistoryAggCard
