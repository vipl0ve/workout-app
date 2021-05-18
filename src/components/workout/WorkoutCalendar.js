import React, { useState, useEffect } from 'react'
import moment from 'moment'

const WorkoutCalendar = () => {
	const [eventsList] = useState(
		JSON.parse(localStorage.getItem('bodyworkout')) || [
			{
				id: 0,
				title: 'Test Event title',
				duration: '130',
				start: '2015-03-31T04:00:00.000Z',
				end: '2015-04-01T04:00:00.000Z',
			},
			{
				id: 1,
				title: 'Test2 Event Title',
				duration: '130',
				start: '2015-04-09T04:00:00.000Z',
				end: '2015-04-10T04:00:00.000Z',
			},
		]
	)

	const workoutaggregation = () => {
		const workoutAgg = {
			totalWorkoutCount: eventsList.length,
			totalWorkoutDuration: eventsList
				.map((i) => parseInt(i.duration))
				.reduce((total, num) => total + num),
			totalWorkoutWeek: eventsList.filter((item) => {
				var date = new Date(item.start)
				return (
					date >= moment().startOf('week') && date <= moment().endOf('week')
				)
			}).length,
		}
		return workoutAgg
	}

	const [workoutAgg] = useState(workoutaggregation())

	useEffect(() => {}, [eventsList])

	return (
		<div className='container bg-custom-color1'>
			<h1 className='text-center text-custom-color6'>Workout Calendar</h1>
			<div className='d-flex text-center justify-content-around m-3'>
				<h6 className='col text-custom-color5'>
					Total Workouts: <ins>{workoutAgg.totalWorkoutCount}</ins>
				</h6>
				<h6 className='col text-custom-color5'>
					Current Week: <ins>{workoutAgg.totalWorkoutWeek}</ins>
				</h6>
				<h6 className='col text-custom-color5'>
					Total Duration:{' '}
					<ins>
						{moment
							.utc(
								moment
									.duration(workoutAgg.totalWorkoutDuration, 'seconds')
									.as('milliseconds')
							)
							.format('mm:ss')}
					</ins>
				</h6>
			</div>
			<hr />
			<div className='row row-cols-1 row-cols-md-2 g-4'>
				{eventsList
					.slice(0)
					.reverse()
					.map((item) => (
						<div key={item.id} className='col'>
							<div className='card h-100 text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
								<div className='card-header bg-transparent border-custom-color4'>
									<h5 className='card-title'>{item.title}</h5>
								</div>
								<div className='card-body'>
									<p className='card-text'>
										Day:{' '}
										<i>{moment(item.start).format('dddd, MMMM Do YYYY')}</i>
									</p>
									<p className='card-text'>
										Start Time: <i>{moment(item.start).format('h:mm:ss A')}</i>
									</p>
									<p className='card-text'>
										End Time: <i>{moment(item.end).format('h:mm:ss A')}</i>
									</p>
									<p className='card-text'>
										Total Duration:{' '}
										<i>
											{moment
												.utc(
													moment
														.duration(item.duration, 'seconds')
														.as('milliseconds')
												)
												.format('mm:ss')}
										</i>
									</p>
								</div>
								<div className='card-footer bg-transparent border-custom-color4'>
									<small className='text-muted'>
										Exercise completed {moment(item.end).fromNow()}
									</small>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default WorkoutCalendar
