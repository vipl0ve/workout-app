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
					/>
				</div>
				<div className='col col-3 text-end'>
					{autoPlay && (
						<Watch
							data={progression ? exercise.curProgressions.qty : exercise.qty}
							play={play}
							className='text-custom-color6 p-2'
							onComplete={progression ? checkActivity : nextExercise}
							currentId={
								progression ? exercise.curProgressions.id : exercise.id
							}
							settings={'ms'}
						/>
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
							onAction={setAutoPlay}
						/>
					</div>
					<div className='col col-3 text-end'>
						{autoPlay && (
							<Watch
								data={
									progression
										? exercise.curProgressions.autoPlay
										: exercise.autoPlay
								}
								play={play}
								className='text-custom-color6 p-2'
								onComplete={progression ? checkActivity : nextExercise}
								currentId={
									progression ? exercise.curProgressions.id : exercise.id
								}
								settings={'ms'}
							/>
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
