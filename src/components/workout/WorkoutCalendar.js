import React, { useState, useEffect } from 'react'
import moment from 'moment'
import CalendarAggCard from '../workoutCalendar/CalendarAggCard'
import CalendarCard from '../workoutCalendar/CalendarCard'

const workoutaggregation = (events) => {
	const workoutAgg = {
		totalWorkoutCount: events.length,
		totalWorkoutDuration: events
			.map((i) => {
				if (i.duration === undefined) return 0
				else return parseInt(i.duration)
			})
			.reduce((total, num) => total + num),
		totalWorkoutWeek: events.filter((item) => {
			var date = new Date(item.start)
			return date >= moment().startOf('week') && date <= moment().endOf('week')
		}).length,
	}
	return workoutAgg
}

const WorkoutCalendar = () => {
	const [events, setEvents] = useState(
		JSON.parse(localStorage.getItem('bodyworkout')) || [
			{
				id: 0,
				title: 'Test Event title',
				duration: '130',
				start: '2015-03-31T04:00:00.000Z',
				end: '2015-04-01T04:00:00.000Z',
			},
			{
				id: 1,
				title: 'Test2 Event Title',
				duration: '130',
				start: '2015-04-09T04:00:00.000Z',
				end: '2015-04-10T04:00:00.000Z',
			},
		]
	)

	const [workoutAgg] = useState(workoutaggregation(events))
	useEffect(() => {}, [events])

	const deleteEvent = (id) => {
		const newEvents = events.filter((item) => item.id !== id)
		setEvents(newEvents)
		localStorage.setItem('bodyworkout', JSON.stringify(newEvents))
	}

	return (
		<div className='container bg-custom-color1'>
			<h1 className='text-center text-custom-color6'>Workout Calendar</h1>
			<CalendarAggCard data={workoutAgg} />
			<hr />
			<CalendarCard data={events.slice(0).reverse()} onAction={deleteEvent} />
		</div>
	)
}

export default WorkoutCalendar
