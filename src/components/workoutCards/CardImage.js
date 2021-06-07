import React from 'react'
import noImage from '../../asset/noImage.jpg'

const CardImage = ({ url, alt }) => {
	if (url === '') {
		return (
			<>
				<div style={{ overflow: 'hidden' }}>
					<img
						src={noImage}
						style={{
							height: '45vh',
							width: 'auto',
							maxHeight: '45vh',
							maxWidth: '90vw',
							boxShadow: '10px 10px 5px grey',
						}}
						className='card-img-top rounded mx-auto d-block mt-3'
						alt={alt}
					/>
				</div>
			</>
		)
	} else {
		return (
			<>
				<div style={{ overflow: 'hidden' }}>
					<img
						src={url}
						style={{
							height: '45vh',
							width: 'auto',
							maxHeight: '45vh',
							maxWidth: '90vw',
							boxShadow: '5px 5px 10px grey',
						}}
						className='card-img-top rounded mx-auto d-block mt-3'
						alt={alt}
					/>
				</div>
			</>
		)
	}
}

export default CardImage
