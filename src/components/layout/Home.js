import React from 'react'
import Stopwatch from '../utils/Stopwatch'

const Home = () => {
	return (
		<div className='container'>
			<p>This is home page</p>
			<Stopwatch data={'60'} />
		</div>
	)
}

export default Home
