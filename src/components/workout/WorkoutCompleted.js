import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Timer from '../utils/Timer'

const WorkoutCompleted = (props) => {
	const history = useHistory()
	const [workout] = useState(props.location.state.workout)
	const [events, setEvents] = useState(
		JSON.parse(localStorage.getItem('bodyworkout')) || []
	)

	useEffect(() => {
		let newEvent = {}
		if (events.length === undefined) {
			newEvent = {
				id: 0,
				title: workout.routineName,
				duration: workout.totalDuration,
				start: moment(workout.workoutTime).subtract(
					workout.totalDuration,
					'seconds'
				),
				end: moment(workout.workoutTime).format(),
			}
			setEvents([newEvent])
		} else if (events.length === 0) {
			newEvent = {
				id: 0,
				title: workout.routineName,
				duration: workout.totalDuration,
				start: moment(workout.workoutTime)
					.subtract(workout.totalDuration, 'seconds')
					.format(),
				end: moment(workout.workoutTime).format(),
			}
			setEvents([newEvent])
		} else {
			const eventIndex = events.findIndex(
				(x) => x.end === moment(workout.workoutTime).format()
			)
			if (eventIndex === -1) {
				newEvent = {
					id: events.length + 1,
					title: workout.routineName,
					start: moment(workout.workoutTime)
						.subtract(workout.totalDuration, 'seconds')
						.format(),
					end: moment(workout.workoutTime).format(),
				}
				events.push(newEvent)
				setEvents(events)
			} else {
				console.log('Event Already Available')
			}
		}
		localStorage.setItem('bodyworkout', JSON.stringify(events))
	}, [events, workout])

	const goHome = () => {
		history.push({
			pathname: '/',
			state: {},
		})
	}

	const goWorkoutCalendar = () => {
		history.push({
			pathname: '/calendar',
		})
	}

	return (
		<>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header bg-transparent border-custom-color4'>
					<h5>Workout Summary</h5>
				</div>
				<div className='card-body text-start'>
					<h5 className='card-title text-center'>Completed!</h5>
					<p className='card-text'>
						Routine: <u>{workout.routineName}</u>
					</p>
					<p className='card-text'>
						Time:{' '}
						<i>
							{moment(workout.workoutTime).format('dddd, MMM Do YY, h:mm:ss A')}
						</i>
					</p>
					<p className='card-text'>
						Duration:{' '}
						<i>
							<Timer data={workout.totalDuration} type={'no-badge'} />
						</i>
					</p>
					<div className='d-flex justify-content-around'>
						<button
							type='button'
							className='btn btn-custom-color6'
							onClick={goHome}
						>
							Home <FontAwesomeIcon icon={faHome} />
						</button>
						<button
							type='button'
							className='btn btn-custom-color6'
							onClick={goWorkoutCalendar}
						>
							Workout Calendar <FontAwesomeIcon icon={faCalendarAlt} />
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default WorkoutCompleted
