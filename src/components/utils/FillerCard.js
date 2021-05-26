import React, { useEffect } from 'react'
import Stopwatch from '../utils/Stopwatch'
import Speak from './Speak'

const FillerCard = ({ settings, exercise, setFillerModule }) => {
	useEffect(() => {
		Speak({
			text: `${exercise} Exercise will starts in ${settings.beforeExercise} second`,
			voiceIndex: 1,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onCompleted = () => {
		Speak({ text: 'Timer Ended', voiceIndex: 1 })
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
						timerCompletedStatus={onCompleted}
					/>
				</div>
			</div>
		</div>
	)
}

export default FillerCard
