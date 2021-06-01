import React, { useState, useEffect } from 'react'
import { secondFormatted } from '../../helper/helperfunctions'

const Timer = ({ data, className }) => {
	const [totalTime, setTotalTime] = useState(data)

	useEffect(() => {
		setTotalTime(data)
	}, [data])

	return (
		<span className={className}>{secondFormatted(totalTime, 'HH:mm:ss')}</span>
	)
}

export default Timer
