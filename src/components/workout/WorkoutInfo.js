import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import BasicExercise from '../exercise/BasicExercise'
import ProgressionExercise from '../exercise/ProgressionExercise'

const WorkoutInfo = ({ data, settings, setCurRoutine }) => {
	const [routine] = useState(data)

	// Send data to parents when `exercise` state changes
	useEffect(() => {
		setCurRoutine(routine)
	}, [setCurRoutine, routine])

	const changeCurProgression = (item) => {
		let newRoutine = routine
		let index = newRoutine.steps.exercise.findIndex((i) => i.id === item.id)
		newRoutine.steps.exercise.splice(index, 1, item)
		setCurRoutine(newRoutine)
	}

	return (
		<>
			<div className='text-center'>
				<span className='h5'>
					{routine.name}
					<button
						type='button'
						className='btn'
						data-toggle='tooltip'
						data-placement='top'
						title='Tooltip on top'
					>
						<FontAwesomeIcon icon={faInfoCircle} />
					</button>
				</span>
			</div>
			{/* <p className='h5'>Author: {routine.author}</p>
			<p className='h5'>
				Website: <Link to={routine.url}>URL</Link>
			</p> */}
			<div className='accordion' id='accordionExample'>
				<div className='accordion-item'>
					<h2 className='accordion-header' id='headingOne'>
						<button
							className='accordion-button'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseOne'
							aria-expanded='true'
							aria-controls='collapseOne'
						>
							Warm-up
							<span className='badge bg-primary ms-3'>
								{routine.steps.warmup.length}
							</span>
						</button>
					</h2>
					<div
						id='collapseOne'
						className='accordion-collapse collapse show'
						aria-labelledby='headingOne'
						data-bs-parent='#accordionExample'
					>
						<div className='accordion-body'>
							<ul className='list-group'>
								{routine.steps.warmup.map((item) => (
									<BasicExercise key={item.id} data={item} />
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className='accordion-item'>
					<h2 className='accordion-header' id='headingTwo'>
						<button
							className='accordion-button collapsed'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseTwo'
							aria-expanded='false'
							aria-controls='collapseTwo'
						>
							Body Weight Exercise
							<span className='badge bg-primary ms-3'>
								{routine.steps.exercise.length}
							</span>
						</button>
					</h2>
					<div
						id='collapseTwo'
						className='accordion-collapse collapse'
						aria-labelledby='headingTwo'
						data-bs-parent='#accordionExample'
					>
						<div className='accordion-body'>
							<ul className='list-group'>
								{routine.steps.exercise.map((item) => (
									<ProgressionExercise
										key={item.id}
										data={item}
										changeCurProgression={changeCurProgression}
									/>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className='accordion-item'>
					<h2 className='accordion-header' id='headingThree'>
						<button
							className='accordion-button collapsed'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseThree'
							aria-expanded='false'
							aria-controls='collapseThree'
						>
							Static Streching
							<span className='badge bg-primary ms-3'>
								{routine.steps.stretch.length}
							</span>
						</button>
					</h2>
					<div
						id='collapseThree'
						className='accordion-collapse collapse'
						aria-labelledby='headingThree'
						data-bs-parent='#accordionExample'
					>
						<div className='accordion-body'>
							<ul className='list-group'>
								{routine.steps.stretch.map((item) => (
									<BasicExercise key={item.id} data={item} />
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className='accordion-item'>
					<h2 className='accordion-header' id='headingFour'>
						<button
							className='accordion-button collapsed'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseFour'
							aria-expanded='false'
							aria-controls='collapseFour'
						>
							Default Settings
							<span className='badge bg-primary ms-3'>
								{Object.keys(settings).length}
							</span>
						</button>
					</h2>
					<div
						id='collapseFour'
						className='accordion-collapse collapse'
						aria-labelledby='headingFour'
						data-bs-parent='#accordionExample'
					>
						<div className='accordion-body'>
							<ul className='list-group'>
								<li className='list-group-item'>
									<div className='d-flex justify-content-between'>
										<p className='mb-1'>Prep Time Before Set:</p>
										<p>{settings.prepTimeBeforeSet}s</p>
									</div>
								</li>
								<li className='list-group-item'>
									<div className='d-flex justify-content-between'>
										<p className='mb-1'>Rest Time Between Set:</p>
										<p>{settings.restBetweenSet}s</p>
									</div>
								</li>
								<li className='list-group-item'>
									<div className='d-flex justify-content-between'>
										<p className='mb-1'>Prep Time After Set:</p>
										<p>{settings.prepTimeAfterSet}s</p>
									</div>
								</li>
								<li className='list-group-item'>
									<div className='d-flex justify-content-between'>
										<p className='mb-1'>Prep Time Before Exercise:</p>
										<p>{settings.prepTimeBeforeExercise}s</p>
									</div>
								</li>
								<li className='list-group-item'>
									<div className='d-flex justify-content-between'>
										<p className='mb-1'>Rest Time Between Exercise:</p>
										<p>{settings.restBetweenExercise}s</p>
									</div>
								</li>
								<li className='list-group-item'>
									<div className='d-flex justify-content-between'>
										<p className='mb-1'>Prep Time After Exercise:</p>
										<p>{settings.prepTimeAfterExercise}s</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default WorkoutInfo
