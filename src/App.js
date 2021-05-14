import './App.css'
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

//Routine components
import Routines from './components/routine/Routines'

function App() {
	return (
		<Router>
			<Navbar />
			<div className='container'>
				<Route path='/' exact component={Home} />
				<Route path='/workout' exact component={Workout} />
				<Route path='/workoutprogress' exact component={WorkoutProgress} />
				<Route path='/workoutcompleted' exact component={WorkoutCompleted} />
				<Route path='/routines' component={Routines} />
				<Route path='/settings' component={Settings} />
			</div>
			<Footer />
		</Router>
	)
}

export default App
