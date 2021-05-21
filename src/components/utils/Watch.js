import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { pad } from '../../helper/helperfunctions'

const Watch = ({
	data,
	className,
	play,
	onComplete,
	onPause,
	settings,
	currentId,
}) => {
	const [timer, setTimer] = useState(0)
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
		if (play) {
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
	}, [play, timer, onComplete, totalTime])

	const timerPaused = () => {
		onPause(!play)
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

	if (timer <= totalTime) {
		if (settings === 'hms') {
			return (
				<span className={className} onClick={timerPaused}>
					{formatTime.hours}:{formatTime.minutes}:{formatTime.seconds}
					{!play && <FontAwesomeIcon icon={faPause} />}
				</span>
			)
		} else if (settings === 'hm') {
			return (
				<span className={className} onClick={timerPaused}>
					{formatTime.hours}:{formatTime.minutes}
					{!play && <FontAwesomeIcon icon={faPause} />}
				</span>
			)
		} else if (settings === 'ms') {
			return (
				<span className={className} onClick={timerPaused}>
					{formatTime.minutes}:{formatTime.seconds}
					{!play && <FontAwesomeIcon icon={faPause} />}
				</span>
			)
		} else {
			return (
				<span className={className} onClick={timerPaused}>
					{formatTime.seconds}
					{!play && <FontAwesomeIcon icon={faPause} />}
				</span>
			)
		}
	} else if (isNaN(timer)) {
		return (
			<span className={className} onClick={timerPaused}>
				00:00
				{!play && <FontAwesomeIcon icon={faPause} />}
			</span>
		)
	} else {
		return (
			<span className={className} onClick={timerPaused}>
				{formatTime.minutes}:{formatTime.seconds}
				{!play && <FontAwesomeIcon icon={faPause} />}
			</span>
		)
	}
}

export default Watch
