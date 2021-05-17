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
		<div className='container'>
			<div className='card text-center'>
				<div className='card-header'>
					<h5>Workout Summary</h5>
				</div>
				<div className='card-body text-start'>
					<h5 className='card-title text-center'>Completed!</h5>
					<p className='card-text'>Routine: {workout.routineName}</p>
					<p className='card-text'>
						Time:{' '}
						{moment(workout.workoutTime).format('dddd, MMM Do YY, h:mm:ss A')}
					</p>
					<p className='card-text'>
						Duration: <Timer data={workout.totalDuration} type={'no-badge'} />
					</p>
					<div className='d-flex justify-content-around'>
						<button type='button' className='btn btn-primary' onClick={goHome}>
							Home <FontAwesomeIcon icon={faHome} />
						</button>
						<button
							type='button'
							className='btn btn-primary'
							onClick={goWorkoutCalendar}
						>
							Workout Calendar <FontAwesomeIcon icon={faCalendarAlt} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WorkoutCompleted
