import React from 'react'
import Timer from '../utils/Timer'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardFooter = ({ time, onAction }) => {
	return (
		<>
			<div className='card-footer bg-transparent border-custom-color4 d-flex flex-row justify-content-between align-items-center'>
				<div className='col col-6 text-center'>
					<span className='text-custom-color6'>
						<FontAwesomeIcon icon={faClock} />{' '}
						<Timer data={time} type={'no-badge'} />
					</span>
				</div>
				<div className='col col-6 text-center'>
					<button
						className='btn btn-custom-color6 text-custom-color1'
						onClick={onAction}
					>
						<b>End Workout</b>
					</button>
				</div>
			</div>
		</>
	)
}

export default CardFooter
