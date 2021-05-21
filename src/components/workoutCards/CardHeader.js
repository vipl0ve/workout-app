import React from 'react'

const CardHeader = ({ counter, exerciseData, exercise }) => {
	return (
		<>
			<h6 className=''>{counter + '/' + exerciseData.length}</h6>
			<h6 className=''>{exercise.name}</h6>
		</>
	)
}

export default CardHeader
