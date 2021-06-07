import React from 'react'

const WorkoutIncomplete = ({
	workoutProgress,
	loadCurWorkout,
	loadDefaultWorkout,
}) => {
	return (
		<div className='maincontainer container container d-flex flex-column justify-content-center'>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header bg-transparent border-custom-color4'>
					<h5 className='text-custom-color6'>Workout Incomplete</h5>
				</div>
				<div className='card-body'>
					<div className='card-title'>
						<h5>{workoutProgress.workoutName}</h5>
					</div>
					<p className='card-text text-center'>
						Your workout is still in-progress. Want to continue or start a new
						workout?
					</p>
					<div className='d-flex justify-content-around align-items-center'>
						<button
							type='button'
							className='btn btn-custom-color6 text-custom-color1'
							onClick={loadCurWorkout}
						>
							Continue
						</button>
						<button
							type='button'
							className='btn btn-custom-color6 text-custom-color1'
							onClick={loadDefaultWorkout}
						>
							New
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WorkoutIncomplete
