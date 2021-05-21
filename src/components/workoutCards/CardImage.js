import React from 'react'
import noImage from '../../asset/noImage.jpg'

const CardImage = ({ url, alt }) => {
	if (url === '') {
		return (
			<>
				<img src={noImage} className='card-img-top' alt={alt} />
			</>
		)
	} else {
		return (
			<>
				<img src={url} className='card-img-top' alt={alt} />
			</>
		)
	}
}

export default CardImage
