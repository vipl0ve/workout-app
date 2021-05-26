const Speak = (data) => {
	const text = data.text ? data.text : ''
	const pitch = data.pitch ? parseInt(data.pitch) : 1 // 'pitch' min = '0' max = '2' defaultValue = '1' step = '0.1'
	const rate = data.rate ? parseInt(data.rate) : 1 // 'rate' min='0.5'	max = '2' defaultValue = '1' step = '0.1'
	// const voiceIndex = data.voiceIndex ? data.voiceIndex : 1

	// const getVoice = async (voiceIndex) => {
	// 	var voices = await window.speechSynthesis.getVoices()
	// 	var voice = {}
	// 	voice = voices[voiceIndex]
	// 	console.log(voices)
	// 	console.log(voice)
	// 	return voice
	// }

	if ('speechSynthesis' in window) {
		var to_speak = new SpeechSynthesisUtterance(text)
		//to_speak.voice = getVoice(voiceIndex)
		to_speak.pitch = pitch
		to_speak.rate = rate
		window.speechSynthesis.speak(to_speak)
	}
}

export default Speak
