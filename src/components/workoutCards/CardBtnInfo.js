import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CardBtnInfo = ({ data, onAction }) => {
	if (data === '') {
		return (
			<button
				type='button'
				className='btn btn-custom-color6 text-custom-color1'
				onClick={onAction}
				disabled
			>
				<FontAwesomeIcon icon={faInfo} />
			</button>
		)
	} else {
		return (
			<button
				type='button'
				className='btn btn-custom-color6 text-custom-color1'
				onClick={onAction}
			>
				<FontAwesomeIcon icon={faInfo} />
			</button>
		)
	}
}

export default CardBtnInfo
