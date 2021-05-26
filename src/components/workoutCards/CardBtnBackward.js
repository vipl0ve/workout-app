import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CardBtnBackward = ({ onAction, disabled }) => {
	if (disabled) {
		return (
			<>
				<button
					type='button'
					className='btn btn-custom-color6 text-custom-color1'
					disabled
				>
					<FontAwesomeIcon icon={faBackward} onClick={onAction} />
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
					<FontAwesomeIcon icon={faBackward} onClick={onAction} />
				</button>
			</>
		)
	}
}

export default CardBtnBackward
