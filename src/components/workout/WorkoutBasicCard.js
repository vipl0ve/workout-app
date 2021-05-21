import React, { useState, useEffect } from 'react'
import CardImage from '../workoutCards/CardImage'
import CardTitle from '../workoutCards/CardTitle'
import CardBtnInfo from '../workoutCards/CardBtnInfo'
import CardBtnVideo from '../workoutCards/CardBtnVideo'
import CardFooter from '../workoutCards/CardFooter'
import CardBtnBackward from '../workoutCards/CardBtnBackward'
import CardBtnForward from '../workoutCards/CardBtnForward'
import CardBtnPlay from '../workoutCards/CardBtnPlay'
import CardWatch from '../workoutCards/CardWatch'
import CardHeader from '../workoutCards/CardHeader'
import CardVideo from '../workoutCards/CardVideo'

const WorkoutBasicCard = ({
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
	const [info, setInfo] = useState(false)
	const [video, setVideo] = useState(false)
	const [btnDisabled, SetBtnDisabled] = useState({ prev: false, next: false })

	useEffect(() => {}, [play, exercise])

	const setCardPlayStatus = () => {
		setPlayStatus(!play)
	}

	const prevExercise = () => {
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
		lastStep()
		setFillerModule(false)
		setPlayStatus(false)
	}

	const showInfo = () => {
		setInfo(!info)
	}

	const showVideo = () => {
		setPlayStatus(!play)
		SetBtnDisabled({ prev: !btnDisabled.prev, next: !btnDisabled.next })
		setVideo(!video)
	}

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
					progression={false}
				/>
			</div>
			{video && <CardVideo url={exercise.video} />}
			{!video && <CardImage url={exercise.img} alt={exercise.name} />}
			<div className='card-body'>
				<CardTitle
					name={exercise.name}
					type={exercise.type}
					qty={exercise.qty}
					progression={false}
				/>
				{info && <p className='card-text'>{exercise.desc}</p>}
				<hr />
				<div className='btn-group' role='group' aria-label='Basic example'>
					<CardBtnInfo data={exercise.desc} onAction={showInfo} />
					<CardBtnVideo data={exercise.video} onAction={showVideo} />
					<CardBtnBackward
						onAction={prevExercise}
						disabled={btnDisabled.prev}
					/>
					<CardBtnPlay play={play} onAction={setCardPlayStatus} />
					<CardBtnForward onAction={nextExercise} disabled={btnDisabled.next} />
				</div>
			</div>
			<CardFooter time={time} onAction={endWorkout} />
		</div>
	)
}
export default WorkoutBasicCard
