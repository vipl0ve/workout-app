export function pad(num, size) {
	var s = '000000000' + num
	return s.substr(s.length - size)
}

export function getQty(qtyData) {
	const regex = /\d+/g
	const newQtyData = qtyData
		.match(regex)
		.map((element) => parseInt(element.trim()))
	return newQtyData
}
