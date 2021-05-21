import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Stopwatch from '../utils/Stopwatch'

const CardShowTimer = ({ activity, settings, timerCompleted, timerSkip }) => {
	return (
		<>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header bg-transparent border-custom-color4'>
					{activity === 'RestSet'
						? 'Next Set >> Rest ' + settings.betweenSet + 's'
						: 'Next Exercise >> Rest ' + settings.betweenExercise + 's'}
				</div>
				<Stopwatch
					data={
						activity === 'RestSet'
							? settings.betweenSet
							: settings.betweenExercise
					}
					timerCompletedStatus={timerCompleted}
				/>
				<button
					type='button'
					className='btn btn-custom-color6'
					onClick={timerSkip}
				>
					Skip Rest <FontAwesomeIcon icon={faStepForward} />
				</button>
			</div>
		</>
	)
}

export default CardShowTimer
