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
import Watch from '../utils/Watch'

const WorkoutBasicCard = ({
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
			if (exerciseType === 'Warmup') {
				changeCurModule('Intro')
			} else if (exerciseType === 'Stretch') {
				changeCurModule('Exercise')
			}
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
			if (exerciseType === 'Warmup') {
				changeCurModule('Exercise')
				changeFillerModule('filler')
			} else if (exerciseType === 'Stretch') {
				changeCurModule('Ending')
				changeFillerModule('filler')
			}
		}
	}

	if (exercise.type === 'Reps') {
		return (
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				{exerciseType === 'Warmup' ? (
					<div className='card-header bg-transparent border-custom-color4'>
						<div className='d-flex justify-content-between'>
							<span className=''>
								Warm-up Exercise: {counter + '/' + exerciseData.length}
							</span>
							<Timer
								className='badge bg-custom-color4 fs-6'
								data={time}
								type={'no-badge'}
							/>
						</div>
					</div>
				) : (
					<div className='card-header bg-transparent border-custom-color4'>
						<div className='d-flex justify-content-between'>
							<span>
								Stretching Exercise: {counter + '/' + exerciseData.length}
							</span>
							<Timer
								className='badge bg-custom-color4 fs-6'
								data={time}
								type={'no-badge'}
							/>
						</div>
					</div>
				)}
				{exercise.img === '' ? (
					<img src={noImage} className='card-img-top' alt={exercise.name} />
				) : (
					<img
						src={exercise.img}
						className='card-img-top'
						alt={exercise.name}
					/>
				)}
				<div className='card-body'>
					<div className='d-flex justify-content-between'>
						<h5 className='card-title text-custom-color5'>
							{exercise.name}: {exercise.qty}x
						</h5>
						{exercise.autoPlay !== '' ? (
							<Watch
								data={exercise.autoPlay}
								className='text-custom-color6 font-weight-bold'
								onComplete={nextExercise}
								onPause={setCardPlayStatus}
								currentId={exercise.id}
								settings={'ms'}
							/>
						) : (
							<></>
						)}
					</div>
					<p className='card-text'>{exercise.desc}</p>
					<div className='btn-group' role='group' aria-label='Basic example'>
						<button type='button' className='btn btn-custom-color6'>
							<FontAwesomeIcon icon={faBackward} onClick={prevExercise} />
						</button>
						<button
							type='button'
							className='btn btn-custom-color6'
							onClick={setCardPlayStatus}
						>
							{play ? (
								<FontAwesomeIcon icon={faPause} />
							) : (
								<FontAwesomeIcon icon={faPlay} />
							)}
						</button>
						<button type='button' className='btn btn-custom-color6'>
							<FontAwesomeIcon icon={faForward} onClick={nextExercise} />
						</button>
					</div>
				</div>
			</div>
		)
	} else if (exercise.type === 'Duration') {
		return (
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				{exerciseType === 'Warmup' ? (
					<div className='card-header bg-transparent border-custom-color4'>
						<div className='d-flex justify-content-between'>
							<span className='custom-color4'>
								Warm-up Exercise: {counter + '/' + exerciseData.length}
							</span>
							<Timer
								className='badge bg-custom-color4 fs-6'
								data={time}
								type={'no-badge'}
							/>
						</div>
					</div>
				) : (
					<div className='card-header bg-transparent border-custom-color4'>
						<div className='d-flex justify-content-between'>
							<span>
								Stretching Exercise: {counter + '/' + exerciseData.length}
							</span>
							<Timer
								className='badge bg-custom-color4 fs-6'
								data={time}
								type={'no-badge'}
							/>
						</div>
					</div>
				)}
				{exercise.img === '' ? (
					<img src={noImage} className='card-img-top' alt={exercise.name} />
				) : (
					<img
						src={exercise.img}
						className='card-img-top'
						alt={exercise.name}
					/>
				)}
				<div className='card-body'>
					<div className='d-flex justify-content-around'>
						<h5 className='card-title text-custom-color5'>
							{exercise.name}: {exercise.qty}s
						</h5>
						<Watch
							data={exercise.qty}
							className='text-custom-color6 font-weight-bold'
							onComplete={nextExercise}
							onPause={setCardPlayStatus}
							currentId={exercise.id}
							settings={'ms'}
						/>
					</div>
					<p className='card-text'>{exercise.desc}</p>
					<div className='btn-group' role='group' aria-label='Basic example'>
						<button type='button' className='btn btn-custom-color6'>
							<FontAwesomeIcon icon={faBackward} onClick={prevExercise} />
						</button>
						<button
							type='button'
							className='btn btn-custom-color6'
							onClick={setCardPlayStatus}
						>
							{play ? (
								<FontAwesomeIcon icon={faPause} />
							) : (
								<FontAwesomeIcon icon={faPlay} />
							)}
						</button>
						<button type='button' className='btn btn-custom-color6'>
							<FontAwesomeIcon icon={faForward} onClick={nextExercise} />
						</button>
					</div>
				</div>
			</div>
		)
	} else {
		return null
	}
}

export default WorkoutBasicCard
