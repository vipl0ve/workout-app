import React, { useEffect, useState } from 'react'
import { challenges } from '../../data/challenges.json'
import PageHeader from '../layout/PageHeader'

const Challenges = () => {
	const [challengesData] = useState(challenges)
	const [curChallenge, setCurChallenge] = useState(challengesData[0])
	const [curWeek, setCurWeek] = useState(challengesData[0].weeks[0])
	const [curDay, setCurDay] = useState(challengesData[0].weeks[0].days[0])
	const [curCriteriaArr, setCurCriteriaArr] = useState(
		challengesData[0].weeks[0].days[0].criteria
	)
	const [curCriteriaIndex, setCurCriteriaIndex] = useState(0)

	useEffect(() => {
		setCurWeek(curChallenge.weeks[0])
		setCurDay(curChallenge.weeks[0].days[0])
		setCurCriteriaArr(curChallenge.weeks[0].days[0].criteria)
		setCurCriteriaIndex(0)
	}, [curChallenge])

	useEffect(() => {
		setCurDay(curWeek.days[0])
		setCurCriteriaArr(curWeek.days[0].criteria)
		setCurCriteriaIndex(0)
	}, [curWeek])

	useEffect(() => {
		setCurCriteriaArr(curDay.criteria)
		setCurCriteriaIndex(0)
	}, [curDay])

	useEffect(() => {}, [curCriteriaIndex])

	const onChallengeChange = (e) => {
		const newChallenge = challengesData.filter(
			(item) => item.id === e.target.value
		)
		setCurChallenge(newChallenge[0])
	}

	const onWeekChange = (e) => {
		const newWeek = curChallenge.weeks.filter(
			(item) => item.id === e.target.value
		)
		setCurWeek(newWeek[0])
	}

	const onDayChange = (e) => {
		const newDay = curWeek.days.filter((item) => item.id === e.target.value)
		setCurDay(newDay[0])
	}

	const onCriteriaChange = (e) => {
		setCurCriteriaIndex(e.target.value)
	}

	return (
		<>
			<div className='maincontainer container d-flex flex-column justify-content-start'>
				<form className='bg-custom-color2 border border-custom-color3 border-5 rounded p-3'>
					<PageHeader text='Challenges' />
					<div className='form-row'>
						<div className='form-group mb-2'>
							<div className='input-group col-12'>
								<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
									Challenge
								</span>
								<select
									id='selectChallenge'
									className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
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
							</div>
						</div>
						<div className='form-group mb-2'>
							<div className='input-group col-12'>
								<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
									Week
								</span>
								<select
									id='selectChallengeWeek'
									className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
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
							</div>
						</div>
						<div className='form-group mb-2'>
							<div className='input-group col-12'>
								<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
									Day
								</span>
								<select
									id='selectChallengeDay'
									className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
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
							</div>
						</div>
						<div className='form-group mb-2'>
							<div className='input-group col-12'>
								<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
									Criteria
								</span>
								<select
									id='selectChallengeDayCriteria'
									className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
									required
									value={curCriteriaIndex}
									onChange={onCriteriaChange}
								>
									{curCriteriaArr.map((item, index) => (
										<option key={index} value={index}>
											{'<' + item}
										</option>
									))}
								</select>
							</div>
						</div>
						<hr />
						<div className='form-group mb-2'>
							<h5 className='text-center text-custom-color6'>
								Challenge Selected
							</h5>
							<div className='input-group col-12'>
								<span className='input-group-text text-center col-3 bg-custom-color2 border-custom-color3 text-custom-color6'>
									<b>{curWeek.title}</b>
								</span>
								<span className='input-group-text text-center col-3 bg-custom-color2 border-right-0 border-custom-color3 text-custom-color6'>
									<b>{curDay.title}</b>
								</span>
								<span className='input-group-text text-center col-6 bg-custom-color2 border-right-0 border-custom-color3 text-custom-color6'>
									<b>Current Best {curCriteriaArr[curCriteriaIndex]}</b>
								</span>
							</div>
						</div>
						<div>
							<ul className='list-group'>
								{curDay.sets[curCriteriaIndex].map((item, index) => (
									<li
										className='list-group-item d-flex justify-content-between align-items-center bg-custom-color3 text-custom-color6'
										key={index}
									>
										<h6>Set {index + 1}</h6>
										<h6 className='badge bg-primary rounded-pill bg-custom-color6 text-custom-color1'>
											{item}
										</h6>
									</li>
								))}
							</ul>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default Challenges
