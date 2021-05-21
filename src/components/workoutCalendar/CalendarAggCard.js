import moment from 'moment'
import React from 'react'

const CalendarAggCard = ({ data }) => {
	return (
		<>
			<div className='d-flex text-center justify-content-around m-3'>
				<h6 className='col text-custom-color5'>
					Total Workouts: <ins>{data.totalWorkoutCount}</ins>
				</h6>
				<h6 className='col text-custom-color5'>
					Workouts (Cur Week): <ins>{data.totalWorkoutWeek}</ins>
				</h6>
				<h6 className='col text-custom-color5'>
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

export default CalendarAggCard
