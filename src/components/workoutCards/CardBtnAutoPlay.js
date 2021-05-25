import React from 'react'
import Switch from 'react-switch'

const CardBtnAutoPlay = ({ autoPlay, status, onAction }) => {
	if (status) {
		return (
			<>
				<div className='d-flex justify-content-center align-items-start'>
					<label>
						<span>AutoPlay</span>
					</label>
					<Switch
						onChange={onAction}
						checked={autoPlay}
						disabled={!status}
						offColor='#ddb892'
						onColor='#9c6644'
						className='react-switch'
					/>
				</div>
			</>
		)
	} else {
		return (
			<>
				<div className='d-flex justify-content-center align-items-start'>
					<label>
						<span className='text-muted'>No AutoPlay</span>
					</label>
				</div>
			</>
		)
	}
}

export default CardBtnAutoPlay
