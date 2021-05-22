import React from 'react'

const CardHeader = ({
	counter,
	exerciseData,
	progression,
	curSet,
	totalSets,
}) => {
	if (progression) {
		return (
			<>
				<div className='col col-4 text-start'>
					<div className='row'>
						<h6 className=''>
							Exercise <b>{counter + '/' + exerciseData.length}</b>
						</h6>
					</div>
					<div className='row'>
						<h6 className=''>
							Rep: <b>{curSet + '/' + totalSets}</b>
						</h6>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<>
				<div className='col col-4 text-start'>
					<div className='row'>
						<h6 className=''>
							Exercise <b>{counter + '/' + exerciseData.length}</b>
						</h6>
					</div>
				</div>
			</>
		)
	}
}

export default CardHeader
