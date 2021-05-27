import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

const CardBtnSpeak = ({ speak, setSpeakStatus, isBtn }) => {
	if (isBtn) {
		return (
			<>
				<button
					type='button'
					className='btn btn-custom-color6 text-custom-color1'
					onClick={() => setSpeakStatus(!speak)}
				>
					{speak ? (
						<FontAwesomeIcon icon={faVolumeUp} />
					) : (
						<FontAwesomeIcon icon={faVolumeMute} />
					)}
				</button>
			</>
		)
	} else {
		return (
			<>
				<span className='badge text-custom-color6'>
					{speak ? (
						<FontAwesomeIcon
							icon={faVolumeUp}
							onClick={() => setSpeakStatus(!speak)}
						/>
					) : (
						<FontAwesomeIcon
							icon={faVolumeMute}
							onClick={() => setSpeakStatus(!speak)}
						/>
					)}
				</span>
			</>
		)
	}
}

export default CardBtnSpeak
