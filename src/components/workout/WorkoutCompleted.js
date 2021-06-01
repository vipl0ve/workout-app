import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import NoSleep from 'nosleep.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashAlt, faMedal } from '@fortawesome/free-solid-svg-icons'
import { quotes } from '../../data/quotes.json'
import { getRandomInt, secondFormatted } from '../../helper/helperfunctions'

const WorkoutCompleted = ({
	routineInfo,
	time,
	Speak,
	speakStatus,
	speakSettings,
}) => {
	const history = useHistory()
	var noSleep = new NoSleep()
	const [initialize, setInitialize] = useState(true)
	noSleep.disable()
	const [allQuotes] = useState(quotes)
	const [quote] = useState(allQuotes[getRandomInt(0, allQuotes.length - 1)])

	useEffect(() => {
		if (initialize) {
			setInitialize(false)
			if (speakStatus) {
				Speak.cancel()
				if (time < 60) {
					Speak.speak({
						text: `No Workout found`,
						voice: speakSettings.voice,
						rate: speakSettings.rate,
						pitch: speakSettings.pitch,
					})
				} else {
					Speak.speak({
						text: `Congratulations! Workout Completed. Total Duration ${moment
							.duration(time, 's')
							.humanize()}`,
						voice: speakSettings.voice,
						rate: speakSettings.rate,
						pitch: speakSettings.pitch,
					})
				}
			}
		}
	}, [Speak, time, speakSettings, speakStatus, initialize])

	const onFinished = () => {
		const workout = {
			routineName: routineInfo.name,
			totalDuration: time,
			workoutEndTime: moment().format(),
		}
		history.push({
			pathname: '/workoutsummary',
			state: {
				workout: workout,
			},
		})
	}

	const onDiscard = () => {
		history.push({
			pathname: '/',
		})
	}

	return (
		<div className='maincontainer d-flex flex-column justify-content-center'>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header bg-transparent border-custom-color4'>
					<h5 className='text-custom-color6'>Workout Completed</h5>
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
								You just completed workout. Total Duration{' '}
								{secondFormatted(time, 'HH:mm:ss')}.
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
								className='btn btn-custom-color6 text-custom-color1'
								onClick={onFinished}
							>
								Save <FontAwesomeIcon icon={faSave} />
							</button>
						</div>
						<div className='col'>
							<button
								type='button'
								className='btn btn-custom-color6 text-custom-color1'
								onClick={onDiscard}
							>
								Discard <FontAwesomeIcon icon={faTrashAlt} />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='my-5 p-2 border border-custom-color6 rounded'>
				<blockquote className='blockquote text-center text-custom-color6 fs-6'>
					<p className='mb-0'>
						<i>{'"' + quote.quote + '"'}</i>
					</p>
					<footer className='blockquote-footer mt-2 text-custom-color4'>
						<small>{quote.author + ', ' + quote.authorInfo}</small>
					</footer>
				</blockquote>
			</div>
		</div>
	)
}

export default WorkoutCompleted
