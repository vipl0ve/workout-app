import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faForward,
	faBackward,
	faPause,
	faPlay,
} from '@fortawesome/free-solid-svg-icons'
import noImage from '../../asset/noImage.jpg'
import Timer from '../utils/Timer'

const WorkoutProgressionCard = ({
	exerciseData,
	exerciseType,
	time,
	play,
	settings,
	setStartStatus,
	setPlayStatus,
}) => {
	const [exercise, setExercise] = useState(exerciseData[0])
	const [counter, setCounter] = useState(exercise.id)
	const [rest, setRest] = useState(false)

	useEffect(() => {}, [play, exercise])

	const setCardPlayStatus = () => {
		setPlayStatus(!play)
	}

	const prevExercise = () => {
		if (parseInt(counter) > 1) {
			let newCounter = (parseInt(counter) - 1).toString()
			setCounter(newCounter)
			let newExercise = exerciseData.filter((item) => item.id === newCounter)
			setExercise(newExercise[0])
		} else if (parseInt(counter) === 1) {
			if (exerciseType === 'exercise') {
				setStartStatus({
					isIntro: false,
					isWarmup: true,
					isExercise: false,
					isStrech: false,
					isEnding: false,
				})
			}
		}
	}

	const nextExercise = () => {
		if (parseInt(counter) < exerciseData.length) {
			let newCounter = (parseInt(counter) + 1).toString()
			setCounter(newCounter)
			let newExercise = exerciseData.filter((item) => item.id === newCounter)
			setExercise(newExercise[0])
		} else if (parseInt(counter) === exerciseData.length) {
			if (exerciseType === 'exercise') {
				setStartStatus({
					isIntro: false,
					isWarmup: false,
					isExercise: false,
					isStrech: true,
					isEnding: false,
				})
			}
		}
	}

	return (
		<div className='card text-center'>
			<div className='card-header'>
				Strength Exercise: {exercise.name}
				<Timer data={time} type={'badge'} />
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
					<h5 className='card-title'>
						{exercise.curProgressions.name}: {exercise.curProgressions.qty}
					</h5>
				) : (
					<h5 className='card-title'>
						{exercise.curProgressions.name}: {exercise.curProgressions.qty}
					</h5>
				)}
				<p className='card-text'>{exercise.curProgressions.desc}</p>
				<div className='btn-group' role='group' aria-label='Basic example'>
					<button type='button' className='btn btn-primary'>
						<FontAwesomeIcon icon={faBackward} onClick={prevExercise} />
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
					<button type='button' className='btn btn-primary'>
						<FontAwesomeIcon icon={faForward} onClick={nextExercise} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default WorkoutProgressionCard
