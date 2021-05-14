import React, { useState } from 'react'
import Routine from './Routine'
import { routines } from '../../data/exercise.json'

const Routines = () => {
	const [routinesData] = useState(routines)
	return (
		<div>
			{routinesData.map((item) => (
				<Routine key={item.id} data={item} />
			))}
		</div>
	)
}

export default Routines
