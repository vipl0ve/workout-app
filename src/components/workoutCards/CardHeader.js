import React from 'react'

const CardHeader = ({
	counter,
	exerciseData,
	progression,
	curSet,
	totalSets,
}) => {
	return (
		<>
			<div className='col col-4 text-start'>
				<span className='text-custom-color6'>
					<b>Exercise {counter + '/' + exerciseData.length}</b>
				</span>
				{progression && (
					<>
						<br />
						<span className='text-custom-color6'>
							<b>Set: {curSet + '/' + totalSets}</b>
						</span>
					</>
				)}
			</div>
		</>
	)
}

export default CardHeader
