import React from 'react'
import noImage from '../../asset/noImage.jpg'

const CardImage = ({ url, alt }) => {
	if (url === '') {
		return (
			<>
				<img
					src={noImage}
					style={{ maxWidth: '300px', height: 'auto' }}
					className='card-img-top rounded mx-auto d-block mt-3'
					alt={alt}
				/>
			</>
		)
	} else {
		return (
			<>
				<img
					src={url}
					style={{ maxWidth: '300px', height: 'auto' }}
					className='card-img-top rounded mx-auto d-block mt-3'
					alt={alt}
				/>
			</>
		)
	}
}

export default CardImage
