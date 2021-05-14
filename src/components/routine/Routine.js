import React from 'react'

const Routine = ({ data }) => {
	console.log(data)

	return (
		<div>
			<h2>{data.name}</h2>
			{/* <ul>
				{currRoutine.steps.warmup.map((item) => (
					<BasicExercise key={item.id} data={item} />
				))}
			</ul>
			<ul>
				{currRoutine.steps.exercises.map((item) => (
					<ProgressionExercise key={item.id} data={item} />
				))}
			</ul>
			<ul>
				{currRoutine.steps.stretch.map((item) => (
					<BasicExercise key={item.id} data={item} />
				))}
			</ul> */}
		</div>
	)
}

export default Routine
