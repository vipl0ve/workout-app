import moment from 'moment'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const WorkoutHistoryCard = ({ data, onAction }) => {
	return (
		<>
			<div className='d-flex row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-md-4 border border-3 bg-custom-color4 p-2 mt-2'>
				{data.map((item) => (
					<div key={item.id} className='col'>
						<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4 my-2'>
							<div className='card-header bg-transparent border-custom-color4 d-flex justify-content-end'>
								<FontAwesomeIcon
									className='text-custom-color6'
									icon={faTrash}
									onClick={() => onAction(item.id)}
								/>
							</div>
							<div className='card-body'>
								<p className='card-text'>
									<ins>{item.title}</ins>
								</p>
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
									Duration:{' '}
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

export default WorkoutHistoryCard
