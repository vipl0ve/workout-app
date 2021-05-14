import React from 'react'
import ReactCountdownClock from 'react-countdown-clock'

const Stopwatch = ({ data }) => {
	const myCallback = () => {
		console.log('Timer Over')
	}

	return (
		<ReactCountdownClock
			seconds={parseInt(data)}
			color='#000'
			alpha={0.9}
			size={300}
			onComplete={myCallback}
		/>
	)
}

export default Stopwatch
