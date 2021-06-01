import React, { useCallback, useEffect, useState } from 'react'
import Stopwatch from '../utils/Stopwatch'

const FillerCard = ({
	settings,
	exercise,
	Speak,
	speakStatus,
	speakSettings,
	setFillerModule,
}) => {
	const [initialize, setInitialize] = useState(true)
	const speakText = useCallback(() => {
		console.log('speakText')
		if (speakStatus) {
			Speak.cancel()
			Speak.speak({
				text: `${exercise} Exercise will starts in ${settings.beforeExercise} seconds`,
				voice: speakSettings.voice || Speak.voices[speakSettings.voiceIndex],
				rate: speakSettings.rate,
				pitch: speakSettings.pitch,
			})
		}
	}, [
		Speak,
		exercise,
		settings.beforeExercise,
		speakSettings.pitch,
		speakSettings.rate,
		speakSettings.voice,
		speakSettings.voiceIndex,
		speakStatus,
	])

	useEffect(() => {
		if (initialize) {
			setInitialize(false)
			speakText()
		}
	}, [initialize, speakText])

	const onCompleted = () => {
		Speak.cancel()
		setFillerModule(false)
	}

	return (
		<div className='maincontainer container d-flex flex-column justify-content-center'>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-body'>
					<h5 className='card-title'>
						Get Ready! <br />
						<br />
						{exercise} Exercise will starts in {settings.beforeExercise}s
					</h5>
					<Stopwatch
						data={settings.beforeExercise}
						speakStatus={speakStatus}
						timerCompletedStatus={onCompleted}
					/>
				</div>
			</div>
		</div>
	)
}

export default FillerCard
