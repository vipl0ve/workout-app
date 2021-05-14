import React from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import Timer from '../utils/Timer'
import exerciseIcon from '../../asset/exerciseIcon.png'

const WorkoutIntro = ({
	routineInfo,
	time,
	exerciseType,
	setPlayStatus,
	setStartStatus,
}) => {
	const history = useHistory()
	const onPlay = () => {
		setStartStatus({
			isIntro: false,
			isWarmup: true,
			isExercise: false,
			isStrech: false,
			isFinished: false,
		})
		setPlayStatus(true)
	}

	const onFinished = () => {
		setStartStatus({
			isIntro: true,
			isWarmup: false,
			isExercise: false,
			isStrech: false,
			isFinished: false,
		})
		setPlayStatus(false)

		history.push({
			pathname: '/workoutcompleted',
			state: {
				workout: {
					routineName: routineInfo.name,
					totalDuration: time,
					workoutTime: Date.now(),
				},
			},
		})
	}

	if (exerciseType === 'intro') {
		return (
			<div className='card text-center'>
				<div className='card-header'>Start Workout</div>
				<div className='card-body'>
					<div className='card-title'>
						<h5>{routineInfo.name}</h5>
						<small className='card-text'>{routineInfo.author}</small>
					</div>

					<p className='card-text'>
						Get Ready to start the workout.
						<img src={exerciseIcon} className='card-text' alt='exercise' />
					</p>
					<button type='button' className='btn btn-primary' onClick={onPlay}>
						Start Workout <FontAwesomeIcon icon={faPlay} />
					</button>
				</div>
			</div>
		)
	} else if (exerciseType === 'ending') {
		return (
			<div className='card text-center'>
				<div className='card-header'>
					End Workout
					<Timer data={time} type={'badge'} />
				</div>
				<div className='card-body'>
					<h5 className='card-title'>{routineInfo.name}</h5>
					<p className='card-text'>
						You completed all the steps. You can end the workout.
					</p>
					<button
						type='button'
						className='btn btn-primary'
						onClick={onFinished}
					>
						End Workout <FontAwesomeIcon icon={faStop} />
					</button>
				</div>
			</div>
		)
	}
}

export default WorkoutIntro
