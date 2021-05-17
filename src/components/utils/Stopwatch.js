import React, { useState } from 'react'
import ReactSvgTimer from 'react-svg-timer'

const Stopwatch = ({ data, timerCompletedStatus }) => {
	const [resetRequested, setResetRequested] = useState(false)
	const [logMilliseconds] = useState(false)

	const onComplete = (status) => {
		console.log('Timer Complete' + status)
		setResetRequested(true)
		timerCompletedStatus()
	}

	const timerValue = (value) => {
		if (logMilliseconds) {
			console.log(value)
		}
	}

	return (
		<div style={{ width: '40vh', height: 'auto' }}>
			<ReactSvgTimer
				timerCount={parseInt(data)}
				countdownColor='#847762'
				innerColor='#ffffff'
				outerColor='#463e31'
				resetTimerRequested={resetRequested}
				completeTimer={onComplete}
				timerDuration={timerValue}
				displayCountdown={true}
			/>
		</div>
	)
}

export default Stopwatch
