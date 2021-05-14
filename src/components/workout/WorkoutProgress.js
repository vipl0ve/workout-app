import React, { useState, useEffect, useRef } from 'react'
//import queryString from 'query-string'
import WorkoutIntro from './WorkoutIntro'
import WorkoutBasicCard from './WorkoutBasicCard'
import WorkoutProgressionCard from './WorkoutProgressionCard'

const WorkoutProgress = (props) => {
	//const [query] = useState(queryString.parse(props.location.search))
	const [routine] = useState(props.location.state.routine)
	const [settings] = useState(props.location.state.settings)
	const [timer, setTimer] = useState(0)
	const [play, setPlay] = useState(false)
	const [start, setStart] = useState({
		isIntro: true,
		isWarmup: false,
		isExercise: false,
		isStrech: false,
		isEnding: false,
	})
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

	return (
		<div className='container'>
			{start.isIntro && (
				<WorkoutIntro
					routineInfo={routine}
					time={timer}
					exerciseType={'intro'}
					setPlayStatus={setPlay}
					setStartStatus={setStart}
				/>
			)}
			{start.isWarmup && (
				<WorkoutBasicCard
					exerciseData={routine.steps.warmup}
					play={play}
					time={timer}
					exerciseType={'warmup'}
					setStartStatus={setStart}
					setPlayStatus={setPlay}
				/>
			)}
			{start.isExercise && (
				<WorkoutProgressionCard
					exerciseData={routine.steps.exercise}
					exerciseType={'exercise'}
					time={timer}
					play={play}
					settings={settings}
					setStartStatus={setStart}
					setPlayStatus={setPlay}
				/>
			)}
			{start.isStrech && (
				<WorkoutBasicCard
					exerciseData={routine.steps.stretch}
					exerciseType={'stretch'}
					time={timer}
					play={play}
					setStartStatus={setStart}
					setPlayStatus={setPlay}
				/>
			)}
			{start.isEnding && (
				<WorkoutIntro
					routineInfo={routine}
					time={timer}
					exerciseType={'ending'}
					setPlayStatus={setPlay}
					setStartStatus={setStart}
				/>
			)}
		</div>
	)
}

export default WorkoutProgress
