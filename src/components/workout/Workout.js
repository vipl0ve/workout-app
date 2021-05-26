import React, { useState, useEffect } from 'react'
import Switch from 'react-switch'
import { useHistory } from 'react-router-dom'
//import $ from 'jquery'
import { routines } from '../../data/exercise.json'
import WorkoutAccordion from './WorkoutAccordion'
import { useLocalStorage } from '../utils/useLocalStorage'

const Workout = () => {
	const history = useHistory()
	const [routinesData] = useState(routines)
	const [saveWorkout, SetSaveWorkout] = useLocalStorage('bwSaveWorkout', {
		status: false,
		data: '',
		updatedDate: Date.now(),
	})
	const [curRoutine, setCurRoutine] = useState(
		saveWorkout.status ? saveWorkout.data : routinesData[0]
	)

	useEffect(() => {}, [curRoutine])

	const changeCurProgression = (exercise) => {
		let newRoutine = curRoutine
		let parentIndex = newRoutine.exercises.findIndex(
			(i) => i.id === exercise.parentid
		)
		if (parentIndex >= 0) {
			let childIndex = newRoutine.exercises[parentIndex].steps.findIndex(
				(i) => i.id === exercise.id
			)
			if (childIndex >= 0) {
				if (newRoutine.exercises[parentIndex].steps[childIndex] !== exercise) {
					newRoutine.exercises[parentIndex].steps.splice(
						childIndex,
						1,
						exercise
					)
					setCurRoutine(newRoutine)
					if (saveWorkout.status) {
						SetSaveWorkout({
							...saveWorkout,
							data: newRoutine,
							updatedDate: Date.now(),
						})
					}
				}
			} else {
				console.log('No Child found')
			}
		} else {
			console.log('No Parent found')
		}
	}

	const changeQty = (item) => {
		console.log('change qty')
	}

	const onChange = (e) => {
		const newRoutine = routinesData.filter((item) => item.id === e.target.value)
		setCurRoutine(newRoutine[0])
		if (saveWorkout.status) {
			SetSaveWorkout({
				...saveWorkout,
				data: newRoutine[0],
				updatedDate: Date.now(),
			})
		}
	}

	const onClick = (e) => {
		history.push({
			pathname: '/workoutprogress',
			// search: '?routine=' + encodeURI(curRoutine.name),
			state: { routine: curRoutine, settings: curRoutine.settings },
		})
	}

	const onResetClick = (e) => {
		const newRoutine = routinesData.filter((item) => item.id === curRoutine.id)
		setCurRoutine(newRoutine[0])
		SetSaveWorkout({
			status: false,
			data: '',
			updatedDate: Date.now(),
		})
	}

	const onSaveWorkout = () => {
		if (!saveWorkout.status) {
			SetSaveWorkout({
				status: true,
				data: curRoutine,
				updatedDate: Date.now(),
			})
		} else {
			SetSaveWorkout({
				status: false,
				data: '',
				updatedDate: Date.now(),
			})
		}
	}

	return (
		<>
			<div
				className='containerExercise d-flex flex-column justify-content-start'
				style={{ minHeight: '90vh', width: 'auto' }}
			>
				<h5 className='text-center text-custom-color6'>Select Routine</h5>
				<div className='d-flex justify-content-between mb-3 mx-1'>
					<select
						id='selectRoutine'
						className='form-select form-select-md bg-custom-color2 text-custom-color6 p-2'
						required
						value={curRoutine.id}
						onChange={onChange}
					>
						{routinesData.map((item) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<hr />

				<div className='text-center pb-2'>
					<span className='h4 text-custom-color5'>{curRoutine.name}</span>
					<div className='d-flex justify-content-center align-items-start mt-2'>
						<label>
							<span className='text-custom-color5 p-2'>Save Changes</span>
						</label>
						<Switch
							onChange={onSaveWorkout}
							checked={saveWorkout.status}
							offColor='#ddb892'
							onColor='#9c6644'
							className='react-switch'
						/>
					</div>
				</div>
				<div className='accordion' id='accordionExample'>
					{curRoutine.exercises.map((item) => (
						<WorkoutAccordion
							key={item.id}
							id={item.id}
							name={item.name}
							data={item.steps}
							type={item.type}
							changeQty={changeQty}
							changeCurProgression={changeCurProgression}
						/>
					))}
					<WorkoutAccordion
						key={'10'}
						idName={'10'}
						name={'Settings'}
						data={Object.entries(curRoutine.settings)}
						type={'Settings'}
					/>
				</div>

				<div className='row justify-content-around my-3'>
					<button
						type='button'
						className='btn btn-custom-color6 text-custom-color1 col-auto'
						onClick={onClick}
					>
						Start Workout
					</button>
					<button
						type='button'
						className='btn btn-custom-color6 text-custom-color1 col-auto'
						onClick={onResetClick}
					>
						Reset Workout
					</button>
				</div>
			</div>
		</>
	)
}

export default Workout
