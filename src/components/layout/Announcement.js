import React from 'react'
import AnnouncementItem from './AnnouncementItem'

const Announcement = () => {
	return (
		<>
			<div className='maincontainer container py-3 text-custom-color6'>
				<h5 className='text-center'>
					<b>ANNOUNCEMENTS!</b>
				</h5>
				<p className='text-center'>Team@BodyWorkoutApp</p>
				<hr />
				<div className='list-group'>
					<AnnouncementItem
						title='Added Audio'
						date='5/26/2021'
						para='Audio has been added to workout module which will speak the important details to the user.'
						small='Workout Module'
					/>
					<AnnouncementItem
						title='Breathe Mobile Responsive'
						date='5/24/2021'
						para='Breathe Module has been updated for mobile screens. Right now, it will has fixed duration of 7.5 sec, but in future update, option to add custom time will be provided.'
						small='Breathe Module'
					/>
					<AnnouncementItem
						title='Autoplay Added'
						date='5/23/2021'
						para='Breathe Module has been updated for mobile screens. Right now, it will has fixed duration of 7.5 sec, but in future update, option to add custom time will be provided.'
						small='Workout Module'
					/>
					<AnnouncementItem
						title='Exercise Video Added'
						date='5/22/2021'
						para='Now you can watch the exercise video if available during workout. You timer will be paused while watching the video.'
						small='Workout Module'
					/>
					<AnnouncementItem
						title='BW Report Added'
						date='5/21/2021'
						para='You can calculate your body stats using this simple and intutive calculator.'
						small='BM Report Module'
					/>
					<AnnouncementItem
						title='Workout History Added'
						date='5/15/2021'
						para='You can view your past workout history. This history is saved in you local storage.'
						small='Workout History Module'
					/>
					<AnnouncementItem
						title='Beta Launched'
						date='5/1/2021'
						para='We have finally launched a beta version of Body Workout App. Hope you are excited.'
						small='BodyWorkout Module'
					/>
				</div>
			</div>
		</>
	)
}

export default Announcement
