import React, { useState, useEffect, useCallback } from 'react'
import CardHeader from '../workoutCards/CardHeader'
import CardAutoPlay from '../workoutCards/CardAutoPlay'
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
import CardBtnSpeak from '../workoutCards/CardBtnSpeak'

const WorkoutProgressionCard = ({
	exerciseData,
	time,
	play,
	prevModule,
	autoPlay,
	Speak,
	speakStatus,
	speakSettings,
	settings,
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
	const [reps, setReps] = useState(getQty(exercise.curProgressions.qty))
	const [totalSets, setTotalSets] = useState(reps.length)
	const [curSet, setCurSet] = useState(
		workoutProgress.loaded
			? workoutProgress.setCount
			: prevModule
			? reps.length
			: 1
	)
	const [activity, setActivity] = useState('Exercise')
	const [showTimer, setShowTimer] = useState(false)
	const [info, setInfo] = useState(false)
	const [video, setVideo] = useState(false)
	const [btnDisabled, SetBtnDisabled] = useState({
		prev: false,
		next: false,
		play: false,
	})
	const [initialize, setInitialize] = useState(true)

	useEffect(() => {
		setReps(getQty(exercise.curProgressions.qty))
		//setCurSet(1)
	}, [exercise])

	useEffect(() => {
		setTotalSets(reps.length)
	}, [reps])

	useEffect(() => {
		if (activity === 'Exercise') {
			setShowTimer(false)
			setInitialize(true)
		} else if (activity === 'RestSet') {
			setShowTimer(true)
			setInitialize(false)
		} else if (activity === 'RestExercise') {
			setShowTimer(true)
			setInitialize(false)
		}
	}, [activity])

	const speakText = useCallback(() => {
		console.log('speakText')
		if (speakStatus) {
			Speak.cancel()
			if (activity === 'Exercise') {
				if (exercise.curProgressions.type === 'Duration') {
					Speak.speak({
						text: `Exercise ${counter}, Do ${
							exercise.curProgressions.name
						} Set ${curSet} for ${reps[curSet - 1]} seconds`,
						voice: Speak.voices[speakSettings.voiceIndex],
						rate: speakSettings.rate,
						pitch: speakSettings.pitch,
					})
				} else if (exercise.curProgressions.type === 'Reps') {
					Speak.speak({
						text: `Exercise ${counter}, Do ${
							exercise.curProgressions.name
						} Set ${curSet} for ${reps[curSet - 1]} times`,
						voice: Speak.voices[speakSettings.voiceIndex],
						rate: speakSettings.rate,
						pitch: speakSettings.pitch,
					})
				}
			}
		}
	}, [
		Speak,
		activity,
		counter,
		curSet,
		exercise.curProgressions.name,
		exercise.curProgressions.type,
		reps,
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

	const timerCompleted = () => {
		Speak.cancel()
		setActivity('Exercise')
		checkActivity()
	}

	const timerSkiped = () => {
		Speak.cancel()
		setActivity('Exercise')
		checkActivity()
	}

	const checkActivity = () => {
		if (activity === 'RestSet' || activity === 'RestExercise') {
			setShowTimer(true)
		} else if (activity === 'Exercise') {
			nextElement()
		}
	}

	const prevElement = () => {
		if (curSet > 1) {
			prevSet()
		} else {
			prevExercise()
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
		Speak.cancel()
		setInitialize(true)
		setCurSet(curSet - 1)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			setCount: curSet - 1,
			updatedDate: Date.now(),
		})
	}

	const nextSet = () => {
		setCurSet(curSet + 1)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			setCount: curSet + 1,
			updatedDate: Date.now(),
		})
		Speak.cancel()
		setInitialize(true)
		setActivity('RestSet')
	}

	const prevExercise = () => {
		setCurSet(1)
		if (counter > 1) {
			let newCounter = counter - 1
			setCounter(newCounter)
			setWorkoutProgress({
				...workoutProgress,
				status: true,
				loaded: false,
				exerciseCount: newCounter,
				setCount: 1,
				updatedDate: Date.now(),
			})
			let newExercise = exerciseData.filter(
				(item) => item.id === newCounter.toString()
			)
			setExercise(newExercise[0])
			Speak.cancel()
			setInitialize(true)
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
			setWorkoutProgress({
				...workoutProgress,
				status: true,
				loaded: false,
				exerciseCount: newCounter,
				setCount: 1,
				updatedDate: Date.now(),
			})
			let newExercise = exerciseData.filter(
				(item) => item.id === newCounter.toString()
			)
			setExercise(newExercise[0])
			Speak.cancel()
			setInitialize(true)
		} else if (counter === exerciseData.length) {
			nextStep()
			setWorkoutProgress({
				...workoutProgress,
				fillerModule: true,
				updatedDate: Date.now(),
			})
			setFillerModule(true)
		}
	}

	const endWorkout = () => {
		var confirmation = window.confirm('Do you really want to end the workout?')
		if (confirmation) {
			setFillerModule(false)
			setWorkoutProgress({
				...workoutProgress,
				status: true,
				loaded: false,
				fillerModule: false,
				updatedDate: Date.now(),
			})
			lastStep()
		}
	}

	const showInfo = () => {
		setInfo(!info)
	}

	const showVideo = () => {
		if (!video) {
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

	if (showTimer) {
		return (
			<CardShowTimer
				activity={activity}
				exercise={exercise}
				curSet={curSet}
				Speak={Speak}
				speakStatus={speakStatus}
				speakSettings={speakSettings}
				settings={settings}
				timerCompleted={timerCompleted}
				timerSkiped={timerSkiped}
			/>
		)
	} else {
		return (
			<div className='maincontainer d-flex flex-column justify-content-center'>
				<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
					<div className='card-header d-flex flex-row align-items-center justify-content-between bg-transparent border-custom-color4 px-2'>
						<CardHeader
							counter={counter}
							exerciseData={exerciseData}
							progression={true}
							curSet={curSet}
							totalSets={totalSets}
						/>
						<CardAutoPlay
							exercise={exercise}
							type={exercise.curProgressions.type}
							play={play}
							autoPlay={autoPlay}
							nextExercise={nextExercise}
							setAutoPlay={setAutoPlay}
							progression={true}
							checkActivity={checkActivity}
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
							exerciseName={exercise.name}
							progression={true}
							curSet={curSet}
							reps={reps}
						/>
						{info && (
							<p className='card-text'>{exercise.curProgressions.desc}</p>
						)}
						<div className='btn-group' role='group' aria-label='Basic example'>
							<CardBtnInfo
								data={exercise.curProgressions.desc}
								onAction={showInfo}
							/>
							<CardBtnVideo
								data={exercise.curProgressions.video}
								onAction={showVideo}
							/>
							<CardBtnSpeak
								speakStatus={speakStatus}
								setSpeakStatus={setSpeakStatus}
								isBtn={true}
							/>
							<CardBtnBackward
								onAction={prevElement}
								disabled={btnDisabled.prev}
							/>
							<CardBtnPlay
								play={play}
								onAction={setCardPlayStatus}
								disabled={btnDisabled.play}
							/>
							<CardBtnForward
								onAction={checkActivity}
								disabled={btnDisabled.next}
							/>
						</div>
					</div>
					<CardFooter time={time} onAction={endWorkout} />
				</div>
			</div>
		)
	}
}

export default WorkoutProgressionCard
