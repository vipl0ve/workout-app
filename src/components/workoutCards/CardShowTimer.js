import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import Speak from '../utils/Speak'
import Stopwatch from '../utils/Stopwatch'

const CardShowTimer = ({
	activity,
	exercise,
	curSet,
	speak,
	settings,
	timerCompleted,
	timerSkip,
}) => {
	useEffect(() => {
		if (speak) {
			Speak({
				text: `Rest for ${settings.betweenSet} seconds. Next Exercise ${exercise.curProgressions.name} Set: ${curSet}`,
				voiceIndex: 1,
			})
		}
	}, [curSet, exercise.curProgressions.name, settings.betweenSet, speak])

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
								<h5 className='card-title'>
									<p>Rest {settings.betweenSet}s!</p>
									<p>Next Exercise: {exercise.curProgressions.name}</p>
									<p>Set: {curSet}</p>
								</h5>
							</>
						) : (
							<>
								<h5 className='card-title'>
									<p>Rest {settings.betweenExercise}s!</p>
									<p>Next Exercise: {exercise.curProgressions.name}</p>
									<p>Set: {curSet}</p>
								</h5>
							</>
						)}
						<Stopwatch
							data={
								activity === 'RestSet'
									? settings.betweenSet
									: settings.betweenExercise
							}
							speak={speak}
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
