import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import Timer from '../utils/Timer'
import exerciseIcon from '../../asset/exerciseIcon.png'

const WorkoutIntro = ({
	routineInfo,
	time,
	curModule,
	nextStep,
	setPlayStatus,
}) => {
	const history = useHistory()
	const onPlay = () => {
		nextStep()
		setPlayStatus(true)
	}

	const onFinished = () => {
		const workout = {
			routineName: routineInfo.name,
			totalDuration: time,
			workoutTime: moment().format(),
		}
		setPlayStatus(false)
		history.push({
			pathname: '/workoutcompleted',
			state: {
				workout: workout,
			},
		})
	}

	const onDiscard = () => {
		setPlayStatus(false)
		history.push({
			pathname: '/',
		})
	}

	if (curModule === -1) {
		return (
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header bg-transparent border-custom-color4'>
					Start Workout
				</div>

				<div className='card-body'>
					<div className='card-title'>
						<h5>{routineInfo.name}</h5>
						<small className='card-text'>{routineInfo.author}</small>
					</div>

					<p className='card-text'>
						Start the routine.
						<img src={exerciseIcon} className='card-text' alt='exercise' />
					</p>
					<button
						type='button'
						className='btn btn-custom-color6'
						onClick={onPlay}
					>
						Start Workout <FontAwesomeIcon icon={faPlay} />
					</button>
				</div>
			</div>
		)
	} else if (curModule === routineInfo.exercises.length) {
		return (
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header bg-transparent border-custom-color4'>
					<div className='d-flex justify-content-between'>
						<span>End Workout</span>
						<Timer
							className='badge bg-custom-color4 fs-6'
							data={time}
							type={'no-badge'}
						/>
					</div>
				</div>
				<div className='card-body'>
					<h5 className='card-title'>{routineInfo.name}</h5>
					<p className='card-text'>
						Congrats! you have completed all the steps. End workout now.
					</p>
					<div className='row my-3'>
						<div className='col'>
							<button
								type='button'
								className='btn btn-custom-color6'
								onClick={onFinished}
							>
								Save Log <FontAwesomeIcon icon={faSave} />
							</button>
						</div>
						<div className='col'>
							<button
								type='button'
								className='btn btn-custom-color6'
								onClick={onDiscard}
							>
								Discard Log <FontAwesomeIcon icon={faTrashAlt} />
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return null
	}
}

export default WorkoutIntro
