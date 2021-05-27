import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { secondFormatted } from '../../helper/helperfunctions'

const Timer = ({ data, type, className }) => {
	const [totalTime, setTotalTime] = useState(data)

	useEffect(() => {
		setTotalTime(data)
	}, [data])

	if (type === 'badge') {
		return (
			<>
				<FontAwesomeIcon icon={faStopwatch} />
				<span className={className}>{secondFormatted(totalTime)}</span>
			</>
		)
	} else if (type === 'no-badge') {
		return <span className={className}>{secondFormatted(totalTime)}</span>
	}
}

export default Timer
