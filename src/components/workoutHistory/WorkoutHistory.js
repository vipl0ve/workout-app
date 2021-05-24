import React, { useState, useEffect } from 'react'
// import moment from 'moment'
// import DatePicker from 'react-date-picker'
import WorkoutHistoryAggCard from './WorkoutHistoryAggCard'
import WorkoutHistoryCard from './WorkoutHistoryCard'

const workoutaggregation = (events) => {
	let workoutAgg = {}
	if (events.length !== 0) {
		workoutAgg = {
			totalWorkoutCount: events.length,
			totalWorkoutDuration: events
				.map((i) => {
					if (i.duration === undefined) return 0
					else return parseInt(i.duration)
				})
				.reduce((total, num) => total + num),
		}
	} else {
		workoutAgg = {
			totalWorkoutCount: 0,
			totalWorkoutDuration: 0,
		}
	}
	return workoutAgg
}

const WorkoutHistory = () => {
	const [events, setEvents] = useState(
		JSON.parse(localStorage.getItem('bodyworkout'))
	)

	const [workoutAgg, setWorkoutAgg] = useState({
		totalWorkoutCount: 0,
		totalWorkoutDuration: 0,
	})

	// const [curDate, setCurDate] = useState(new Date())

	useEffect(() => {
		setWorkoutAgg(workoutaggregation(events))
	}, [events])

	const deleteEvent = (id) => {
		const confirmed = window.confirm(
			'The delete will be permanent. Are you sure?'
		)
		if (confirmed) {
			const newEvents = events.filter((item) => item.id !== id)
			setEvents(newEvents)
			localStorage.setItem('bodyworkout', JSON.stringify(newEvents))
		}
	}

	// const onChangeDate = (date) => {
	// 	setCurDate(date)
	// 	console.log(date)
	// 	console.log(moment(date).startOf('day').format())
	// 	console.log(moment(date).endOf('day').format())

	// 	const newEvents = events.filter((item) => {
	// 		var startDate = new Date(item.start)
	// 		return (
	// 			startDate >= moment(date).startOf('day') &&
	// 			startDate <= moment(date).endOf('day')
	// 		)
	// 	})
	// 	setEvents(newEvents)
	// }

	return (
		<div
			className='containerExercise d-flex flex-column justify-content-center'
			style={{ minHeight: '90vh', width: 'auto' }}
		>
			<h4 className='text-center text-custom-color6'>Workout History</h4>
			<WorkoutHistoryAggCard data={workoutAgg} />
			{/* <DatePicker onChange={onChangeDate} value={curDate} /> */}
			{events.length !== 0 ? (
				<WorkoutHistoryCard
					data={events.slice(0).reverse()}
					onAction={deleteEvent}
				/>
			) : (
				<p>No Workout Available</p>
			)}
		</div>
	)
}

export default WorkoutHistory
