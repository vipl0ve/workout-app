import React from 'react'
import ColoredLink from '../utils/ColoredLink'
import ExternalLink from '../utils/ExternalLink'
import PageHeader from './PageHeader'

const Home = () => {
	return (
		<>
			<div className='maincontainer container py-3 text-custom-color6'>
				<PageHeader text='WELCOME to BODYWORKOUT APP' />
				<hr />
				<p className='text-justify'>
					This powerful app assists you with achieving both mental and physical
					fitness goals. You can perform Workouts from available routines and
					challenges, view your past Workout History, perform Basic Meditation,
					and finally, can use the in-house BW Calculator to review essential
					body stats.
					<br />
					<br />
					Many popular body weight routines available here, including:
					<br />
					<ExternalLink
						url={
							'http://www.startbodyweight.com/p/start-bodyweight-basic-routine.html'
						}
						title='Start Body Weight - Basic Routine'
					/>
					<br />
					<ExternalLink
						url={
							'https://www.reddit.com/r/bodyweightfitness/wiki/kb/recommended_routine'
						}
						title='Reddit BWF - Recommended Routine'
					/>
					<br />
					<br />
					Ready to start your first{' '}
					<b>
						<ColoredLink route='/workout' title='Workout' />
					</b>{' '}
					now?
					<br />
					<br />
					View your past workouts under the{' '}
					<b>
						<ColoredLink route='/workouthistory' title='Workout History' />
					</b>{' '}
					page.
					<br />
					<br />
					Check your essential body stats under the{' '}
					<b>
						<ColoredLink route='/calculator' title='BW Calculator' />
					</b>{' '}
					page.
					<br />
					<br />
					Feeling stressed or need to perform a quick Meditation, then try the{' '}
					<b>
						<ColoredLink route='/breathe' title='Breathe' />
					</b>{' '}
					page.
					<br />
					<br />
					In future releases, we will be adding more Body Weight and Meditation
					Routines based on your suggestions, and an option for creating your
					custom routines. Keep an eye on our{' '}
					<b>
						<ColoredLink route='/announcement' title='Announcement' />
					</b>{' '}
					page.
					<br />
					<br />
					<b>Team@BodyWorkoutApp</b>
				</p>
			</div>
		</>
	)
}

export default Home
