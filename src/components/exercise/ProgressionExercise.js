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

	useEffect(() => {
		changeCurProgression(exercise)
	}, [changeCurProgression, exercise])

	// Update exercise state when `prog` state changes
	useEffect(() => {
		setExercise((prevState) => ({
			...prevState,
			curProgressions: prog,
		}))
	}, [prog])

	// Update prog state when `repsQty` or `durationQty` state changes
	useEffect(() => {
		if (prog.type === 'Reps') {
			setProg((prevState) => ({ ...prevState, qty: repsQty }))
		} else if (prog.type === 'Duration') {
			setProg((prevState) => ({ ...prevState, qty: durationQty }))
		}
	}, [prog.type, durationQty, repsQty])

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
		console.log('reps')
		const newReps = reps.filter((item) => item.id === id)
		setRepsQty(newReps[0].qty)
	}

	const onDurationChange = (id) => {
		const newDuration = duration.filter((item) => item.id === id)
		setDurationQty(newDuration[0].qty)
	}

	if (exercise.type === 'Reps') {
		return (
			<li className='list-group-item bg-custom-color3'>
				<div className='d-flex flex-row align-items-center justify-content-between'>
					<div className=''>
						<span className='mb-1 text-light'>
							{exercise.name}: <ins>{prog.name}</ins>
						</span>
						<button
							className='btn dropdown-toggle px-1 text-custom-color5'
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
										className='dropdown-item text-custom-color4'
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
						<span className='mb-1 text-light'>
							Reps: <ins>{prog.qty}</ins>
						</span>
						<button
							className='btn dropdown-toggle px-1 text-custom-color5'
							type='button'
							id='dropdownMenuButtonQty'
							data-bs-toggle='dropdown'
							aria-expanded='false'
						></button>
						<ul
							className='dropdown-menu'
							aria-labelledby='dropdownMenuButtonQty'
						>
							{reps.map((item) => (
								<li key={item.id}>
									<button
										className='dropdown-item text-custom-color4'
										key={item.id}
										onClick={() => onRepsChange(item.id)}
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
	} else if (exercise.type === 'Duration') {
		return (
			<li className='list-group-item bg-custom-color3'>
				<div className='d-flex flex-row align-items-center justify-content-between'>
					<div className=''>
						<span className='mb-1 text-light'>
							{exercise.name}: <ins>{prog.name}</ins>
						</span>
						<button
							className='btn dropdown-toggle px-1 text-custom-color5'
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
										className='dropdown-item text-custom-color4'
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
						<span className='mb-1 text-light'>
							Duration: <ins>{prog.qty}s</ins>
						</span>
						<button
							className='btn dropdown-toggle px-1 text-custom-color5'
							type='button'
							id='dropdownMenuButtonQty'
							data-bs-toggle='dropdown'
							aria-expanded='false'
						></button>
						<ul
							className='dropdown-menu'
							aria-labelledby='dropdownMenuButtonQty'
						>
							{duration.map((item) => (
								<li key={item.id}>
									<button
										className='dropdown-item text-custom-color4'
										key={item.id}
										onClick={() => onDurationChange(item.id)}
									>
										{item.qty}s
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</li>
		)
	} else {
		return null
	}
}

export default ProgressionExercise
