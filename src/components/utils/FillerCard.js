import React from 'react'
import Stopwatch from '../utils/Stopwatch'

const FillerCard = ({ settings, exercise, setFillerModule }) => {
	const onCompleted = () => {
		setFillerModule(false)
	}

	return (
		<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
			<div className='card-header bg-transparent border-custom-color4'>
				{exercise} starts in {settings.beforeExercise}s
			</div>
			<Stopwatch
				data={settings.beforeExercise}
				timerCompletedStatus={onCompleted}
			/>
		</div>
	)
}

export default FillerCard
