import React, { useCallback, useEffect, useState } from 'react'
import $ from 'jquery'
import NoSleep from 'nosleep.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import exerciseIcon from '../../asset/exerciseIcon.png'

const WorkoutStarted = ({
	routineInfo,
	Speak,
	speakStatus,
	speakSettings,
	nextStep,
	workoutProgress,
	setPlayStatus,
	setWorkoutProgress,
}) => {
	var noSleep = new NoSleep()
	const [initialize, setInitialize] = useState(true)

	useEffect(() => {
		$('html, body').animate(
			{
				scrollTop: $('.card').first().offset().top,
			},
			200
		)
	}, [])

	const speakText = useCallback(() => {
		console.log('speakText')
		if (speakStatus) {
			Speak.cancel()
			Speak.speak({
				text: `Start Workout!`,
				voice: Speak.voices[speakSettings.voiceIndex],
				rate: speakSettings.rate,
				pitch: speakSettings.pitch,
			})
		}
	}, [
		Speak,
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

	const onPlay = () => {
		noSleep.enable()
		setPlayStatus(true)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			play: true,
			updatedDate: Date.now(),
		})
		nextStep()
	}

	return (
		<div className='maincontainer container container d-flex flex-column justify-content-center'>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header bg-transparent border-custom-color4'>
					<h5 className='text-custom-color6'>Workout Started</h5>
				</div>
				<div className='card-body'>
					<div className='card-title'>
						<h5>{routineInfo.name}</h5>
						<small className='card-text'>Author: {routineInfo.author}</small>
					</div>
					<p className='card-text'>
						<img src={exerciseIcon} className='card-text' alt='exercise' />
					</p>
					<button
						type='button'
						className='btn btn-custom-color6 text-custom-color1'
						onClick={onPlay}
					>
						Start Workout <FontAwesomeIcon icon={faPlay} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default WorkoutStarted
