import React from 'react'
import Watch from '../utils/Watch'
import CardBtnAutoPlay from './CardBtnAutoPlay'

const CardAutoPlay = ({
	exercise,
	play,
	autoPlay,
	nextExercise,
	setAutoPlay,
	progression,
}) => {
	if (progression) {
		if (exercise.curProgressions.type === 'Duration') {
			return (
				<>
					<div className='col col-4'>
						<CardBtnAutoPlay
							autoPlay={autoPlay}
							status={true}
							onAction={setAutoPlay}
						/>
					</div>
					<div className='col col-4'>
						{autoPlay && (
							<Watch
								data={exercise.curProgressions.qty}
								play={play}
								className='bg-custom-color6 text-custom-color1 p-2 border border-custom-color2 rounded'
								onComplete={nextExercise}
								currentId={exercise.id}
								settings={'ms'}
							/>
						)}
					</div>
				</>
			)
		} else if (exercise.curProgressions.type === 'Reps') {
			if (exercise.autoPlay !== '') {
				return (
					<>
						<div className='col col-4'>
							<CardBtnAutoPlay
								autoPlay={autoPlay}
								status={true}
								onAction={setAutoPlay}
							/>
						</div>
						<div className='col col-4'>
							{autoPlay && (
								<Watch
									data={exercise.autoPlay}
									play={play}
									className='bg-custom-color6 text-custom-color1 p-2 border border-custom-color2 rounded'
									onComplete={nextExercise}
									currentId={exercise.id}
									settings={'ms'}
								/>
							)}
						</div>
					</>
				)
			} else {
				return (
					<>
						<div className='col col-4'>
							<CardBtnAutoPlay
								autoPlay={autoPlay}
								status={false}
								onAction={setAutoPlay}
							/>
						</div>
						<div className='col col-4'></div>
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
					<div className='col col-4'>
						<CardBtnAutoPlay
							autoPlay={autoPlay}
							status={true}
							onAction={setAutoPlay}
						/>
					</div>
					<div className='col col-4'>
						{autoPlay && (
							<Watch
								data={exercise.qty}
								play={play}
								className='text-custom-color6 font-weight-bold'
								onComplete={nextExercise}
								currentId={exercise.id}
								settings={'ms'}
							/>
						)}
					</div>
				</>
			)
		} else if (exercise.type === 'Reps') {
			if (exercise.autoPlay !== '') {
				return (
					<>
						<div className='col col-4'>
							<CardBtnAutoPlay
								autoPlay={autoPlay}
								status={true}
								onAction={setAutoPlay}
							/>
						</div>
						<div className='col col-4'>
							{autoPlay && (
								<Watch
									data={exercise.autoPlay}
									play={play}
									className='text-custom-color6 font-weight-bold'
									onComplete={nextExercise}
									currentId={exercise.id}
									settings={'ms'}
								/>
							)}
						</div>
					</>
				)
			} else {
				return (
					<>
						<div className='col col-4'>
							<CardBtnAutoPlay
								autoPlay={autoPlay}
								status={false}
								onAction={setAutoPlay}
							/>
						</div>
						<div className='col col-4'></div>
					</>
				)
			}
		} else {
			return null
		}
	}
}

export default CardAutoPlay
