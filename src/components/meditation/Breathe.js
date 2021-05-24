import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery'
//import styled from 'styled-components'
import './Breathe.css'

const Breathe = () => {
	const [totalTime] = useState(7500)
	const [breatheTime] = useState((totalTime / 5) * 2)
	const [holdTime] = useState(totalTime / 5)
	const [text, setText] = useState('Get Ready!')
	const counter = useRef(null)
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
			<h4 className='text-center text-custom-color6 mt-3'>Breathe!</h4>
			<small className='text-justify text-custom-color6'>
				Breathe based on the instructions below!
			</small>
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
