import React, { useState, useEffect } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'
import moment from 'moment'
import DatePicker from 'react-date-picker'
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
	const [events, setEvents] = useLocalStorage('bwWorkoutHistory', '')
	const [curDate, setCurDate] = useState(new Date())
	const [eventsData, setEventsData] = useState(events)
	const [workoutAgg, setWorkoutAgg] = useState({
		totalWorkoutCount: 0,
		totalWorkoutDuration: 0,
	})

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
		}
	}

	const onChangeDate = (date) => {
		setCurDate(date)
		const newEvents = events.filter((item) => {
			var startDate = new Date(item.start)
			return (
				startDate >= moment(date).startOf('day') &&
				startDate <= moment(date).endOf('day')
			)
		})
		setEventsData(newEvents)
	}

	const onResetDate = () => {
		setCurDate(new Date())
		setEventsData(events)
	}

	return (
		<div className='containerExercise d-flex flex-column justify-content-center'>
			<h4 className='text-center text-custom-color6'>Workout History</h4>
			<WorkoutHistoryAggCard data={workoutAgg} />
			<div className='d-flex justify-content-around align-items-center'>
				<DatePicker
					calendarClassName='text-custom-color6'
					clearIcon={null}
					maxDate={new Date()}
					onChange={onChangeDate}
					value={curDate}
				/>
				<button
					className='btn bg-custom-color6 text-custom-color2'
					onClick={onResetDate}
				>
					Reset
				</button>
			</div>
			<div
				className='containerExercise d-flex justify-content-between align-items-center'
				style={{ minHeight: '90vh', width: 'auto' }}
			>
				{eventsData.length !== 0 ? (
					<WorkoutHistoryCard
						data={eventsData.slice(0).reverse()}
						onAction={deleteEvent}
					/>
				) : (
					<p>No Workout Available</p>
				)}
			</div>
		</div>
	)
}

export default WorkoutHistory
