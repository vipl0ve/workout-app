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
	const [curModule, setCurModule] = useState('Intro')
	const [fillerModule, setFillerModule] = useState('filler')
	const countRef = useRef(null)

	useEffect(() => {
		if (play) {
			countRef.current = setInterval(() => setTimer(timer + 1), 1000)
			return () => {
				clearInterval(countRef.current)
			}
		} else {
			clearInterval(countRef.current)
		}
	})

	if (curModule === 'Intro') {
		return (
			<WorkoutIntro
				routineInfo={routine}
				time={timer}
				exerciseType={curModule}
				changeCurModule={setCurModule}
				setPlayStatus={setPlay}
			/>
		)
	} else if (curModule === 'Warmup') {
		if (fillerModule === 'nofiller') {
			return (
				<WorkoutBasicCard
					exerciseData={routine.steps.warmup}
					time={timer}
					play={play}
					settings={settings}
					exerciseType={curModule}
					changeCurModule={setCurModule}
					changeFillerModule={setFillerModule}
					setPlayStatus={setPlay}
				/>
			)
		} else if (fillerModule === 'filler') {
			return (
				<FillerCard
					time={timer}
					play={play}
					settings={settings}
					exerciseType={curModule}
					changeFillerModule={setFillerModule}
					setPlayStatus={setPlay}
				/>
			)
		} else {
			return null
		}
	} else if (curModule === 'Exercise') {
		if (fillerModule === 'nofiller') {
			return (
				<WorkoutProgressionCard
					exerciseData={routine.steps.exercise}
					exerciseType={curModule}
					time={timer}
					play={play}
					settings={settings}
					changeCurModule={setCurModule}
					changeFillerModule={setFillerModule}
					setPlayStatus={setPlay}
				/>
			)
		} else if (fillerModule === 'filler') {
			return (
				<FillerCard
					time={timer}
					play={play}
					settings={settings}
					exerciseType={curModule}
					changeFillerModule={setFillerModule}
					setPlayStatus={setPlay}
				/>
			)
		} else {
			return null
		}
	} else if (curModule === 'Stretch') {
		if (fillerModule === 'nofiller') {
			return (
				<WorkoutBasicCard
					exerciseData={routine.steps.stretch}
					exerciseType={curModule}
					time={timer}
					play={play}
					settings={settings}
					changeCurModule={setCurModule}
					changeFillerModule={setFillerModule}
					setPlayStatus={setPlay}
				/>
			)
		} else if (fillerModule === 'filler') {
			return (
				<FillerCard
					time={timer}
					play={play}
					settings={settings}
					exerciseType={curModule}
					changeFillerModule={setFillerModule}
					setPlayStatus={setPlay}
				/>
			)
		} else {
			return null
		}
	} else if (curModule === 'Ending') {
		return (
			<WorkoutIntro
				routineInfo={routine}
				exerciseType={curModule}
				time={timer}
				changeCurModule={setCurModule}
				setPlayStatus={setPlay}
			/>
		)
	} else {
		return null
	}
}

export default WorkoutProgress
