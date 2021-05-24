import React from 'react'
import Switch from 'react-switch'

const CardBtnAutoPlay = ({ autoPlay, status, onAction }) => {
	return (
		<>
			<div className='d-flex justify-content-center align-items-start'>
				<label>
					{status ? (
						<span>AutoPlay</span>
					) : (
						<span>
							<del>AutoPlay</del>
						</span>
					)}
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
}

export default CardBtnAutoPlay
