import React from 'react'
import Stopwatch from '../utils/Stopwatch'

const FillerCard = ({ settings, exercise, setFillerModule }) => {
	const onCompleted = () => {
		setFillerModule(false)
	}

	return (
		<div className='container exercise'>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-body'>
					<h5 className='card-title'>
						{exercise} starts in {settings.beforeExercise}s
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
