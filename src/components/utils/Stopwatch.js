import React, { useState } from 'react'
import ReactSvgTimer from 'react-svg-timer'

const Stopwatch = ({ data, timerCompletedStatus }) => {
	const [resetRequested, setResetRequested] = useState(false)
	const [logMilliseconds] = useState(false)

	const onComplete = (status) => {
		setResetRequested(true)
		timerCompletedStatus()
	}

	const timerValue = (value) => {
		if (logMilliseconds) {
			console.log(value)
		}
	}

	return (
		<div
			className={'d-flex justify-content-center'}
			style={{ width: '40vh', height: 'auto' }}
		>
			<ReactSvgTimer
				timerCount={parseInt(data)}
				countdownColor='#9c6644'
				innerColor='#e6ccb2'
				outerColor='#7f5539'
				resetTimerRequested={resetRequested}
				completeTimer={onComplete}
				timerDuration={timerValue}
				displayCountdown={true}
			/>
		</div>
	)
}

export default Stopwatch
