import moment from 'moment'

export function pad(num, size) {
	var s = '000000000' + num
	return s.substr(s.length - size)
}

export function secondFormatted(duration) {
	var timer = moment()
		.startOf('day')
		.add(duration, 'seconds')
		.format('HH:mm:ss')
	return timer
}

export function getQty(qtyData) {
	const regex = /\d+/g
	const newQtyData = qtyData
		.match(regex)
		.map((element) => parseInt(element.trim()))
	return newQtyData
}

export function findMaxId(data) {
	const maxId = Math.max(...data.map((item) => item.id))
	return maxId
}
