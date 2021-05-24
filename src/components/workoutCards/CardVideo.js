import React from 'react'

const procesURL = (data) => {
	var newurl,
		r,
		rx =
			// eslint-disable-next-line no-useless-escape
			/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/

	r = data.match(rx)
	newurl = 'https://www.youtube.com/embed/' + r[1]
	//console.log(newurl)
	return newurl
}

const CardVideo = ({ url }) => {
	return (
		<>
			<div className='mt-3'>
				<iframe
					src={procesURL(url)}
					width='auto'
					height='200vh'
					frameBorder='0'
					allow='autoplay; encrypted-media'
					allowFullScreen
					title='video'
				/>
			</div>
		</>
	)
}

export default CardVideo
