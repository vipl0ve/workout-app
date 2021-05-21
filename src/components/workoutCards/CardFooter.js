import { faHandPaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Timer from '../utils/Timer'

const CardFooter = ({ time, onAction }) => {
	return (
		<>
			<div className='card-footer bg-transparent border-custom-color4 d-flex justify-content-between align-items-center'>
				<span>
					<Timer
						className='badge bg-custom-color4 fs-6'
						data={time}
						type={'no-badge'}
					/>
				</span>
				<button className='btn btn-custom-color6' onClick={onAction}>
					End Workout <FontAwesomeIcon icon={faHandPaper} />
				</button>
			</div>
		</>
	)
}

export default CardFooter
