import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Stopwatch from '../utils/Stopwatch'

const CardShowTimer = ({
	activity,
	exercise,
	curSet,
	settings,
	timerCompleted,
	timerSkip,
}) => {
	return (
		<>
			<div
				className='containerExercise d-flex flex-column justify-content-center'
				style={{ minHeight: '90vh', width: 'auto' }}
			>
				<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
					<div className='card-body'>
						{activity === 'RestSet' ? (
							<>
								<h5 className='card-title'>Rest {settings.betweenSet}s!</h5>
								<h5 className='card-title'>
									Next Exercise: {exercise.curProgressions.name} Set: {curSet}
								</h5>
							</>
						) : (
							<>
								<h5 className='card-title'>
									Rest {settings.betweenExercise}s!
								</h5>
								<h5 className='card-title'>
									Next Exercise: {exercise.curProgressions.name} Set: {curSet}
								</h5>
							</>
						)}
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
							className='btn btn-custom-color6 mb-5'
							onClick={timerSkip}
						>
							Skip Rest <FontAwesomeIcon icon={faStepForward} />
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default CardShowTimer
