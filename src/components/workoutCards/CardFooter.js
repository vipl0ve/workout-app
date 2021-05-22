import React from 'react'
import Timer from '../utils/Timer'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardFooter = ({ time, onAction }) => {
	return (
		<>
			<div className='card-footer bg-transparent border-custom-color4 d-flex flex-row justify-content-between align-items-end'>
				<div className='col col-6 text-center'>
					<span className='badge bg-custom-color6'>
						{/* <b>Workout Duration:</b> */}
						<FontAwesomeIcon icon={faClock} />
						<Timer
							className='badge bg-custom-color6 fs-6'
							data={time}
							type={'no-badge'}
						/>
					</span>
				</div>
				<div className='col col-6 text-center'>
					<button className='btn btn-custom-color6' onClick={onAction}>
						<b>End Workout</b>
					</button>
				</div>
			</div>
		</>
	)
}

export default CardFooter
