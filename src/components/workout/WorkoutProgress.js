import React, { useState, useEffect, useRef } from 'react'
import WorkoutStarted from './WorkoutStarted'
import WorkoutBasicCard from './WorkoutBasicCard'
import WorkoutProgressionCard from './WorkoutProgressionCard'
import FillerCard from '../utils/FillerCard'
import WorkoutCompleted from './WorkoutCompleted'
import WorkoutAudio from './WorkoutAudio'
import { useSpeechSynthesis } from 'react-speech-kit'
import { useLocalStorage } from '../utils/useLocalStorage'
import WorkoutIncomplete from './WorkoutIncomplete'
import NoSleep from 'nosleep.js'

const WorkoutProgress = (props) => {
	const [routine] = useState(props.location.state.routine)
	const [settings] = useState(props.location.state.settings)
	const [workoutProgress, setWorkoutProgress] = useLocalStorage(
		'bwWorkoutProgress',
		{
			status: false,
			loaded: false,
			workoutName: '',
			timer: 0,
			play: true,
			autoPlay: true,
			speakStatus: true,
			curModule: -2,
			fillerModule: true,
			exerciseCount: 1,
			setCount: 1,
			updatedDate: Date.now(),
		}
	)
	const [timer, setTimer] = useState(0)
	const [play, setPlay] = useState(false)
	const [autoPlay, setAutoPlay] = useState(true)

	// Modules
	const [curModule, setCurModule] = useState(-2)
	const [fillerModule, setFillerModule] = useState(true)
	const [prevModule, setPrevModule] = useState(false)

	// Speak Functionalities
	const Speak = useSpeechSynthesis()
	const [speakStatus, setSpeakStatus] = useState(false)
	const [speakSettings, setSpeakSettings] = useLocalStorage('bwAudio', {})

	// Timer
	const countRef = useRef(null)

	// Sleep
	var noSleep = new NoSleep()

	const loadCurWorkout = () => {
		setTimer(workoutProgress.timer)
		setPlay(workoutProgress.play)
		setAutoPlay(workoutProgress.autoPlay)
		setCurModule(workoutProgress.curModule)
		setFillerModule(workoutProgress.fillerModule)
		setSpeakStatus(workoutProgress.speakStatus)
		setWorkoutProgress({
			...workoutProgress,
			status: false,
			loaded: true,
			updatedDate: Date.now(),
		})
	}

	const loadDefaultWorkout = () => {
		setWorkoutProgress({
			status: false,
			loaded: false,
			workoutName: '',
			timer: 0,
			play: true,
			autoPlay: true,
			speakStatus: true,
			curModule: -2,
			fillerModule: true,
			exerciseCount: 1,
			setCount: 1,
			updatedDate: Date.now(),
		})
	}

	useEffect(() => {
		if (play) {
			countRef.current = setInterval(() => {
				setTimer((timer) => timer + 1)
				setWorkoutProgress({
					...workoutProgress,
					status: true,
					timer: timer + 1,
					updatedDate: Date.now(),
				})
			}, 1000)
			return () => {
				clearInterval(countRef.current)
			}
		} else {
			clearInterval(countRef.current)
		}
	})

	const prevStep = () => {
		setCurModule((e) => e - 1)
		setPrevModule(true)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			curModule: curModule - 1,
			exerciseCount: 1,
			setCount: 1,
			updatedDate: Date.now(),
		})
		noSleep.enable()
	}

	const nextStep = () => {
		setPrevModule(false)
		if (curModule < routine.exercises.length - 1) {
			setCurModule((e) => e + 1)
		} else if (curModule === routine.exercises.length - 1) {
			lastStep()
		}
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			curModule: curModule + 1,
			exerciseCount: 1,
			setCount: 1,
			updatedDate: Date.now(),
		})
		noSleep.enable()
	}

	const lastStep = () => {
		setPlay(false)
		setPrevModule(false)
		setCurModule(routine.exercises.length)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			play: false,
			curModule: routine.exercises.length,
			exerciseCount: 1,
			setCount: 1,
			updatedDate: Date.now(),
		})
		noSleep.enable()
	}

	const setPlayStatus = (status) => {
		setPlay(status)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			play: status,
			updatedDate: Date.now(),
		})
	}

	const setAutoPlayStatus = (status) => {
		if (speakStatus) {
			Speak.cancel()
			if (status) {
				Speak.speak({
					text: `Autoplay On!`,
					voice: Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			} else {
				Speak.speak({
					text: `Autoplay Off!`,
					voice: Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			}
		}
		setAutoPlay(status)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			autoPlay: status,
			updatedDate: Date.now(),
		})
	}

	const setSpeak = (status) => {
		Speak.cancel()
		if (status) {
			Speak.speak({
				text: `Audio On!`,
				voice: Speak.voices[speakSettings.voiceIndex],
				rate: speakSettings.rate,
				pitch: speakSettings.pitch,
			})
		} else {
			Speak.speak({
				text: `Audio Off!`,
				voice: Speak.voices[speakSettings.voiceIndex],
				rate: speakSettings.rate,
				pitch: speakSettings.pitch,
			})
		}
		setSpeakStatus(status)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			speakStatus: status,
			updatedDate: Date.now(),
		})
	}

	if (curModule === -2) {
		if (workoutProgress.status && !workoutProgress.loaded) {
			return (
				<WorkoutIncomplete
					workoutProgress={workoutProgress}
					loadCurWorkout={loadCurWorkout}
					loadDefaultWorkout={loadDefaultWorkout}
				/>
			)
		} else {
			return (
				<WorkoutAudio
					Speak={Speak}
					speakSettings={speakSettings}
					nextStep={nextStep}
					workoutProgress={workoutProgress}
					setSpeakStatus={setSpeakStatus}
					setSpeakSettings={setSpeakSettings}
					setWorkoutProgress={setWorkoutProgress}
				/>
			)
		}
	} else if (curModule === -1) {
		return (
			<WorkoutStarted
				routine={routine}
				Speak={Speak}
				speakStatus={speakStatus}
				speakSettings={speakSettings}
				nextStep={nextStep}
				workoutProgress={workoutProgress}
				setPlayStatus={setPlayStatus}
				setWorkoutProgress={setWorkoutProgress}
			/>
		)
	} else if (curModule > -1 && curModule < routine.exercises.length) {
		if (fillerModule) {
			return (
				<FillerCard
					settings={settings}
					exercise={routine.exercises[curModule].name}
					Speak={Speak}
					speakStatus={speakStatus}
					speakSettings={speakSettings}
					workoutProgress={workoutProgress}
					setFillerModule={setFillerModule}
					setWorkoutProgress={setWorkoutProgress}
				/>
			)
		} else {
			if (routine.exercises[curModule].type === 'Basic') {
				return (
					<WorkoutBasicCard
						exerciseData={routine.exercises[curModule].steps}
						time={timer}
						play={play}
						prevModule={prevModule}
						autoPlay={autoPlay}
						Speak={Speak}
						speakStatus={speakStatus}
						speakSettings={speakSettings}
						settings={settings}
						nextStep={nextStep}
						prevStep={prevStep}
						lastStep={lastStep}
						workoutProgress={workoutProgress}
						setFillerModule={setFillerModule}
						setPlayStatus={setPlayStatus}
						setSpeakStatus={setSpeak}
						setAutoPlay={setAutoPlayStatus}
						setWorkoutProgress={setWorkoutProgress}
					/>
				)
			} else if (routine.exercises[curModule].type === 'Progressive') {
				return (
					<WorkoutProgressionCard
						exerciseData={routine.exercises[curModule].steps}
						time={timer}
						play={play}
						prevModule={prevModule}
						autoPlay={autoPlay}
						Speak={Speak}
						speakStatus={speakStatus}
						speakSettings={speakSettings}
						settings={settings}
						nextStep={nextStep}
						prevStep={prevStep}
						lastStep={lastStep}
						workoutProgress={workoutProgress}
						setFillerModule={setFillerModule}
						setPlayStatus={setPlayStatus}
						setSpeakStatus={setSpeak}
						setAutoPlay={setAutoPlayStatus}
						setWorkoutProgress={setWorkoutProgress}
					/>
				)
			} else {
				return null
			}
		}
	} else if (curModule === routine.exercises.length) {
		return (
			<WorkoutCompleted
				routineInfo={routine}
				time={timer}
				Speak={Speak}
				speakStatus={speakStatus}
				speakSettings={speakSettings}
				workoutProgress={workoutProgress}
				setWorkoutProgress={setWorkoutProgress}
			/>
		)
	} else {
		return null
	}
}

export default WorkoutProgress
