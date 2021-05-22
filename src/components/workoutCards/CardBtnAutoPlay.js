import React from 'react'
import Switch from 'react-switch'

const CardBtnAutoPlay = ({ autoPlay, status, onAction }) => {
	return (
		<>
			<label>
				{status ? <span>AutoPlay</span> : <span>No AutoPlay</span>}
				<Switch
					onChange={onAction}
					checked={autoPlay}
					disabled={!status}
					className='react-switch'
				/>
			</label>
		</>
	)
}

export default CardBtnAutoPlay
