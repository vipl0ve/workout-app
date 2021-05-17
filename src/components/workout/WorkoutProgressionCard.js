import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faForward,
	faBackward,
	faPause,
	faPlay,
	faStepForward,
} from '@fortawesome/free-solid-svg-icons'
import noImage from '../../asset/noImage.jpg'
import Timer from '../utils/Timer'
import { getQty } from '../../helper/helperfunctions'
import Stopwatch from '../utils/Stopwatch'
import Watch from '../utils/Watch'

const WorkoutProgressionCard = ({
	exerciseData,
	exerciseType,
	time,
	play,
	settings,
	changeCurModule,
	changeFillerModule,
	setPlayStatus,
}) => {
	const [exercise, setExercise] = useState(exerciseData[0])
	const [counter, setCounter] = useState(parseInt(exercise.id))
	const [reps, setReps] = useState(getQty(exercise.curProgressions.qty))
	const [totalSets, setTotalSets] = useState(reps.length)
	const [curSet, setCurSet] = useState(1)
	const [activity, setActivity] = useState('Exercise')
	const [showTimer, setShowTimer] = useState(false)

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
		console.log('Timer Completed')
		setActivity('Exercise')
		checkActivity()
	}

	const timerPaused = () => {
		console.log('Timer Paused')
	}

	const timerSkip = () => {
		console.log('Timer Skiped')
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
			if (exerciseType === 'Exercise') {
				changeCurModule('Warmup')
			}
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
			if (exerciseType === 'Exercise') {
				changeCurModule('Stretch')
				changeFillerModule('filler')
			}
		}
	}

	if (showTimer) {
		return (
			<div className='card text-center'>
				<div className='card-header'>
					{activity === 'RestSet'
						? 'Next Set >> Rest ' + settings.betweenSet + 's'
						: 'Next Exercise >> Rest ' + settings.betweenExercise + 's'}
				</div>
				<Stopwatch
					data={
						activity === 'RestSet'
							? settings.betweenSet
							: settings.betweenExercise
					}
					timerCompletedStatus={timerCompleted}
					timerPausedStatus={timerPaused}
				/>
				<button type='button' className='btn btn-primary' onClick={timerSkip}>
					Skip Rest <FontAwesomeIcon icon={faStepForward} />
				</button>
			</div>
		)
	} else {
		return (
			<div className='card text-center'>
				<div className='card-header'>
					<div className='d-flex justify-content-between'>
						Strength Exercise: {exercise.name}{' '}
						{counter + '/' + exerciseData.length}
						<Timer
							className='badge bg-secondary fs-6'
							data={time}
							type={'no-badge'}
						/>
					</div>
				</div>
				{exercise.curProgressions.img === '' ? (
					<img src={noImage} className='card-img-top' alt={exercise.name} />
				) : (
					<img
						src={exercise.curProgressions.img}
						className='card-img-top'
						alt={exercise.curProgressions.name}
					/>
				)}
				<div className='card-body'>
					{exercise.curProgressions.type === 'Reps' ? (
						exercise.autoPlay !== '' ? (
							<>
								<h5 className='card-title'>
									{exercise.curProgressions.name +
										' [Rep ' +
										curSet +
										'/' +
										totalSets +
										']'}
									:{' ' + reps[curSet - 1]}x
								</h5>
								<Watch
									data={(
										parseInt(exercise.autoPlay) * parseInt(reps[curSet - 1])
									).toString()}
									className='text-primary font-weight-bold'
									onComplete={checkActivity}
									currentId={exercise.id}
									settings={'ms'}
								/>
							</>
						) : (
							<>
								<h5 className='card-title'>
									{exercise.curProgressions.name +
										' [Rep ' +
										curSet +
										'/' +
										totalSets +
										']'}
									:{' ' + reps[curSet - 1]}x
								</h5>
							</>
						)
					) : (
						<>
							<h5 className='card-title'>
								{exercise.curProgressions.name +
									' [Rep ' +
									curSet +
									'/' +
									totalSets +
									']'}
								:{' ' + reps[curSet - 1]}s
							</h5>

							<Watch
								data={exercise.curProgressions.qty}
								className='text-primary font-weight-bold'
								onComplete={checkActivity}
								currentId={exercise.id}
								settings={'ms'}
							/>
						</>
					)}
					<p className='card-text'>{exercise.curProgressions.desc}</p>
					<div className='btn-group' role='group' aria-label='Basic example'>
						<button
							type='button'
							className='btn btn-primary'
							onClick={prevElement}
						>
							<FontAwesomeIcon icon={faBackward} />
						</button>
						<button
							type='button'
							className='btn btn-primary'
							onClick={setCardPlayStatus}
						>
							{play ? (
								<FontAwesomeIcon icon={faPause} />
							) : (
								<FontAwesomeIcon icon={faPlay} />
							)}
						</button>
						<button
							type='button'
							className='btn btn-primary'
							onClick={checkActivity}
						>
							<FontAwesomeIcon icon={faForward} />
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default WorkoutProgressionCard
