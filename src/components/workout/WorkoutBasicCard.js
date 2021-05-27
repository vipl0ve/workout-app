import React, { useState, useEffect } from 'react'
import CardImage from '../workoutCards/CardImage'
import CardTitle from '../workoutCards/CardTitle'
import CardBtnInfo from '../workoutCards/CardBtnInfo'
import CardBtnVideo from '../workoutCards/CardBtnVideo'
import CardFooter from '../workoutCards/CardFooter'
import CardBtnBackward from '../workoutCards/CardBtnBackward'
import CardBtnForward from '../workoutCards/CardBtnForward'
import CardBtnPlay from '../workoutCards/CardBtnPlay'
import CardAutoPlay from '../workoutCards/CardAutoPlay'
import CardHeader from '../workoutCards/CardHeader'
import CardVideo from '../workoutCards/CardVideo'
import Speak from '../utils/Speak'
import CardBtnSpeak from '../workoutCards/CardBtnSpeak'

const WorkoutBasicCard = ({
	exerciseData,
	time,
	play,
	autoPlay,
	speak,
	settings,
	nextStep,
	prevStep,
	lastStep,
	setFillerModule,
	setPlayStatus,
	setSpeakStatus,
	setAutoPlay,
}) => {
	const [exercise, setExercise] = useState(exerciseData[0])
	const [counter, setCounter] = useState(parseInt(exercise.id))
	const [info, setInfo] = useState(false)
	const [video, setVideo] = useState(false)
	const [btnDisabled, SetBtnDisabled] = useState({
		prev: false,
		next: false,
		play: false,
	})

	useEffect(() => {
		if (speak) {
			if (exercise.type === 'Duration') {
				Speak({
					text: `Exercise ${counter}, Do ${exercise.name} for ${exercise.qty} seconds`,
					voiceIndex: 1,
				})
			} else if (exercise.type === 'Reps') {
				Speak({
					text: `Exercise ${counter}, Do ${exercise.name} for ${exercise.qty} times`,
					voiceIndex: 1,
				})
			}
		}
	}, [counter, exercise, speak])

	useEffect(() => {}, [play, exercise])

	const setCardPlayStatus = () => {
		if (speak) {
			if (!play) {
				Speak({
					text: `Play`,
					voiceIndex: 1,
				})
			} else {
				Speak({
					text: `Paused`,
					voiceIndex: 1,
				})
			}
		}
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
		var confirmation = window.confirm(
			'This will end current workout. Are you sure?'
		)
		if (confirmation) {
			if (speak) {
				Speak({
					text: `Ending Workout now`,
					voiceIndex: 1,
				})
			}
			setFillerModule(false)
			lastStep()
		}
	}

	const showInfo = () => {
		setInfo(!info)
	}

	const showVideo = () => {
		if (video) {
			setPlayStatus(false)
		} else {
			setPlayStatus(true)
		}
		SetBtnDisabled({
			prev: !btnDisabled.prev,
			next: !btnDisabled.next,
			play: !btnDisabled.play,
		})
		setVideo(!video)
	}

	return (
		<div
			className='containerExercise d-flex flex-column justify-content-center'
			style={{ minHeight: '90vh', width: 'auto' }}
		>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header d-flex flex-row justify-content-between align-items-start bg-transparent border-custom-color4 p-2'>
					<CardHeader
						counter={counter}
						exerciseData={exerciseData}
						progression={false}
					/>
					<CardAutoPlay
						exercise={exercise}
						type={exercise.type}
						play={play}
						autoPlay={autoPlay}
						nextExercise={nextExercise}
						setAutoPlay={setAutoPlay}
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
					<div className='btn-group' role='group' aria-label='Basic example'>
						<CardBtnInfo data={exercise.desc} onAction={showInfo} />
						<CardBtnVideo data={exercise.video} onAction={showVideo} />
						<CardBtnSpeak
							speak={speak}
							setSpeakStatus={setSpeakStatus}
							isBtn={true}
						/>
						<CardBtnBackward
							onAction={prevExercise}
							disabled={btnDisabled.prev}
						/>
						<CardBtnPlay
							play={play}
							onAction={setCardPlayStatus}
							disabled={btnDisabled.play}
						/>
						<CardBtnForward
							onAction={nextExercise}
							disabled={btnDisabled.next}
						/>
					</div>
				</div>
				<CardFooter time={time} onAction={endWorkout} />
			</div>
		</div>
	)
}
export default WorkoutBasicCard
