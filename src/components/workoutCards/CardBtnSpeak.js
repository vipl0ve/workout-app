import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

const CardBtnSpeak = ({ speakStatus, setSpeakStatus, isBtn }) => {
	if (isBtn) {
		return (
			<>
				<button
					type='button'
					className='btn btn-custom-color6 text-custom-color1'
					onClick={() => setSpeakStatus(!speakStatus)}
				>
					{speakStatus ? (
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
					{speakStatus ? (
						<FontAwesomeIcon
							icon={faVolumeUp}
							onClick={() => setSpeakStatus(!speakStatus)}
						/>
					) : (
						<FontAwesomeIcon
							icon={faVolumeMute}
							onClick={() => setSpeakStatus(!speakStatus)}
						/>
					)}
				</span>
			</>
		)
	}
}

export default CardBtnSpeak
