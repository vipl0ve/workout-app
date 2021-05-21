import moment from 'moment'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faDumbbell } from '@fortawesome/free-solid-svg-icons'

const CalendarCard = ({ data, onAction }) => {
	return (
		<>
			<div className='row row-cols-1 row-cols-md-2 g-4'>
				{data.map((item) => (
					<div key={item.id} className='col'>
						<div className='card h-100 text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
							<div className='card-header bg-transparent border-custom-color4 d-flex justify-content-between'>
								<FontAwesomeIcon className='fx-6' icon={faDumbbell} />
								<h5 className='card-title'>Workout Card</h5>
								<button
									type='button'
									className='btn btn-custom-color6 p-1'
									onClick={() => onAction(item.id)}
								>
									<FontAwesomeIcon icon={faTrashAlt} />
								</button>
							</div>
							<div className='card-body'>
								<p className='card-text'>{item.title}</p>
								<p className='card-text'>
									Day: <i>{moment(item.start).format('dddd, MMMM Do YYYY')}</i>
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
		</>
	)
}

export default CalendarCard
