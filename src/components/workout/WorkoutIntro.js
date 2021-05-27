import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import $ from 'jquery'
import NoSleep from 'nosleep.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlay,
	faSave,
	faTrashAlt,
	faMedal,
} from '@fortawesome/free-solid-svg-icons'
import { quotes } from '../../data/quotes.json'
import exerciseIcon from '../../asset/exerciseIcon.png'
import Speak from '../utils/Speak'
import CardBtnSpeak from '../workoutCards/CardBtnSpeak'
import { secondFormatted } from '../../helper/helperfunctions'

const WorkoutIntro = ({
	routineInfo,
	time,
	speak,
	curModule,
	nextStep,
	setPlayStatus,
	setSpeakStatus,
}) => {
	const history = useHistory()
	var noSleep = new NoSleep()
	function getRandomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	const [allQuotes] = useState(quotes)
	const [quote] = useState(allQuotes[getRandomInt(0, allQuotes.length - 1)])

	useEffect(() => {
		$('html, body').animate(
			{
				scrollTop: $('.card').first().offset().top,
			},
			200
		)
	}, [])

	useEffect(() => {
		if (speak) {
			if (curModule === -1) {
				Speak({
					text: `Get Started Now!`,
					voiceIndex: 1,
				})
			} else if (curModule === routineInfo.exercises.length) {
				if (time < 60) {
					Speak({
						text: `No Workout found`,
						voiceIndex: 1,
					})
				} else {
					Speak({
						text: `Congratulations! Workout Completed. Total Duration ${moment
							.duration(time, 's')
							.humanize()}`,
						voiceIndex: 1,
					})
				}
			}
		}
	}, [speak, curModule, routineInfo.exercises.length, time])

	const onPlay = () => {
		noSleep.enable()
		nextStep()
		setPlayStatus(true)
	}

	const onFinished = () => {
		const workout = {
			routineName: routineInfo.name,
			totalDuration: time,
			workoutEndTime: moment().format(),
		}
		noSleep.disable()
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
		noSleep.disable()
		history.push({
			pathname: '/',
		})
	}

	if (curModule === -1) {
		return (
			<div
				className='containerExercise d-flex flex-column justify-content-center'
				style={{ minHeight: '90vh', width: 'auto' }}
			>
				<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
					<div className='card-header bg-transparent border-custom-color4'>
						<h5 className='text-custom-color6'>
							Workout Started
							<CardBtnSpeak
								speak={speak}
								setSpeakStatus={setSpeakStatus}
								isBtn={false}
							/>
						</h5>
					</div>

					<div className='card-body'>
						<div className='card-title'>
							<h5>{routineInfo.name}</h5>
							<small className='card-text'>Author: {routineInfo.author}</small>
						</div>
						<p className='card-text'>
							<img src={exerciseIcon} className='card-text' alt='exercise' />
						</p>
						<button
							type='button'
							className='btn btn-custom-color6 text-custom-color1'
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
			<div
				className='containerExercise d-flex flex-column justify-content-center'
				style={{ minHeight: '90vh', width: 'auto' }}
			>
				<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
					<div className='card-header bg-transparent border-custom-color4'>
						<div className='d-flex justify-content-center align-items-center'>
							<h5 className='text-custom-color6'>
								Workout Completed
								<CardBtnSpeak
									speak={speak}
									setSpeakStatus={setSpeakStatus}
									isBtn={false}
								/>
							</h5>
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
									You just completed workout. Total Duration{' '}
									{secondFormatted(time)}.
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
	} else {
		return null
	}
}

export default WorkoutIntro
