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
					disabled
				>
					<FontAwesomeIcon icon={faForward} onClick={onAction} />
				</button>
			</>
		)
	} else {
		return (
			<>
				<button
					type='button'
					className='btn btn-custom-color6 text-custom-color1'
				>
					<FontAwesomeIcon icon={faForward} onClick={onAction} />
				</button>
			</>
		)
	}
}

export default CardBtnForward
