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

	useEffect(() => {}, [eventsList])

	return (
		<div className='row row-cols-1 row-cols-md-2 g-4'>
			{eventsList
				.slice(0)
				.reverse()
				.map((item) => (
					<div key={item.id} className='col'>
						<div className='card h-100'>
							<div className='card-body'>
								<h5 className='card-title'>{item.title}</h5>
								<p className='card-text'>
									Day: {moment(item.start).format('dddd, MMMM Do YYYY')}
								</p>
								<p className='card-text'>
									Start Time: {moment(item.start).format('h:mm:ss A')}
								</p>
								<p className='card-text'>
									End Time: {moment(item.end).format('h:mm:ss A')}
								</p>
								<p className='card-text'>
									Total Duration:{' '}
									{moment
										.utc(
											moment
												.duration(item.duration, 'seconds')
												.as('milliseconds')
										)
										.format('HH:mm:ss')}
								</p>
							</div>
							<div className='card-footer'>
								<small className='text-muted'>
									Last exercise was {moment(item.end).fromNow()}
								</small>
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default WorkoutCalendar
