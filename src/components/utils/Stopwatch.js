import React, { useState } from 'react'
import ReactSvgTimer from 'react-svg-timer'
import DoubleBeep from '../../asset/double-beep.mp3'
import Beep from '../../asset/beep.mp3'

const Stopwatch = ({ data, speakStatus, timerCompletedStatus }) => {
	var beepAudio = new Audio(Beep)
	var dBeepAudio = new Audio(DoubleBeep)

	const [resetRequested, setResetRequested] = useState(false)
	const [logMilliseconds] = useState(false)

	const onComplete = (status) => {
		// if (speakStatus) {
		// 	dBeepAudio.play()
		// }
		dBeepAudio.play()
		setResetRequested(true)
		timerCompletedStatus()
	}

	const timerValue = (value) => {
		if (logMilliseconds) {
			console.log(value)
		}
		if (value === data * 500) {
			beepAudio.play()
		}
	}

	return (
		<div className='d-flex flex-column justify-content-center align-items-center'>
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
