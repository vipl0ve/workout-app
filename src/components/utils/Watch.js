import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { secondFormatted } from '../../helper/helperfunctions'
import Beep from '../../asset/beep.mp3'
var beepAudio = new Audio(Beep)

const Watch = ({
	data,
	className,
	play,
	autoPlay,
	onComplete,
	settings,
	currentId,
}) => {
	const [timer, setTimer] = useState(0)
	const [totalTime] = useState(parseInt(data))
	const countRef = useRef(null)

	useEffect(() => {
		setTimer(0)
		clearInterval(countRef.current)
	}, [currentId])

	useEffect(() => {
		if (play) {
			if (timer < totalTime) {
				countRef.current = setInterval(() => {
					setTimer(timer + 1)
				}, 1000)
				return () => {
					clearInterval(countRef.current)
				}
			} else {
				clearInterval(countRef.current)
				beepAudio.play()
				if (autoPlay) {
					setTimer(0)
					onComplete()
				}
			}
		} else {
			clearInterval(countRef.current)
		}
	}, [play, timer, onComplete, totalTime, autoPlay])

	if (timer <= totalTime) {
		if (settings === 'hms') {
			return (
				<b>
					<span className={className}>
						{secondFormatted(totalTime - timer, 'HH:mm:ss')}{' '}
						{!play && <FontAwesomeIcon icon={faPause} />}
					</span>
				</b>
			)
		} else if (settings === 'hm') {
			return (
				<b>
					<span className={className}>
						{secondFormatted(totalTime - timer, 'HH:mm')}{' '}
						{!play && <FontAwesomeIcon icon={faPause} />}
					</span>
				</b>
			)
		} else if (settings === 'ms') {
			return (
				<b>
					<span className={className}>
						{secondFormatted(totalTime - timer, 'mm:ss')}{' '}
						{!play && <FontAwesomeIcon icon={faPause} />}
					</span>
				</b>
			)
		} else if (settings === 's') {
			return (
				<b>
					<span className={className}>
						{secondFormatted(totalTime - timer, 'ss')}{' '}
						{!play && <FontAwesomeIcon icon={faPause} />}
					</span>
				</b>
			)
		} else {
			return (
				<b>
					<span className={className}>
						{secondFormatted(totalTime - timer, 'mm:ss')}{' '}
						{!play && <FontAwesomeIcon icon={faPause} />}
					</span>
				</b>
			)
		}
	} else if (isNaN(timer)) {
		return (
			<b>
				<span className={className}>
					00:00 {!play && <FontAwesomeIcon icon={faPause} />}
				</span>
			</b>
		)
	} else {
		return (
			<b>
				<span className={className}>
					{secondFormatted(totalTime - timer, 'mm:ss')}{' '}
					{!play && <FontAwesomeIcon icon={faPause} />}
				</span>
			</b>
		)
	}
}

export default Watch
