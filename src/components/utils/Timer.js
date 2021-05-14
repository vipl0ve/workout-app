import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { pad } from '../../helper/helperfunctions'

const Timer = ({ data, type }) => {
	const [totalTime, setTotalTime] = useState(data)
	const [formatTime, setformatTime] = useState({
		hours: '00',
		minutes: '00',
		seconds: '00',
	})

	useEffect(() => {
		setTotalTime(data)
	}, [data])

	useEffect(() => {
		formatTimer(totalTime)
	}, [totalTime])

	const formatTimer = (timer) => {
		const newTimer = parseInt(timer)
		let newFormatTime = { hours: '0', minutes: '0', seconds: '0' }

		if (newTimer > 0) {
			newFormatTime = {
				hours: pad(Math.floor((newTimer / (60 * 60)) % 24), 2),
				minutes: pad(Math.floor((newTimer / 60) % 60), 2),
				seconds: pad(Math.floor(newTimer % 60), 2),
			}
			setformatTime(newFormatTime)
		}
	}

	if (type === 'badge') {
		return (
			<div>
				<FontAwesomeIcon icon={faStopwatch} />
				<span className='badge rounded-pill bg-info text-dark'>
					{formatTime.hours}:{formatTime.minutes}:{formatTime.seconds}
				</span>
			</div>
		)
	} else if (type === 'no-badge') {
		return (
			<span>
				{formatTime.hours}:{formatTime.minutes}:{formatTime.seconds}
			</span>
		)
	}
}

export default Timer
