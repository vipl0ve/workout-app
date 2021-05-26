import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CardBtnPlay = ({ play, onAction, disabled }) => {
	if (disabled) {
		return (
			<>
				<button
					type='button'
					className='btn btn-custom-color6 text-custom-color1'
					onClick={onAction}
					disabled
				>
					{play ? (
						<FontAwesomeIcon icon={faPause} />
					) : (
						<FontAwesomeIcon icon={faPlay} />
					)}
				</button>
			</>
		)
	} else {
		return (
			<>
				<button
					type='button'
					className='btn btn-custom-color6 text-custom-color1'
					onClick={onAction}
				>
					{play ? (
						<FontAwesomeIcon icon={faPause} />
					) : (
						<FontAwesomeIcon icon={faPlay} />
					)}
				</button>
			</>
		)
	}
}

export default CardBtnPlay
