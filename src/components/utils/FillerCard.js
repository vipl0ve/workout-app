import React, { useEffect } from 'react'
import Stopwatch from '../utils/Stopwatch'
import Speak from './Speak'

const FillerCard = ({ settings, exercise, speak, setFillerModule }) => {
	useEffect(() => {
		if (speak) {
			Speak({
				text: `${exercise} Exercise will starts in ${settings.beforeExercise} seconds`,
				voiceIndex: 1,
			})
		}
	}, [exercise, settings.beforeExercise, speak])

	const onCompleted = () => {
		setFillerModule(false)
	}

	return (
		<div
			className='containerExercise d-flex flex-column justify-content-center'
			style={{ minHeight: '90vh', width: 'auto' }}
		>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-body'>
					<h5 className='card-title'>
						Get Ready! <br />
						<br />
						{exercise} Exercise will starts in {settings.beforeExercise}s
					</h5>
					<Stopwatch
						data={settings.beforeExercise}
						speak={speak}
						timerCompletedStatus={onCompleted}
					/>
				</div>
			</div>
		</div>
	)
}

export default FillerCard
