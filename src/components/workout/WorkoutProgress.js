import React, { useState, useEffect, useRef } from 'react'
import WorkoutStarted from './WorkoutStarted'
import WorkoutBasicCard from './WorkoutBasicCard'
import WorkoutProgressionCard from './WorkoutProgressionCard'
import FillerCard from '../utils/FillerCard'
import WorkoutCompleted from './WorkoutCompleted'
import WorkoutAudio from './WorkoutAudio'
import { useSpeechSynthesis } from 'react-speech-kit'
import { useLocalStorage } from '../utils/useLocalStorage'

const WorkoutProgress = (props) => {
	const [routine] = useState(props.location.state.routine)
	const [settings] = useState(props.location.state.settings)
	const [timer, setTimer] = useState(0)
	const [play, setPlay] = useState(false)
	const [autoPlay, setAutoPlay] = useState(true)
	const [curModule, setCurModule] = useState(-2)
	const [fillerModule, setFillerModule] = useState(true)
	const [prevModule, setPrevModule] = useState(false)
	const Speak = useSpeechSynthesis()
	const [speakStatus, setSpeakStatus] = useState(false)
	const [speakSettings, setSpeakSettings] = useLocalStorage('bwAudio', {})
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
		setPrevModule(true)
	}

	const nextStep = () => {
		setPrevModule(false)
		if (curModule < routine.exercises.length - 1) {
			setCurModule((e) => e + 1)
		} else if (curModule === routine.exercises.length - 1) {
			lastStep()
		}
	}

	const lastStep = () => {
		setPlay(false)
		setPrevModule(false)
		setCurModule(routine.exercises.length)
	}

	const setPlayStatus = (status) => {
		setPlay(status)
	}

	const setAutoPlayData = (checked) => {
		if (speakStatus) {
			Speak.cancel()
			if (checked) {
				Speak.speak({
					text: `Autoplay On!`,
					voice: speakSettings.voice || Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			} else {
				Speak.speak({
					text: `Autoplay Off!`,
					voice: speakSettings.voice || Speak.voices[speakSettings.voiceIndex],
					rate: speakSettings.rate,
					pitch: speakSettings.pitch,
				})
			}
		}
		setAutoPlay(checked)
	}

	const setSpeak = (status) => {
		Speak.cancel()
		if (status) {
			Speak.speak({
				text: `Audio On!`,
				voice: speakSettings.voice || Speak.voices[speakSettings.voiceIndex],
				rate: speakSettings.rate,
				pitch: speakSettings.pitch,
			})
		} else {
			Speak.speak({
				text: `Audio Off!`,
				voice: speakSettings.voice || Speak.voices[speakSettings.voiceIndex],
				rate: speakSettings.rate,
				pitch: speakSettings.pitch,
			})
		}
		setSpeakStatus(status)
	}

	if (curModule === -2) {
		return (
			<WorkoutAudio
				Speak={Speak}
				speakSettings={speakSettings}
				nextStep={nextStep}
				setSpeakStatus={setSpeakStatus}
				setSpeakSettings={setSpeakSettings}
			/>
		)
	} else if (curModule === -1) {
		return (
			<WorkoutStarted
				routineInfo={routine}
				Speak={Speak}
				speakStatus={speakStatus}
				speakSettings={speakSettings}
				nextStep={nextStep}
				setPlayStatus={setPlayStatus}
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
						prevModule={prevModule}
						autoPlay={autoPlay}
						Speak={Speak}
						speakStatus={speakStatus}
						speakSettings={speakSettings}
						settings={settings}
						nextStep={nextStep}
						prevStep={prevStep}
						lastStep={lastStep}
						setFillerModule={setFillerModule}
						setPlayStatus={setPlayStatus}
						setSpeakStatus={setSpeak}
						setAutoPlay={setAutoPlayData}
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
						setFillerModule={setFillerModule}
						setPlayStatus={setPlayStatus}
						setSpeakStatus={setSpeak}
						setAutoPlay={setAutoPlayData}
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
			/>
		)
	} else {
		return null
	}
}

export default WorkoutProgress
