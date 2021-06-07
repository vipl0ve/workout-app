import React, { useState } from 'react'
import ReactSvgTimer from 'react-svg-timer'
import DoubleBeep from '../../asset/double-beep.mp3'
//import Beep from '../../asset/beep.mp3'
var dBeepAudio = new Audio(DoubleBeep)
//var beepAudio = new Audio(Beep)

const Stopwatch = ({ data, speakStatus, timerCompletedStatus }) => {
	const [resetRequested, setResetRequested] = useState(false)
	const [logMilliseconds] = useState(false)

	const onComplete = () => {
		if (speakStatus) {
			dBeepAudio.play()
		}
		setResetRequested(true)
		timerCompletedStatus()
	}

	const timerValue = (value) => {
		if (logMilliseconds) {
			console.log('Value:' + value)
		}
		// if (speakStatus) {
		// 	if (data > 10 && data < 20) {
		// 		if (
		// 			value === (data - 3) * 1000 ||
		// 			value === (data - 2) * 1000 ||
		// 			value === (data - 1) * 1000
		// 		) {
		// 			console.log('Timer: ' + value)
		// 			beepAudio.play()
		// 		}
		// 	} else if (data > 20) {
		// 		if (
		// 			value === (data * 1000) / 2 ||
		// 			value === (data - 5) * 1000 ||
		// 			value === (data - 4) * 1000 ||
		// 			value === (data - 3) * 1000 ||
		// 			value === (data - 2) * 1000 ||
		// 			value === (data - 1) * 1000
		// 		) {
		// 			console.log('Timer: ' + value)
		// 			beepAudio.play()
		// 		}
		// 	}
		// }
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
