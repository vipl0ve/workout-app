import React, { useState, useEffect, useRef } from 'react'
import bgBreathe from '../../asset/bgBreathe.jpg'
import './Breathe.css'

const Breathe = () => {
	const [totalTime] = useState(7500)
	const [breatheTime] = useState((totalTime / 5) * 2)
	const [holdTime] = useState(totalTime / 5)
	const [text, setText] = useState('Start Breathing')
	const [contStatus, setContStatus] = useState('')
	const counter = useRef(null)
	const [startStatus, setStartStatus] = useState(false)

	const startBreathe = () => {
		setStartStatus(!startStatus)
	}

	const resetBreathe = () => {
		setStartStatus(false)
		setText('Start Breathing')
		setContStatus('')
		clearInterval(counter.current)
	}

	useEffect(() => {
		if (startStatus) {
			counter.current = setInterval(() => {
				setText('Breathe In!')
				setContStatus('Grow')
				setTimeout(() => {
					setText('Hold')
					setTimeout(() => {
						setText('Breathe Out!')
						setContStatus('Shrink')
					}, holdTime)
				}, breatheTime)
			}, totalTime)
			return () => {
				clearInterval(counter.current)
			}
		} else {
			clearInterval(counter.current)
		}
	}, [startStatus, totalTime, breatheTime, holdTime])

	const styles = {
		breathe: {
			background: `#224941 url(${bgBreathe}) no-repeat center center/cover`,
			color: '#fff',
			fontFamily: 'Montserrat, sans-serif',
			minHeight: '85vh',
			overflow: 'hidden',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			margin: 0,
		},
		svgContainer: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			margin: 'auto',
			height: 300,
			width: 300,
			top: 0,
			left: 0,
			position: 'relative',
			transform: 'scale(1)',
		},
		circle: {
			backgroundColor: '#010f1c',
			height: '100%',
			width: '100%',
			borderRadius: '75%',
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: -1,
		},
	}

	if (contStatus === '') {
		return (
			<div className='breathe' style={styles.breathe}>
				<div className='d-flex flex-row justify-content-around'>
					<button className='btn btn-primary' onClick={startBreathe}>
						{startStatus ? 'Stop' : 'Start'}
					</button>
					<button className='btn btn-primary' onClick={resetBreathe}>
						Reset
					</button>
				</div>
				<div
					className='svgContainer'
					id='svgContainer'
					style={styles.svgContainer}
				>
					<div className='circle' style={styles.circle}></div>
					<p id='text'>{text}</p>
					<div className='pointer-svgContainer'>
						<span className='pointer'></span>
					</div>
					<div className='gradient-circle'></div>
				</div>
			</div>
		)
	} else if (contStatus === 'Grow') {
		return (
			<div className='breathe' style={styles.breathe}>
				<h1>Relaxer</h1>
				<div className='d-flex flex-row justify-content-around'>
					<button className='btn btn-primary' onClick={startBreathe}>
						{startStatus ? 'Stop' : 'Start'}
					</button>
					<button className='btn btn-primary' onClick={resetBreathe}>
						Reset
					</button>
				</div>
				<div className='svgContainer grow' id='svgContainer'>
					<div className='circle'></div>
					<p id='text'>{text}</p>
					<div className='pointer-svgContainer'>
						<span className='pointer'></span>
					</div>
					<div className='gradient-circle'></div>
				</div>
			</div>
		)
	} else if (contStatus === 'Shrink') {
		return (
			<div className='breathe' style={styles.breathe}>
				<h1>Relaxer</h1>
				<div className='d-flex flex-row justify-content-around'>
					<button className='btn btn-primary' onClick={startBreathe}>
						{startStatus ? 'Stop' : 'Start'}
					</button>
					<button className='btn btn-primary' onClick={resetBreathe}>
						Reset
					</button>
				</div>
				<div className='svgContainer shrink' id='svgContainer'>
					<div className='circle'></div>
					<p id='text'>{text}</p>
					<div className='pointer-svgContainer'>
						<span className='pointer'></span>
					</div>
					<div className='gradient-circle'></div>
				</div>
			</div>
		)
	} else {
		return null
	}
}

export default Breathe
