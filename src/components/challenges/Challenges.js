import React, { useState } from 'react'
import { challenges } from '../../data/challenges.json'

const Challenges = () => {
	const [challengesData] = useState(challenges)
	const [curChallenge, setCurChallenge] = useState(challengesData[0])
	const [curWeek, setCurWeek] = useState(challengesData[0].weeks[0])
	const [curDay, setCurDay] = useState(challengesData[0].weeks[0].days[0])
	const [curCriteria, setCurCriteria] = useState(0)

	const onChallengeChange = (e) => {
		const newChallenge = challengesData.filter(
			(item) => item.id === e.target.value
		)
		setCurChallenge(newChallenge[0])
	}

	const onWeekChange = (e) => {
		console.log(e.target.value)
		const newWeek = curChallenge.weeks.filter(
			(item) => item.id === e.target.value
		)
		setCurWeek(newWeek[0])
		setCurDay(newWeek[0].days[0])
		setCurCriteria(0)
	}

	const onDayChange = (e) => {
		console.log(e.target.value)
		const newDay = curWeek.days.filter((item) => item.id === e.target.value)
		setCurDay(newDay[0])
		setCurCriteria(0)
	}

	const onCriteriaChange = (e) => {
		console.log(e.target.value)
		setCurCriteria(e.target.value)
	}

	return (
		<>
			<div
				className='containerExercise d-flex flex-column justify-content-start'
				style={{ minHeight: '90vh', width: 'auto' }}
			>
				<h5 className='text-center'>Select Challenge</h5>
				<div className='d-flex justify-content-between mb-3 mx-1'>
					<select
						id='selectChallenge'
						className='form-select form-select-md bg-custom-color2 text-custom-color6 p-2'
						required
						value={curChallenge.id}
						onChange={onChallengeChange}
					>
						{challengesData.map((item) => (
							<option key={item.id} value={item.id}>
								{item.title}
							</option>
						))}
					</select>
					<label>Select Week</label>
					<select
						id='selectChallengeWeek'
						className='form-select form-select-md bg-custom-color2 text-custom-color6 p-2'
						required
						value={curWeek.id}
						onChange={onWeekChange}
					>
						{curChallenge.weeks.map((item) => (
							<option key={item.id} value={item.id}>
								{item.title}
							</option>
						))}
					</select>
					<label>Select Day</label>
					<select
						id='selectChallengeDay'
						className='form-select form-select-md bg-custom-color2 text-custom-color6 p-2'
						required
						value={curDay.id}
						onChange={onDayChange}
					>
						{curWeek.days.map((item) => (
							<option key={item.id} value={item.id}>
								{item.title}
							</option>
						))}
					</select>
					<label>Criteria</label>
					<select
						id='selectChallengeDayCriteria'
						className='form-select form-select-md bg-custom-color2 text-custom-color6 p-2'
						required
						value={curDay.criteria[curCriteria]}
						onChange={onCriteriaChange}
					>
						{curDay.criteria.map((item, index) => (
							<option key={index} value={index}>
								{item}
							</option>
						))}
					</select>
				</div>
				<hr />
				<div>
					<p>Week: {curWeek.title}</p>
					<p>Day: {curDay.title}</p>
					<ul className='list-group'>
						{curDay.sets[curCriteria].map((item, index) => (
							<li
								className='list-group-item d-flex justify-content-between align-items-center'
								key={index}
							>
								Set {index + 1}
								<span className='badge bg-primary rounded-pill'>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Challenges
