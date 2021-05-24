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
				<div className='row'>
					<span>
						Exercise <b>{counter + '/' + exerciseData.length}</b>
					</span>
				</div>
				{progression && (
					<div className='row'>
						<span>
							Rep: <b>{curSet + '/' + totalSets}</b>
						</span>
					</div>
				)}
			</div>
		</>
	)
}

export default CardHeader
