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
					<small>
						<b>Exercise {counter + '/' + exerciseData.length}</b>
					</small>
				</span>
				{progression && (
					<>
						<br />
						<span className='text-custom-color6'>
							<small>
								<b>Set: {curSet + '/' + totalSets}</b>
							</small>
						</span>
					</>
				)}
			</div>
		</>
	)
}

export default CardHeader
