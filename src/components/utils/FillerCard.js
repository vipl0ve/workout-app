import React from 'react'
import Stopwatch from '../utils/Stopwatch'

const FillerCard = ({ settings, exerciseType, changeFillerModule }) => {
	const onCompleted = () => {
		changeFillerModule('nofiller')
	}

	return (
		<div className='card text-center'>
			<div className='card-header'>
				{exerciseType} starts in {settings.beforeExercise}s
			</div>
			<Stopwatch
				data={settings.beforeExercise}
				timerCompletedStatus={onCompleted}
			/>
		</div>
	)
}

export default FillerCard
