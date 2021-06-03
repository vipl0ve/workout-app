import React, { useState, useEffect, useCallback } from 'react'

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
import CardBtnSpeak from '../workoutCards/CardBtnSpeak'

const WorkoutBasicCard = ({
	exerciseData,
	time,
	play,
	prevModule,
	autoPlay,
	Speak,
	speakStatus,
	speakSettings,
	nextStep,
	prevStep,
	lastStep,
	workoutProgress,
	setFillerModule,
	setPlayStatus,
	setSpeakStatus,
	setAutoPlay,
	setWorkoutProgress,
}) => {
	const [exercise, setExercise] = useState(
		workoutProgress.loaded
			? exerciseData[workoutProgress.exerciseCount - 1]
			: prevModule
			? exerciseData[exerciseData.length - 1]
			: exerciseData[0]
	)
	const [counter, setCounter] = useState(parseInt(exercise.id))
	const [info, setInfo] = useState(false)
	const [video, setVideo] = useState(false)
	const [btnDisabled, SetBtnDisabled] = useState({
		prev: false,
		next: false,
		play: false,
	})
	const [initialize, setInitialize] = useState(true)

	const speakText = useCallback(() => {
		console.log('speakText')
		if (speakStatus) {
			Speak.cancel()
			if (exercise.type === 'Duration') {
				Speak.speak({
					text: `Exercise ${counter}, Do ${exercise.name} for ${exercise.qty} seconds`,
					voice: Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			} else if (exercise.type === 'Reps') {
				Speak.speak({
					text: `Exercise ${counter}, Do ${exercise.name} for ${exercise.qty} times`,
					voice: Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			}
		}
	}, [
		Speak,
		counter,
		exercise.name,
		exercise.qty,
		exercise.type,
		speakSettings.pitch,
		speakSettings.rate,
		speakSettings.voiceIndex,
		speakStatus,
	])

	useEffect(() => {
		if (initialize) {
			setInitialize(false)
			speakText()
		}
	}, [initialize, speakText])

	const setCardPlayStatus = () => {
		if (speakStatus) {
			Speak.cancel()
			if (!play) {
				Speak.speak({
					text: `Play`,
					voice: Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			} else {
				Speak.speak({
					text: `Paused`,
					voice: Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			}
		}
		setPlayStatus(!play)
	}

	const prevExercise = () => {
		if (counter > 1) {
			let newCounter = counter - 1
			setCounter(newCounter)
			setWorkoutProgress({
				...workoutProgress,
				status: true,
				loaded: false,
				exerciseCount: newCounter,
				updatedDate: Date.now(),
			})
			let newExercise = exerciseData.filter(
				(item) => item.id === newCounter.toString()
			)
			setExercise(newExercise[0])
			setInitialize(true)
		} else if (counter === 1) {
			prevStep()
		}
	}

	const nextExercise = () => {
		if (counter < exerciseData.length) {
			let newCounter = counter + 1
			setCounter(newCounter)
			setWorkoutProgress({
				...workoutProgress,
				status: true,
				loaded: false,
				exerciseCount: newCounter,
				updatedDate: Date.now(),
			})
			let newExercise = exerciseData.filter(
				(item) => item.id === newCounter.toString()
			)
			setExercise(newExercise[0])
			setInitialize(true)
		} else if (counter === exerciseData.length) {
			setWorkoutProgress({
				...workoutProgress,
				fillerModule: true,
				updatedDate: Date.now(),
			})
			nextStep()
			setFillerModule(true)
		}
	}

	const endWorkout = () => {
		var confirmation = window.confirm('Do you really want to end the workout?')
		if (confirmation) {
			setWorkoutProgress({
				...workoutProgress,
				status: true,
				loaded: false,
				fillerModule: false,
				updatedDate: Date.now(),
			})
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
		<div className='maincontainer container d-flex flex-column justify-content-center'>
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
							speakStatus={speakStatus}
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
