import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery'
//import styled from 'styled-components'
import './Breathe.css'
import Timer from '../utils/Timer'

const Breathe = () => {
	const [totalTime] = useState(7500)
	const [breatheTime] = useState((totalTime / 5) * 2)
	const [holdTime] = useState(totalTime / 5)
	const [text, setText] = useState('Get Ready!')
	const [totalDuration, setTotalDuration] = useState(0)
	const [instruction, setInstruction] = useState(false)
	const counter = useRef(null)
	const durationCounter = useRef(null)
	const container = useRef(null)

	useEffect(() => {
		counter.current = setInterval(() => {
			setText('Breathe In!')
			$(container.current).removeClass('shrink').addClass('grow')
			setTimeout(() => {
				setText('Hold')
				setTimeout(() => {
					setText('Breathe Out!')
					$(container.current).removeClass('grow').addClass('shrink')
				}, holdTime)
			}, breatheTime)
		}, totalTime)
		return () => {
			clearInterval(counter.current)
		}
	}, [totalTime, breatheTime, holdTime])

	useEffect(() => {
		durationCounter.current = setInterval(
			() => setTotalDuration((timer) => timer + 1),
			1000
		)
		return () => {
			clearInterval(durationCounter.current)
		}
	}, [])

	const styles = {
		breathe: {
			color: '#fff',
			fontFamily: 'Montserrat, sans-serif',
			height: '84vh',
			widtht: '80vh',
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
			height: '200px',
			width: '200px',
			top: '0px',
			left: '0px',
			position: 'relative',
			transform: 'scale(1)',
		},
		circle: {
			backgroundColor: '#e6ccb2',
			height: '100%',
			width: '100%',
			borderRadius: '75%',
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: -1,
		},
		pointersvgContainer: {
			position: 'absolute',
			top: '-30px',
			left: '90px',
			width: '20px',
			height: '130px',
			animation: `rotate 7.5s linear forwards infinite`,
			transformOrigin: 'bottom center',
		},
		pointer: {
			backgroundColor: '#9c6644',
			borderRadius: '50%',
			height: '20px',
			width: '20px',
			display: 'block',
		},
	}

	return (
		<div className='breathe' style={styles.breathe}>
			<h4 className='text-center text-custom-color6 mt-1'>Basic Meditation</h4>
			<p className='text-custom-color6'>
				Total Duration:{' '}
				<b>
					<Timer
						data={totalDuration}
						type='no-badge'
						className='text-custom-color6'
					></Timer>
				</b>
			</p>
			<button
				className='btn btn-custom-color4'
				onClick={() => setInstruction(!instruction)}
			>
				Read Instructions
			</button>
			{instruction && (
				<div className='text-justify text-custom-color6 mt-2'>
					<ul>
						<li>
							<small>
								<b>Get comfortable:</b> Prepare to sit still for a few minutes.
							</small>
						</li>
						<li>
							<small>
								<b>Focus on your breath:</b> Keep your attention on your inhale
								and exhale.
							</small>
						</li>
						<li>
							<small>
								<b>Continue your breathing:</b> Take a deep inhale, expanding
								your belly, and then exhale slowly, elongating the out-breath as
								your belly contracts.
							</small>
						</li>
					</ul>
				</div>
			)}
			<div
				className='svgContainer'
				id='svgContainer'
				ref={container}
				style={styles.svgContainer}
			>
				<div className='circle' style={styles.circle}></div>
				<p id='text' className='text-custom-color6'>
					<b>{text}</b>
				</p>
				<div
					className='pointer-svgContainer'
					style={styles.pointersvgContainer}
				>
					<span style={styles.pointer}></span>
				</div>
				<div className='gradient-circle'></div>
			</div>
		</div>
	)
}

export default Breathe
