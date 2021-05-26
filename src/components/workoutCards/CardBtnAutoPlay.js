import React from 'react'
import Switch from 'react-switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

const CardBtnAutoPlay = ({ autoPlay, status, progression, onAction }) => {
	if (status) {
		return (
			<>
				<div className='d-flex justify-content-center align-items-start'>
					<label>
						<span className='text-custom-color6'>AutoPlay</span>
					</label>
					<Switch
						onChange={onAction}
						checked={autoPlay}
						disabled={!status}
						offColor='#ddb892'
						onColor='#9c6644'
						checkedIcon={
							<span
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
									fontSize: '0.8rem',
									paddingBottom: 2,
								}}
								className='text-custom-color1'
							>
								ON
							</span>
						}
						uncheckedIcon={
							<span
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
									fontSize: '0.8rem',
									paddingBottom: 2,
								}}
								className='text-custom-color6'
							>
								OFF
							</span>
						}
						checkedHandleIcon={
							<FontAwesomeIcon
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
									fontSize: '0.8rem',
									marginLeft: 7,
								}}
								icon={faPause}
							/>
						}
						uncheckedHandleIcon={
							<FontAwesomeIcon
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
									fontSize: '0.8rem',
									marginLeft: 7,
								}}
								icon={faPlay}
							/>
						}
						className='react-switch'
					/>
					{progression && (
						<>
							<br />
							<br />
						</>
					)}
				</div>
			</>
		)
	} else {
		return (
			<>
				<div className='d-flex justify-content-center align-items-start'>
					<label>
						<span className='text-muted'>No AutoPlay</span>
					</label>
					{progression && (
						<>
							<br />
							<br />
						</>
					)}
				</div>
			</>
		)
	}
}

export default CardBtnAutoPlay
