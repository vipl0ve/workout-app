import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Stopwatch from '../utils/Stopwatch'

const CardShowTimer = ({
	activity,
	exercise,
	curSet,
	reps,
	speakStatus,
	settings,
	timerCompleted,
}) => {
	return (
		<>
			<div className='maincontainer container d-flex flex-column justify-content-center'>
				<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
					<div className='card-body'>
						{activity === 'RestSet' ? (
							<>
								<h5 className='card-title'>
									<p>Rest {settings.betweenSet}s!</p>
									<p>Next Exercise: {exercise.curProgressions.name}</p>
									<p>
										Set: {curSet} Rep:{' '}
										{exercise.curProgressions.type === 'Reps'
											? reps[curSet - 1] + 'x'
											: reps[curSet - 1] + 's'}
									</p>
								</h5>
							</>
						) : (
							<>
								<h5 className='card-title'>
									<p>Rest {settings.betweenExercise}s!</p>
									<p>Next Exercise: {exercise.curProgressions.name}</p>
									<p>
										Set: {curSet} Rep:{' '}
										{exercise.curProgressions.type === 'Reps'
											? reps[curSet - 1] + 'x'
											: reps[curSet - 1] + 's'}
									</p>
								</h5>
							</>
						)}
						<Stopwatch
							data={
								activity === 'RestSet'
									? settings.betweenSet
									: settings.betweenExercise
							}
							speakStatus={speakStatus}
							timerCompletedStatus={timerCompleted}
						/>
						<button
							type='button'
							className='btn btn-custom-color6 text-custom-color1 mb-5'
							onClick={timerCompleted}
						>
							Skip Rest <FontAwesomeIcon icon={faStepForward} />
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default CardShowTimer
