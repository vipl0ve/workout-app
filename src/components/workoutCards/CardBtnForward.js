import { faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CardBtnForward = ({ onAction, disabled }) => {
	if (disabled) {
		return (
			<>
				<button
					type='button'
					className='btn btn-custom-color6 text-custom-color1'
					onClick={onAction}
					disabled
				>
					<FontAwesomeIcon icon={faForward} />
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
					<FontAwesomeIcon icon={faForward} />
				</button>
			</>
		)
	}
}

export default CardBtnForward
