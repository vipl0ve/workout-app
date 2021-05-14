import React, { useState, useEffect } from 'react'
import { reps, duration } from '../../data/reps.json'

const ProgressionExercise = ({ data, changeCurProgression }) => {
	const [exercise, setExercise] = useState(data)
	const [prog, setProg] = useState(data.curProgressions)
	const [repsQty, setRepsQty] = useState(
		prog.type === 'Reps' ? prog.qty : reps[0].qty
	)
	const [durationQty, setDurationQty] = useState(
		prog.type === 'Duration' ? prog.qty : duration[0].qty
	)

	// Send data to parents when `exercise` state changes
	useEffect(() => {
		if (exercise.curProgressions !== data.curProgressions) {
			changeCurProgression(exercise)
		}
	}, [data.curProgressions, changeCurProgression, exercise])

	// Update exercise state when `prog` state changes
	useEffect(() => {
		setExercise((prevState) => ({
			...prevState,
			curProgressions: prog,
		}))
	}, [prog])

	// Update prog state when `repsQty` state changes
	useEffect(() => {
		if (prog.type === 'Reps') {
			setProg((prevState) => ({ ...prevState, qty: repsQty }))
		}
	}, [prog.type, repsQty])

	// Update prog state when `durationQty` state changes
	useEffect(() => {
		if (prog.type === 'Duration') {
			setProg((prevState) => ({ ...prevState, qty: durationQty }))
		}
	}, [prog.type, durationQty])

	const onChange = (id) => {
		let newProg = exercise.progressions.filter((item) => item.id === id)
		if (prog.type === 'Reps') {
			newProg[0].qty = repsQty
		} else if (prog.type === 'Duration') {
			newProg[0].qty = durationQty
		}
		setProg(newProg[0])
	}

	const onRepsChange = (id) => {
		const newReps = reps.filter((item) => item.id === id)
		setRepsQty(newReps[0].qty)
	}

	const onDurationChange = (id) => {
		const newDuration = duration.filter((item) => item.id === id)
		setDurationQty(newDuration[0].qty)
	}

	return (
		<li className='list-group-item'>
			<div className='d-flex flex-row align-items-center justify-content-between'>
				<div className=''>
					<span>
						{exercise.name}: <ins>{prog.name}</ins>
					</span>
					<button
						className='btn dropdown-toggle px-1'
						type='button'
						id='dropdownMenuButtonExercise'
						data-bs-toggle='dropdown'
						aria-expanded='false'
					></button>
					<ul
						className='dropdown-menu'
						aria-labelledby='dropdownMenuButtonExercise'
					>
						{exercise.progressions.map((item) => (
							<li key={item.id}>
								<button
									className='dropdown-item'
									key={item.id}
									onClick={() => onChange(item.id)}
								>
									{item.name}
								</button>
							</li>
						))}
					</ul>
				</div>
				<div className=''>
					{exercise.type === 'Reps' ? (
						<span>Reps: {prog.qty}</span>
					) : (
						<span>Duration: {prog.qty}</span>
					)}
					<button
						className='btn dropdown-toggle px-1'
						type='button'
						id='dropdownMenuButtonQty'
						data-bs-toggle='dropdown'
						aria-expanded='false'
					></button>
					<ul className='dropdown-menu' aria-labelledby='dropdownMenuButtonQty'>
						{exercise.type === 'Reps'
							? reps.map((item) => (
									<li key={item.id}>
										<button
											className='dropdown-item'
											key={item.id}
											onClick={() => onRepsChange(item.id)}
										>
											{item.qty}
										</button>
									</li>
							  ))
							: duration.map((item) => (
									<li key={item.id}>
										<button
											className='dropdown-item'
											key={item.id}
											onClick={() => onDurationChange(item.id)}
										>
											{item.qty}
										</button>
									</li>
							  ))}
					</ul>
				</div>
			</div>
		</li>
	)
}

export default ProgressionExercise
