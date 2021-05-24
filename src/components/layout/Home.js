import React from 'react'
import ColoredLink from '../utils/ColoredLink'
import ExternalLink from '../utils/ExternalLink'

const Home = () => {
	return (
		<>
			<div className='container py-3 text-custom-color6'>
				<h5 className='text-center'>
					<b>WELCOME</b> to <b>BODY WORKOUT APP</b>
				</h5>
				<hr />
				<p className='text-justify'>
					Using this powerful app, you can perform Workouts, view Workout
					History, Meditate, and find essential Body Stats.
				</p>
				<p className='text-justify'>
					Select from a list popular body weight routines available here,
					including{' '}
					<ExternalLink
						url={
							'http://www.startbodyweight.com/p/start-bodyweight-basic-routine.html'
						}
						title='Start Body Weight - Basic Routine'
					/>{' '}
					and{' '}
					<ExternalLink
						url={
							'https://www.reddit.com/r/bodyweightfitness/wiki/kb/recommended_routine'
						}
						title='Reddit BWF - Recommended Routine'
					/>
					.
				</p>
				<p className='text-justify'>
					Ready to try the app? Start with your first{' '}
					<b>
						<ColoredLink route='/workout' title='Workout' />
					</b>{' '}
					now!
				</p>
				<p className='text-justify'>
					View your past workouts under{' '}
					<b>
						<ColoredLink route='/workouthistory' title='Workout History' />
					</b>{' '}
					page. and calculate your body stats then check out the{' '}
					<b>
						<ColoredLink route='/calculator' title='Body Weight Stats' />
					</b>{' '}
					page.
				</p>
				<p className='text-justify'>
					Try our{' '}
					<b>
						<ColoredLink route='/breathe' title='Breathe' />
					</b>{' '}
					page, if you are feeling stressed or need to do just a quick
					Meditation exercise.
				</p>
				<p className='text-justify'>
					In future releases, we will be adding more Body Weight Workouts and
					Meditation Routines based on your suggestions along with an option for
					creating your own custom routines. Keep an eye on our{' '}
					<b>
						<ColoredLink route='/announcement' title='Announcement' />
					</b>{' '}
					page.
				</p>
				<p className='text-end'>
					<b>Team@BodyWorkoutApp</b>
				</p>
			</div>
		</>
	)
}

export default Home
