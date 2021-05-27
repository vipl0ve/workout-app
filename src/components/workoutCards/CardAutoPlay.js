import React from 'react'
import Watch from '../utils/Watch'
import CardBtnAutoPlay from './CardBtnAutoPlay'

const CardAutoPlay = ({
	exercise,
	type,
	play,
	autoPlay,
	nextExercise,
	setAutoPlay,
	progression,
	checkActivity,
}) => {
	if (type === 'Duration') {
		return (
			<>
				<div className='col col-5 text-start'>
					<CardBtnAutoPlay
						autoPlay={autoPlay}
						status={true}
						onAction={setAutoPlay}
						progression={progression}
					/>
				</div>
				<div className='col col-3 text-end'>
					<Watch
						data={
							autoPlay
								? progression
									? exercise.curProgressions.qty
									: exercise.qty
								: '1000'
						}
						play={play}
						autoPlay={autoPlay}
						className='text-custom-color6 p-2'
						onComplete={progression ? checkActivity : nextExercise}
						currentId={progression ? exercise.curProgressions.id : exercise.id}
						settings={'ms'}
					/>
					{progression && (
						<>
							<br />
							<br />
						</>
					)}
				</div>
			</>
		)
	} else if (type === 'Reps') {
		if (exercise.autoPlay !== '') {
			return (
				<>
					<div className='col col-5 text-start'>
						<CardBtnAutoPlay
							autoPlay={autoPlay}
							status={true}
							progression={progression}
							onAction={setAutoPlay}
						/>
					</div>
					<div className='col col-3 text-end'>
						<Watch
							data={
								autoPlay
									? progression
										? exercise.curProgressions.autoPlay
										: exercise.autoPlay
									: '1000'
							}
							play={play}
							autoPlay={autoPlay}
							className='text-custom-color6 p-2'
							onComplete={progression ? checkActivity : nextExercise}
							currentId={
								progression ? exercise.curProgressions.id : exercise.id
							}
							settings={'ms'}
						/>
						{progression && (
							<>
								<br />
								<br />
							</>
						)}
					</div>
				</>
			)
		} else {
			return (
				<>
					<div className='col col-5 text-start'>
						<CardBtnAutoPlay
							autoPlay={autoPlay}
							status={false}
							progression={progression}
							onAction={setAutoPlay}
						/>
					</div>
					<div className='col col-3 text-end'></div>
				</>
			)
		}
	} else {
		return null
	}
}

export default CardAutoPlay
