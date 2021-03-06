import React, { useState, useEffect } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'
import moment from 'moment'
import DatePicker from 'react-date-picker'
import WorkoutHistoryAggCard from './WorkoutHistoryAggCard'
import WorkoutHistoryCard from './WorkoutHistoryCard'
import WorkoutActitivty from './WorkoutActitivty'

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

const weeklyActivity = (events) => {
	var weekEvents = []
	var activity = [
		{
			id: 1,
			day: 'Mon',
			shortName: 'M',
			status: false,
			date: '',
		},
		{
			id: 2,
			day: 'Tue',
			shortName: 'T',
			status: false,
			date: '',
		},
		{
			id: 3,
			day: 'Wed',
			shortName: 'W',
			status: false,
			date: '',
		},
		{
			id: 4,
			day: 'Thu',
			shortName: 'Th',
			status: false,
			date: '',
		},
		{
			id: 5,
			day: 'Fri',
			shortName: 'F',
			status: false,
			date: '',
		},
		{
			id: 6,
			day: 'Sat',
			shortName: 'Sa',
			status: false,
			date: '',
		},
		{
			id: 7,
			day: 'Sun',
			shortName: 'S',
			status: false,
			date: '',
		},
	]
	if (events.length !== 0) {
		weekEvents = events
			.filter((i) => i.week === moment().format('w'))
			.map((item) => item.day)
		for (var item of activity) {
			item.date = moment().day(item.id).format('D')
			item.status = weekEvents.includes(item.day)
		}
	}
	return activity
}

const WorkoutHistory = () => {
	const [events, setEvents] = useLocalStorage('bwWorkoutHistory', '')
	const [curDate, setCurDate] = useState(new Date())
	const [filter, setFilter] = useState(false)
	const [weekActivity, setWeekActivity] = useState(weeklyActivity(events))
	const [eventsData, setEventsData] = useState(events)
	const [workoutAgg, setWorkoutAgg] = useState({
		totalWorkoutCount: 0,
		totalWorkoutDuration: 0,
	})

	useEffect(() => {
		setEventsData(events)
		setWeekActivity(weeklyActivity(events))
	}, [events])

	useEffect(() => {
		if (filter) {
			const newEvents = events.filter((item) => {
				var startDate = new Date(item.start)
				return (
					startDate >= moment(curDate).startOf('day') &&
					startDate <= moment(curDate).endOf('day')
				)
			})
			setEventsData(newEvents)
		} else {
			setEventsData(events)
		}
	}, [curDate, filter, events])

	useEffect(() => {
		setWorkoutAgg(workoutaggregation(eventsData))
	}, [eventsData])

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
		setFilter(true)
		setCurDate(date)
	}

	const onResetDate = () => {
		setFilter(false)
		setCurDate(new Date())
	}

	return (
		<div className='maincontainer container py-3 '>
			<WorkoutActitivty data={weekActivity} />
			<WorkoutHistoryAggCard data={workoutAgg} />
			<div className='d-flex justify-content-around align-items-center mt-3'>
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
					View All
				</button>
			</div>
			<div className='wokrout-cards'>
				{eventsData.length !== 0 ? (
					<WorkoutHistoryCard
						data={eventsData.slice(0).reverse()}
						onAction={deleteEvent}
					/>
				) : (
					<p className='text-center mt-5 text-muted'>No Workout Available</p>
				)}
			</div>
		</div>
	)
}

export default WorkoutHistory
