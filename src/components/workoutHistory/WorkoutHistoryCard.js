import moment from 'moment'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const WorkoutHistoryCard = ({ data, onAction }) => {
	return (
		<>
			<div className='d-flex row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-md-4 p-2 mt-2'>
				{data.map((item) => (
					<div key={item.id} className='col'>
						<div
							className='card historyCard text-center text-custom-color5 bg-custom-color2 border-custom-color4 my-2'
							style={{ boxShadow: '2px 2px 5px' }}
						>
							<div className='card-body d-flex justify-content-between'>
								<div>
									<p className='card-text text-start'>
										<ins>{item.title}</ins>
										<br />
										Day:{' '}
										<i>{moment(item.start).format('dddd, MMMM Do YYYY')}</i>
										<br />
										Start Time: <i>{moment(item.start).format('h:mm:ss A')}</i>
										<br />
										End Time: <i>{moment(item.end).format('h:mm:ss A')}</i>
										<br />
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
								<div>
									<FontAwesomeIcon
										className='text-custom-color6'
										icon={faTrash}
										onClick={() => onAction(item.id)}
									/>
								</div>
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
