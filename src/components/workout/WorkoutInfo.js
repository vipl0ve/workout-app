import React, { useState, useEffect } from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import BasicExercise from '../exercise/BasicExercise'
import ProgressionExercise from '../exercise/ProgressionExercise'
import SettingExercise from '../exercise/SettingExercise'

const WorkoutInfo = ({ data, settings, setCurRoutine }) => {
	const [routine] = useState(data)

	// Send data to parents when `exercise` state changes
	useEffect(() => {
		setCurRoutine(routine)
	}, [setCurRoutine, routine])

	useEffect(() => {
		setCurRoutine(data)
	}, [setCurRoutine, data])

	const changeCurProgression = (item) => {
		let newRoutine = routine
		let index = newRoutine.steps.exercise.findIndex((i) => i.id === item.id)
		newRoutine.steps.exercise.splice(index, 1, item)
		setCurRoutine(newRoutine)
	}

	return (
		<>
			<div className='text-center'>
				<div className='d-flex justify-content-between my-3'>
					<span className='h4 text-custom-color5'>{routine.name}</span>
					{/* <button
						type='button'
						className='btn'
						data-toggle='tooltip'
						data-placement='top'
						title='<><p className='h5'>Author: {routine.author}</p><p className='h5'>Website: <Link to={routine.url}>URL</Link></p></>'
					>
						<FontAwesomeIcon icon={faInfoCircle} />
					</button> */}
				</div>
			</div>
			<div className='accordion' id='accordionExample'>
				<div className='accordion-item'>
					<h2 className='accordion-header' id='headingOne'>
						<button
							className='accordion-button bg-custom-color3 text-light collapsed'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseOne'
							aria-expanded='false'
							aria-controls='collapseOne'
						>
							Warm-up Exercise
							<span className='badge bg-custom-color5 ms-3'>
								{routine.steps.warmup.length}
							</span>
						</button>
					</h2>
					<div
						id='collapseOne'
						className='accordion-collapse collapse'
						aria-labelledby='headingOne'
						data-bs-parent='#accordionExample'
					>
						<div className='accordion-body bg-custom-color2'>
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
							className='accordion-button bg-custom-color3 text-light collapsed'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseTwo'
							aria-expanded='false'
							aria-controls='collapseTwo'
						>
							Body-weight Exercise
							<span className='badge bg-custom-color5 ms-3'>
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
						<div className='accordion-body bg-custom-color2'>
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
							className='accordion-button bg-custom-color3 text-light collapsed'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseThree'
							aria-expanded='false'
							aria-controls='collapseThree'
						>
							Static Streching
							<span className='badge bg-custom-color5 ms-3'>
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
						<div className='accordion-body bg-custom-color2'>
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
							className='accordion-button bg-custom-color3 text-light collapsed'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseFour'
							aria-expanded='false'
							aria-controls='collapseFour'
						>
							Default Settings
							<span className='badge bg-custom-color5 ms-3'>
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
						<div className='accordion-body bg-custom-color2'>
							<ul className='list-group'>
								{Object.entries(settings).map(([key, value]) => (
									<SettingExercise key={key} keyname={key} value={value} />
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default WorkoutInfo
