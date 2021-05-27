import React, { useState, useEffect, useRef } from 'react'
//import queryString from 'query-string'
import WorkoutIntro from './WorkoutIntro'
import WorkoutBasicCard from './WorkoutBasicCard'
import WorkoutProgressionCard from './WorkoutProgressionCard'
import FillerCard from '../utils/FillerCard'
import Speak from '../utils/Speak'

const WorkoutProgress = (props) => {
	const [routine] = useState(props.location.state.routine)
	const [settings] = useState(props.location.state.settings)
	const [timer, setTimer] = useState(0)
	const [play, setPlay] = useState(false)
	const [autoPlay, setAutoPlay] = useState(true)
	const [speak, setSpeak] = useState(true)
	const [curModule, setCurModule] = useState(-1)
	const [fillerModule, setFillerModule] = useState(true)
	const countRef = useRef(null)

	useEffect(() => {
		if (play) {
			countRef.current = setInterval(() => setTimer((timer) => timer + 1), 1000)
			return () => {
				clearInterval(countRef.current)
			}
		} else {
			clearInterval(countRef.current)
		}
	})

	const prevStep = () => {
		setCurModule((e) => e - 1)
	}

	const nextStep = () => {
		if (curModule < routine.exercises.length - 1) {
			setCurModule((e) => e + 1)
		} else if (curModule === routine.exercises.length - 1) {
			lastStep()
		}
	}

	const lastStep = () => {
		setPlay(false)
		setCurModule(routine.exercises.length)
	}

	const setPlayStatus = (status) => {
		setPlay(status)
	}

	const setAutoPlayData = (checked) => {
		if (speak) {
			if (checked) {
				Speak({
					text: `Autoplay On`,
					voiceIndex: 1,
				})
			} else {
				Speak({
					text: `Autoplay Off`,
					voiceIndex: 1,
				})
			}
		}
		setAutoPlay(checked)
	}

	const setSpeakStatus = (status) => {
		if (status) {
			Speak({
				text: `Speaking On`,
				voiceIndex: 1,
			})
		} else {
			Speak({
				text: `Speaking Off`,
				voiceIndex: 1,
			})
		}

		setSpeak(status)
	}

	if (curModule === -1) {
		return (
			<WorkoutIntro
				routineInfo={routine}
				time={timer}
				speak={speak}
				curModule={curModule}
				nextStep={nextStep}
				setPlayStatus={setPlayStatus}
				setSpeakStatus={setSpeakStatus}
			/>
		)
	} else if (curModule > -1 && curModule < routine.exercises.length) {
		if (fillerModule) {
			return (
				<FillerCard
					settings={settings}
					exercise={routine.exercises[curModule].name}
					speak={speak}
					setFillerModule={setFillerModule}
				/>
			)
		} else {
			if (routine.exercises[curModule].type === 'Basic') {
				return (
					<WorkoutBasicCard
						exerciseData={routine.exercises[curModule].steps}
						time={timer}
						play={play}
						autoPlay={autoPlay}
						speak={speak}
						settings={settings}
						nextStep={nextStep}
						prevStep={prevStep}
						lastStep={lastStep}
						setFillerModule={setFillerModule}
						setPlayStatus={setPlayStatus}
						setSpeakStatus={setSpeakStatus}
						setAutoPlay={setAutoPlayData}
					/>
				)
			} else if (routine.exercises[curModule].type === 'Progressive') {
				return (
					<WorkoutProgressionCard
						exerciseData={routine.exercises[curModule].steps}
						time={timer}
						play={play}
						autoPlay={autoPlay}
						speak={speak}
						settings={settings}
						nextStep={nextStep}
						prevStep={prevStep}
						lastStep={lastStep}
						setFillerModule={setFillerModule}
						setPlayStatus={setPlayStatus}
						setSpeakStatus={setSpeakStatus}
						setAutoPlay={setAutoPlayData}
					/>
				)
			} else {
				return null
			}
		}
	} else if (curModule === routine.exercises.length) {
		return (
			<WorkoutIntro
				routineInfo={routine}
				time={timer}
				speak={speak}
				curModule={curModule}
				nextStep={nextStep}
				prevStep={prevStep}
				setSpeakStatus={setSpeakStatus}
				setPlayStatus={setPlayStatus}
			/>
		)
	} else {
		return null
	}
}

export default WorkoutProgress
