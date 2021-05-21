import React, { useState, useEffect } from 'react'
import CardHeader from '../workoutCards/CardHeader'
import CardWatch from '../workoutCards/CardWatch'
import CardImage from '../workoutCards/CardImage'
import CardBtnInfo from '../workoutCards/CardBtnInfo'
import CardFooter from '../workoutCards/CardFooter'
import CardBtnForward from '../workoutCards/CardBtnForward'
import CardBtnPlay from '../workoutCards/CardBtnPlay'
import CardBtnBackward from '../workoutCards/CardBtnBackward'
import CardBtnVideo from '../workoutCards/CardBtnVideo'
import CardTitle from '../workoutCards/CardTitle'
import CardShowTimer from '../workoutCards/CardShowTimer'
import { getQty } from '../../helper/helperfunctions'
import CardVideo from '../workoutCards/CardVideo'

const WorkoutProgressionCard = ({
	exerciseData,
	time,
	play,
	settings,
	nextStep,
	prevStep,
	lastStep,
	setFillerModule,
	setPlayStatus,
}) => {
	const [exercise, setExercise] = useState(exerciseData[0])
	const [counter, setCounter] = useState(parseInt(exercise.id))
	const [reps, setReps] = useState(getQty(exercise.curProgressions.qty))
	const [totalSets, setTotalSets] = useState(reps.length)
	const [curSet, setCurSet] = useState(1)
	const [activity, setActivity] = useState('Exercise')
	const [showTimer, setShowTimer] = useState(false)
	const [info, setInfo] = useState(false)
	const [video, setVideo] = useState(false)
	const [btnDisabled, SetBtnDisabled] = useState({ prev: false, next: false })

	useEffect(() => {
		setReps(getQty(exercise.curProgressions.qty))
		setCurSet(1)
	}, [exercise])

	useEffect(() => {
		setTotalSets(reps.length)
	}, [reps])

	useEffect(() => {
		if (activity === 'Exercise') setShowTimer(false)
		else if (activity === 'RestSet') setShowTimer(true)
		else if (activity === 'RestExercise') setShowTimer(true)
	}, [activity])

	useEffect(() => {}, [play])

	const setCardPlayStatus = () => {
		setPlayStatus(!play)
	}

	const timerCompleted = () => {
		setActivity('Exercise')
		checkActivity()
	}

	const timerSkip = () => {
		setActivity('Exercise')
		checkActivity()
	}

	const prevElement = () => {
		if (curSet > 1) {
			prevSet()
		} else {
			prevExercise()
		}
	}

	const checkActivity = () => {
		if (activity === 'RestSet') {
			setShowTimer(true)
		} else if (activity === 'RestExercise') {
			setShowTimer(true)
		} else if (activity === 'Exercise') {
			nextElement()
		}
	}

	const nextElement = () => {
		if (curSet < totalSets) {
			nextSet()
		} else {
			nextExercise()
		}
	}

	const prevSet = () => {
		setCurSet(curSet - 1)
	}

	const nextSet = () => {
		setCurSet(curSet + 1)
		setActivity('RestSet')
	}

	const prevExercise = () => {
		setCurSet(1)
		if (counter > 1) {
			let newCounter = counter - 1
			setCounter(newCounter)
			let newExercise = exerciseData.filter(
				(item) => item.id === newCounter.toString()
			)
			setExercise(newExercise[0])
		} else if (counter === 1) {
			prevStep()
		}
	}

	const nextExercise = () => {
		setCurSet(1)
		setActivity('RestExercise')
		if (counter < exerciseData.length) {
			let newCounter = counter + 1
			setCounter(newCounter)
			let newExercise = exerciseData.filter(
				(item) => item.id === newCounter.toString()
			)
			setExercise(newExercise[0])
		} else if (counter === exerciseData.length) {
			nextStep()
			setFillerModule(true)
		}
	}

	const endWorkout = () => {
		setFillerModule(false)
		setPlayStatus(false)
		lastStep()
	}

	const showInfo = () => {
		setInfo(!info)
	}

	const showVideo = () => {
		setPlayStatus(!play)
		SetBtnDisabled({ prev: !btnDisabled.prev, next: !btnDisabled.next })
		setVideo(!video)
	}

	if (showTimer) {
		return (
			<CardShowTimer
				activity={activity}
				settings={settings}
				timerCompleted={timerCompleted}
				timerSkip={timerSkip}
			/>
		)
	} else {
		return (
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header d-flex justify-content-between bg-transparent border-custom-color4'>
					<CardHeader
						counter={counter}
						exerciseData={exerciseData}
						exercise={exercise}
					/>
					<CardWatch
						exercise={exercise}
						play={play}
						nextExercise={nextExercise}
						setCardPlayStatus={setCardPlayStatus}
						progression={true}
					/>
				</div>
				{video && <CardVideo url={exercise.curProgressions.video} />}
				{!video && (
					<CardImage
						url={exercise.curProgressions.img}
						alt={exercise.curProgressions.name}
					/>
				)}
				<div className='card-body'>
					<CardTitle
						name={exercise.curProgressions.name}
						type={exercise.curProgressions.type}
						qty={exercise.curProgressions.qty}
						progression={true}
						curSet={curSet}
						totalSets={totalSets}
						reps={reps}
					/>
					{info && <p className='card-text'>{exercise.curProgressions.desc}</p>}
					<div className='btn-group' role='group' aria-label='Basic example'>
						<CardBtnInfo
							data={exercise.curProgressions.desc}
							onAction={showInfo}
						/>
						<CardBtnVideo
							data={exercise.curProgressions.video}
							onAction={showVideo}
						/>
						<CardBtnBackward
							onAction={prevElement}
							disabled={btnDisabled.prev}
						/>
						<CardBtnPlay play={play} onAction={setCardPlayStatus} />
						<CardBtnForward
							onAction={checkActivity}
							disabled={btnDisabled.next}
						/>
					</div>
				</div>
				<CardFooter time={time} onAction={endWorkout} />
			</div>
		)
	}
}

export default WorkoutProgressionCard
