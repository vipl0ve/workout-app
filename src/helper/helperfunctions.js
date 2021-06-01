import moment from 'moment'

export function pad(num, size) {
	var s = '000000000' + num
	return s.substr(s.length - size)
}

export function secondFormatted(duration, format) {
	var time
	if (format === undefined) {
		time = moment().startOf('day').add(duration, 'seconds').format('HH:mm:ss')
	} else {
		time = moment().startOf('day').add(duration, 'seconds').format(format)
	}
	return time
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

export function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
