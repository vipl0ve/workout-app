import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CardBtnVideo = ({ data, onAction }) => {
	if (data === '') {
		return (
			<button
				type='button'
				className='btn btn-custom-color6'
				onClick={onAction}
				disabled
			>
				<FontAwesomeIcon icon={faVideo} />
			</button>
		)
	} else {
		return (
			<button
				type='button'
				className='btn btn-custom-color6'
				onClick={onAction}
			>
				<FontAwesomeIcon icon={faVideo} />
			</button>
		)
	}
}

export default CardBtnVideo
