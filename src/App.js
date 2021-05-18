import './App.css'
import './App.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Layout components
import Home from './components/layout/Home'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Settings from './components/layout/Settings'

// Workout components
import Workout from './components/workout/Workout'
import WorkoutProgress from './components/workout/WorkoutProgress'
import WorkoutCompleted from './components/workout/WorkoutCompleted'
import WorkoutCalendar from './components/workout/WorkoutCalendar'

//Routine components
import Routines from './components/routine/Routines'

// Meditation components
import Breathe from './components/meditation/Breathe'

function App() {
	return (
		<Router>
			<Navbar />
			<div className='container main bg-custom-color1'>
				<Route path='/' exact component={Home} />
				<Route path='/workout' exact component={Workout} />
				<Route path='/workoutprogress' exact component={WorkoutProgress} />
				<Route path='/workoutcompleted' exact component={WorkoutCompleted} />
				<Route path='/calendar' exact component={WorkoutCalendar} />
				<Route path='/routines' component={Routines} />
				<Route path='/breathe' exact component={Breathe} />
				<Route path='/settings' component={Settings} />
			</div>
			<Footer />
		</Router>
	)
}

export default App
