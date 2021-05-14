import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Timer from '../utils/Timer'

const WorkoutCompleted = (props) => {
	const history = useHistory()
	const [workout] = useState(props.location.state.workout)

	const goHome = () => {
		history.push({
			pathname: '/',
			state: {},
		})
	}

	const goWorkoutCalendar = () => {
		history.push({
			pathname: '/',
			state: { workout: workout },
		})
	}

	return (
		<div className='container'>
			<div className='card text-center'>
				<div className='card-header'>
					<h5>Completed!</h5>
				</div>
				<div className='card-body text-start'>
					<h5 className='card-title text-center'>Workout Summary</h5>
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
