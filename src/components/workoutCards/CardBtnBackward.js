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
					onClick={onAction}
					disabled
				>
					<FontAwesomeIcon icon={faBackward} />
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
					<FontAwesomeIcon icon={faBackward} />
				</button>
			</>
		)
	}
}

export default CardBtnBackward
