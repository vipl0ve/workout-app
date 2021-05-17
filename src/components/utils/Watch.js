import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faHourglassStart,
	faHourglassEnd,
	faHourglass,
} from '@fortawesome/free-solid-svg-icons'
import { pad } from '../../helper/helperfunctions'

const Watch = ({ data, className, onComplete, settings, currentId }) => {
	const [timer, setTimer] = useState(0)
	const [paused, setPaused] = useState(false)
	const [totalTime] = useState(parseInt(data))
	const countRef = useRef(null)
	const [formatTime, setformatTime] = useState({
		hours: '00',
		minutes: '00',
		seconds: '00',
	})

	useEffect(() => {
		setformatTime({
			hours: '00',
			minutes: '00',
			seconds: '00',
		})
		setTimer(0)
		clearInterval(countRef.current)
	}, [currentId])

	useEffect(() => {
		if (!paused) {
			if (timer > totalTime) {
				setformatTime({
					hours: '00',
					minutes: '00',
					seconds: '00',
				})
				setTimer(0)
				clearInterval(countRef.current)
				onComplete()
			} else {
				countRef.current = setInterval(() => {
					setTimer(timer + 1)
					formatTimer(timer)
				}, 1000)
				return () => {
					clearInterval(countRef.current)
				}
			}
		} else {
			clearInterval(countRef.current)
		}
	}, [paused, timer, onComplete, totalTime])

	const timerPaused = () => {
		setPaused(!paused)
	}

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

	if (timer === 0) {
		return <FontAwesomeIcon icon={faHourglassStart} />
	} else if (timer <= totalTime) {
		if (settings === 'hms') {
			return (
				<span className={className} onClick={timerPaused}>
					{formatTime.hours}:{formatTime.minutes}:{formatTime.seconds}
				</span>
			)
		} else if (settings === 'hm') {
			return (
				<span className={className} onClick={timerPaused}>
					{formatTime.hours}:{formatTime.minutes}
					{paused && <FontAwesomeIcon icon={faHourglass} />}
				</span>
			)
		} else if (settings === 'ms') {
			return (
				<span className={className} onClick={timerPaused}>
					{formatTime.minutes}:{formatTime.seconds}
					{paused && <FontAwesomeIcon icon={faHourglass} />}
				</span>
			)
		} else {
			return (
				<span className={className} onClick={timerPaused}>
					{formatTime.seconds}
					{paused && <FontAwesomeIcon icon={faHourglass} />}
				</span>
			)
		}
	} else if (isNaN(timer)) {
		return <FontAwesomeIcon icon={faHourglass} />
	} else {
		return <FontAwesomeIcon icon={faHourglassEnd} />
	}
}

export default Watch
