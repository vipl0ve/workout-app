import React from 'react'
import Watch from '../utils/Watch'

const CardWatch = ({
	exercise,
	play,
	nextExercise,
	setCardPlayStatus,
	progression,
}) => {
	if (progression) {
		if (exercise.curProgressions.type === 'Duration') {
			return (
				<>
					<span>
						AutoPlay:{' '}
						<Watch
							data={exercise.curProgressions.qty}
							play={play}
							className='text-custom-color6 font-weight-bold'
							onComplete={nextExercise}
							onPause={setCardPlayStatus}
							currentId={exercise.id}
							settings={'ms'}
						/>
					</span>
				</>
			)
		} else if (exercise.curProgressions.type === 'Reps') {
			// add autoplay to curProgression and all progressions
			if (exercise.autoPlay !== '') {
				return (
					<>
						<span>
							AutoPlay:{' '}
							<Watch
								data={exercise.autoPlay}
								play={play}
								className='text-custom-color6 font-weight-bold'
								onComplete={nextExercise}
								onPause={setCardPlayStatus}
								currentId={exercise.id}
								settings={'ms'}
							/>
						</span>
					</>
				)
			} else {
				return (
					<>
						<span>No AutoPlay</span>
					</>
				)
			}
		} else {
			return null
		}
	} else {
		if (exercise.type === 'Duration') {
			return (
				<>
					<span>
						AutoPlay:{' '}
						<Watch
							data={exercise.qty}
							play={play}
							className='text-custom-color6 font-weight-bold'
							onComplete={nextExercise}
							onPause={setCardPlayStatus}
							currentId={exercise.id}
							settings={'ms'}
						/>
					</span>
				</>
			)
		} else if (exercise.type === 'Reps') {
			if (exercise.autoPlay !== '') {
				return (
					<>
						<span>
							AutoPlay:{' '}
							<Watch
								data={exercise.autoPlay}
								play={play}
								className='text-custom-color6 font-weight-bold'
								onComplete={nextExercise}
								onPause={setCardPlayStatus}
								currentId={exercise.id}
								settings={'ms'}
							/>
						</span>
					</>
				)
			} else {
				return (
					<>
						<span>No AutoPlay</span>
					</>
				)
			}
		} else {
			return null
		}
	}
}

export default CardWatch
