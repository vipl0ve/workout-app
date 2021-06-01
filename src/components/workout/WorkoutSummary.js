import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Timer from '../utils/Timer'
import { useLocalStorage } from '../utils/useLocalStorage'
import { findMaxId } from '../../helper/helperfunctions'

const WorkoutSummary = (props) => {
	const history = useHistory()
	const [workout] = useState(props.location.state.workout)
	const [events, setEvents] = useLocalStorage('bwWorkoutHistory', '')

	useEffect(() => {
		let newEvent = {}
		if (events.length === undefined) {
			newEvent = {
				id: 0,
				title: workout.routineName,
				duration: workout.totalDuration,
				start: moment(workout.workoutEndTime).subtract(
					workout.totalDuration,
					'seconds'
				),
				end: moment(workout.workoutEndTime).format(),
				day: moment(workout.workoutEndTime)
					.subtract(workout.totalDuration, 'seconds')
					.format('ddd'),
				week: moment(workout.workoutEndTime)
					.subtract(workout.totalDuration, 'seconds')
					.format('w'),
			}
			setEvents([newEvent])
		} else if (events.length === 0) {
			newEvent = {
				id: 0,
				title: workout.routineName,
				duration: workout.totalDuration,
				start: moment(workout.workoutEndTime)
					.subtract(workout.totalDuration, 'seconds')
					.format(),
				end: moment(workout.workoutEndTime).format(),
				day: moment(workout.workoutEndTime)
					.subtract(workout.totalDuration, 'seconds')
					.format('ddd'),
				week: moment(workout.workoutEndTime)
					.subtract(workout.totalDuration, 'seconds')
					.format('w'),
			}
			setEvents([newEvent])
		} else {
			const eventIndex = events.findIndex(
				(x) => x.end === moment(workout.workoutEndTime).format()
			)
			if (eventIndex === -1) {
				newEvent = {
					id: findMaxId(events) + 1,
					title: workout.routineName,
					duration: workout.totalDuration,
					start: moment(workout.workoutEndTime)
						.subtract(workout.totalDuration, 'seconds')
						.format(),
					end: moment(workout.workoutEndTime).format(),
					day: moment(workout.workoutEndTime)
						.subtract(workout.totalDuration, 'seconds')
						.format('ddd'),
					week: moment(workout.workoutEndTime)
						.subtract(workout.totalDuration, 'seconds')
						.format('w'),
				}
				events.push(newEvent)
				setEvents(events)
			} else {
				console.log('Event Already Available')
			}
		}
	}, [events, setEvents, workout])

	const goHome = () => {
		history.push({
			pathname: '/',
			state: {},
		})
	}

	const goWorkoutCalendar = () => {
		history.push({
			pathname: '/workouthistory',
		})
	}

	return (
		<>
			<div className='maincontainer container d-flex flex-column justify-content-center'>
				<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
					<div className='card-header bg-transparent border-custom-color4'>
						<h5>Workout Summary</h5>
					</div>
					<div className='card-body text-start'>
						<p className='card-text'>
							Routine: <u>{workout.routineName}</u>
						</p>
						<p className='card-text'>
							Time:{' '}
							<i>
								{moment(workout.workoutEndTime).format(
									'dddd, MMM Do YY, h:mm:ss A'
								)}
							</i>
						</p>
						<p className='card-text'>
							Duration:{' '}
							<i>
								<Timer data={workout.totalDuration} />
							</i>
						</p>
						<div className='d-flex justify-content-around'>
							<button
								type='button'
								className='btn btn-custom-color6 text-custom-color1'
								onClick={goHome}
							>
								Home <FontAwesomeIcon icon={faHome} />
							</button>
							<button
								type='button'
								className='btn btn-custom-color6 text-custom-color1'
								onClick={goWorkoutCalendar}
							>
								Workout Calendar <FontAwesomeIcon icon={faCalendarAlt} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default WorkoutSummary
