import React from 'react'
import ExternalLink from '../utils/ExternalLink'
import LinkBtn from '../utils/LinkBtn'

const Home = () => {
	return (
		<>
			<div className='container'>
				<p>
					Welcome to <b>BodyWorkout App</b>
				</p>
				<p>
					Easily perform many of the popular body weight routines available
					online here, including{' '}
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
				<p>
					Ready to try the app? Start your first{' '}
					<LinkBtn route='/workout' title='Workout' /> now. You can also view
					your past workouts under{' '}
					<LinkBtn route='/workouthistory' title='Workout History' /> page.
				</p>
				<p>
					Need to calculate your body stats then check out the{' '}
					<LinkBtn route='/calculator' title='Body Weight Report' /> page.
				</p>
				<p>
					Also, if you are feeling stressed or just needed to do a quick
					Mindfulness and Meditation exercise, then check the{' '}
					<LinkBtn route='/breathe' title='Breathe' /> page.
				</p>
				<p>
					In upcoming releases, we are looking to provide various other Body
					Weight Workout and Meditation routines based on your suggestions. We
					will also hoping to provide an option for creating your own custom
					routines. Keep an eye for our future updates on our{' '}
					<LinkBtn route='/breathe' title='Annoucment' /> page.
				</p>
				<p>Team@BodyWorkoutApp</p>
			</div>
		</>
	)
}

export default Home
