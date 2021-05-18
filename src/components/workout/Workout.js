import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { routines } from '../../data/exercise.json'
import { settings } from '../../data/workoutSettings.json'
import WorkoutInfo from './WorkoutInfo'

const Workout = () => {
	const history = useHistory()
	const [routinesData] = useState(routines)
	const [curSettings] = useState(settings)
	const [curRoutine, setCurRoutine] = useState(routinesData[0])

	useEffect(() => {}, [curRoutine])

	const onChange = (e) => {
		const newRoutine = routinesData.filter((item) => item.id === e.target.value)
		setCurRoutine(newRoutine[0])
	}

	const onClick = (e) => {
		history.push({
			pathname: '/workoutprogress',
			search: '?routine=' + encodeURI(curRoutine.name),
			state: { routine: curRoutine, settings: curSettings },
		})
	}

	const onResetClick = (e) => {
		const newRoutine = routinesData.filter((item) => item.id === curRoutine.id)
		setCurRoutine(newRoutine[0])
	}

	return (
		<>
			<div className='container bg-custom-color1'>
				<h5 className='text-center'>Select Routine</h5>
				<div className='d-flex justify-content-between mb-3 mx-1'>
					<select
						id='selectRoutine'
						className='form-select form-select-md bg-custom-color2'
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

				<WorkoutInfo
					data={curRoutine}
					settings={curSettings}
					setCurRoutine={setCurRoutine}
				/>
				<div className='row justify-content-around my-3'>
					<button
						type='button'
						className='btn btn-custom-color6 col-auto'
						onClick={onClick}
					>
						Start Workout
					</button>
					<button
						type='button'
						className='btn btn-custom-color6 col-auto'
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
