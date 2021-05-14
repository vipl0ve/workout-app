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

const WorkoutBasicCard = ({
	exerciseData,
	time,
	play,
	exerciseType,
	setStartStatus,
	setPlayStatus,
}) => {
	const [exercise, setExercise] = useState(exerciseData[0])
	const [counter, setCounter] = useState(exercise.id)

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
			if (exerciseType === 'warmup') {
				setStartStatus({
					isIntro: true,
					isWarmup: false,
					isExercise: false,
					isStrech: false,
					isEnding: false,
				})
			} else if (exerciseType === 'stretch') {
				setStartStatus({
					isIntro: false,
					isWarmup: false,
					isExercise: true,
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
			if (exerciseType === 'warmup') {
				setStartStatus({
					isIntro: false,
					isWarmup: false,
					isExercise: true,
					isStrech: false,
					isEnding: false,
				})
			} else if (exerciseType === 'stretch') {
				setStartStatus({
					isIntro: false,
					isWarmup: false,
					isExercise: false,
					isStrech: false,
					isEnding: true,
				})
			}
		}
	}

	return (
		<div className='card text-center'>
			{(function () {
				if (exerciseType === 'warmup') {
					return (
						<div className='card-header'>
							Warmp Exercise
							<Timer data={time} type={'badge'} />
						</div>
					)
				} else if (exerciseType === 'stretch') {
					return (
						<div className='card-header'>
							Static Streching
							<Timer data={time} type={'badge'} />
						</div>
					)
				}
			})()}

			{exercise.img === '' ? (
				<img src={noImage} className='card-img-top' alt={exercise.name} />
			) : (
				<img src={exercise.img} className='card-img-top' alt={exercise.name} />
			)}
			<div className='card-body'>
				{exercise.type === 'Reps' ? (
					<h5 className='card-title'>
						{exercise.name}: x{exercise.qty}
					</h5>
				) : (
					<h5 className='card-title'>
						{exercise.name}: {exercise.qty}
					</h5>
				)}
				<p className='card-text'>{exercise.desc}</p>
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

export default WorkoutBasicCard
