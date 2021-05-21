import React, { useState, useEffect, useRef } from 'react'
//import queryString from 'query-string'
import WorkoutIntro from './WorkoutIntro'
import WorkoutBasicCard from './WorkoutBasicCard'
import WorkoutProgressionCard from './WorkoutProgressionCard'
import FillerCard from '../utils/FillerCard'

const WorkoutProgress = (props) => {
	//const [query] = useState(queryString.parse(props.location.search))
	const [routine] = useState(props.location.state.routine)
	const [settings] = useState(props.location.state.settings)
	const [timer, setTimer] = useState(0)
	const [play, setPlay] = useState(false)
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

	if (curModule === -1) {
		return (
			<WorkoutIntro
				routineInfo={routine}
				time={timer}
				curModule={curModule}
				nextStep={nextStep}
				setPlayStatus={setPlay}
			/>
		)
	} else if (curModule > -1 && curModule < routine.exercises.length) {
		if (fillerModule) {
			return (
				<FillerCard
					settings={settings}
					exercise={routine.exercises[curModule].name}
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
						settings={settings}
						nextStep={nextStep}
						prevStep={prevStep}
						lastStep={lastStep}
						setFillerModule={setFillerModule}
						setPlayStatus={setPlay}
					/>
				)
			} else if (routine.exercises[curModule].type === 'Progressive') {
				return (
					<WorkoutProgressionCard
						exerciseData={routine.exercises[curModule].steps}
						time={timer}
						play={play}
						settings={settings}
						nextStep={nextStep}
						prevStep={prevStep}
						lastStep={lastStep}
						setFillerModule={setFillerModule}
						setPlayStatus={setPlay}
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
				curModule={curModule}
				nextStep={nextStep}
				prevStep={prevStep}
				setPlayStatus={setPlay}
			/>
		)
	} else {
		return null
	}
}

export default WorkoutProgress
