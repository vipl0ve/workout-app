import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlay,
	faSave,
	faTrashAlt,
	faMedal,
} from '@fortawesome/free-solid-svg-icons'
import { quotes } from '../../data/quotes.json'
import exerciseIcon from '../../asset/exerciseIcon.png'

const WorkoutIntro = ({
	routineInfo,
	time,
	curModule,
	nextStep,
	setPlayStatus,
}) => {
	const history = useHistory()
	function getRandomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	const [allQuotes] = useState(quotes)
	const [quote] = useState(allQuotes[getRandomInt(0, allQuotes.length - 1)])

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
			<div className='container exercise'>
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
			</div>
		)
	} else if (curModule === routineInfo.exercises.length) {
		return (
			<div className='container exercise'>
				<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
					<div className='card-header bg-transparent border-custom-color4'>
						<div className='d-flex justify-content-center align-items-center'>
							<h6>End Workout</h6>
						</div>
					</div>
					<div className='card-body'>
						{time < 60 ? (
							<>
								<h5 className='card-title'>Oops!</h5>
								<p className='card-text'>
									Looks like there was no workout recorded. Perform a complete
									workout and comeback for your medal.
								</p>
							</>
						) : (
							<>
								<h5 className='card-title'>Congratulations!</h5>
								<p className='card-text'>
									You just completed a {moment.duration(time * 1000).minutes()}{' '}
									mintues workout.
								</p>
								<p>You deserve this medal.</p>
								<h3>
									<FontAwesomeIcon icon={faMedal} />
								</h3>
							</>
						)}

						<div className='row my-3'>
							<div className='col'>
								<button
									type='button'
									className='btn btn-custom-color6'
									onClick={onFinished}
								>
									Save <FontAwesomeIcon icon={faSave} />
								</button>
							</div>
							<div className='col'>
								<button
									type='button'
									className='btn btn-custom-color6'
									onClick={onDiscard}
								>
									Discard <FontAwesomeIcon icon={faTrashAlt} />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='my-5 p-2 border border-custom-color6 rounded'>
					<blockquote className='blockquote text-center text-custom-color6'>
						<p className='mb-0'>{quote.quote}.</p>
						<footer className='blockquote-footer mt-2 text-custom-color4'>
							{quote.author + ', '}
							<small>{quote.authorInfo}</small>
						</footer>
					</blockquote>
				</div>
			</div>
		)
	} else {
		return null
	}
}

export default WorkoutIntro
