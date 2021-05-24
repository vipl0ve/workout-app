import moment from 'moment'
import React from 'react'

const AnnouncementItem = ({ title, date, para, small }) => {
	const momentDate = moment(date, 'MM-DD-YYYY')

	return (
		<>
			<div className='d-flex w-100 justify-content-between'>
				<h6 className='mb-1 fs-6'>{title}</h6>
				<small className='text-muted'>{momentDate.fromNow()}</small>
			</div>
			<p className='mb-1'>{para}</p>
			<small className='text-muted'>{small}</small>
			<hr />
		</>
	)
}

export default AnnouncementItem
