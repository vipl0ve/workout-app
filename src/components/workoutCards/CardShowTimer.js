import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import Stopwatch from '../utils/Stopwatch'

const CardShowTimer = ({
	activity,
	exercise,
	curSet,
	Speak,
	speakStatus,
	speakSettings,
	settings,
	timerCompleted,
	timerSkiped,
}) => {
	const [initialize, setInitialize] = useState(true)

	const speakText = useCallback(() => {
		console.log('speakText')
		if (speakStatus) {
			if (activity === 'RestSet') {
				Speak.speak({
					text: `Rest for ${settings.betweenSet} seconds between Sets. Next, ${exercise.curProgressions.name} Set: ${curSet}`,
					voice: Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			} else if (activity === 'RestExercise') {
				Speak.speak({
					text: `Rest for ${settings.betweenExercise} seconds between Exercises. Next, ${exercise.curProgressions.name} Set: ${curSet}`,
					voice: Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			}
		}
	}, [
		Speak,
		activity,
		curSet,
		exercise.curProgressions.name,
		settings.betweenExercise,
		settings.betweenSet,
		speakSettings.pitch,
		speakSettings.rate,
		speakSettings.voiceIndex,
		speakStatus,
	])

	useEffect(() => {
		if (initialize) {
			setInitialize(false)
			speakText()
		}
	}, [initialize, speakText])

	return (
		<>
			<div className='maincontainer container d-flex flex-column justify-content-center'>
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
							speakStatus={speakStatus}
							timerCompletedStatus={timerCompleted}
						/>
						<button
							type='button'
							className='btn btn-custom-color6 text-custom-color1 mb-5'
							onClick={timerSkiped}
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
