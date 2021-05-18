import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<>
			<div className='container'>
				<h1 className='text-center text-custom-color5'>Body Workout App</h1>
				<hr />
				<p>Welcome to Body Workout app.</p>
				<p>
					We provide options to easliy perform many popular body weight routines
					available on web including{' '}
					<Link to='http://www.startbodyweight.com/p/start-bodyweight-basic-routine.html'>
						Start Body Weight - Basic Routine
					</Link>{' '}
					and{' '}
					<Link to='https://www.reddit.com/r/bodyweightfitness/wiki/kb/recommended_routine'>
						Reddit BWF - Recommended Routine
					</Link>
					.
				</p>
				<p>
					Start your first <Link to='/workout'>Workout</Link> now.
				</p>
				<p>
					You can also view your workout log under{' '}
					<Link to='/workoutcalendar'>Calendar</Link>.
				</p>
				<p>
					Finally, you can also practice Mindfulness and Meditation under{' '}
					<Link to='/breathe'>Breathe</Link>.
				</p>
				<p>
					In upcoming releases, we are looking to provide various other Body
					Weight Workout and Meditation routines based on your suggestions and
					also, provide options to create your own custom routines. So, keep an
					eye for future updates.
				</p>
			</div>
		</>
	)
}

export default Home
