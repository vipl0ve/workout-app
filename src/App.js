import './sass/App.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Layout components
import Home from './components/layout/Home'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Settings from './components/layout/Settings'
import Announcement from './components/layout/Announcement'

// Workout components
import Workout from './components/workout/Workout'
import WorkoutProgress from './components/workout/WorkoutProgress'
import WorkoutCompleted from './components/workout/WorkoutCompleted'
import WorkoutHistory from './components/workoutHistory/WorkoutHistory'

//Routine components
import Routines from './components/routine/Routines'

//Routine components
import Challenges from './components/challenges/Challenges'

// Meditation components
import Breathe from './components/meditation/Breathe'

// Body Weight Calculator
import BWStats from './components/bwStats/BWStats'

function App() {
	return (
		<Router>
			<Navbar />
			<div className='container-fluid py-2 py-sm-3 py-md-5 px-2 px-sm-3 px-md-5 bg-custom-color1'>
				<Route path='/' exact component={Home} />
				<Route path='/workout' exact component={Workout} />
				<Route path='/workoutprogress' exact component={WorkoutProgress} />
				<Route path='/workoutcompleted' exact component={WorkoutCompleted} />
				<Route path='/workouthistory' exact component={WorkoutHistory} />
				<Route path='/routines' component={Routines} />
				<Route path='/challenges' component={Challenges} />
				<Route path='/breathe' exact component={Breathe} />
				<Route path='/calculator' exact component={BWStats} />
				<Route path='/announcement' exact component={Announcement} />
				<Route path='/settings' component={Settings} />
			</div>
			<Footer />
		</Router>
	)
}

export default App
