import React, { useEffect, useState } from 'react'
import PageHeader from '../layout/PageHeader'

const WorkoutAudio = ({
	Speak,
	speakSettings,
	nextStep,
	workoutProgress,
	setSpeakStatus,
	setSpeakSettings,
	setWorkoutProgress,
}) => {
	const [text, setText] = useState('I am a robot')
	const [pitch, setPitch] = useState(
		speakSettings.pitch ? speakSettings.pitch : 1
	)
	const [rate, setRate] = useState(speakSettings.rate ? speakSettings.rate : 1)
	const [voiceIndex, setVoiceIndex] = useState(
		speakSettings.voiceIndex ? speakSettings.voiceIndex : null
	)
	const [voice, SetVoice] = useState(Speak.voices[voiceIndex])
	const [audio, setAudio] = useState(false)

	useEffect(() => {
		SetVoice(Speak.voices[voiceIndex])
	}, [Speak.voices, voiceIndex])

	const enableAudio = (e) => {
		setAudio(true)
	}

	const disableAudio = (e) => {
		setAudio(false)
		setSpeakStatus(false)
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			speakStatus: false,
			updatedDate: Date.now(),
		})
		nextStep()
	}

	const saveAudioSettings = (e) => {
		setSpeakStatus(true)
		setSpeakSettings({
			audio,
			rate,
			pitch,
			voiceIndex,
		})
		setWorkoutProgress({
			...workoutProgress,
			status: true,
			loaded: false,
			speakStatus: true,
			updatedDate: Date.now(),
		})
		nextStep()
	}

	return (
		<div className='maincontainer container py-3 d-flex flex-column justify-content-start'>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header d-flex flex-row justify-content-between align-items-start bg-transparent border-custom-color4 p-2'>
					<PageHeader text='Exercise Audio' />
				</div>
				{/* If Browser don't support Speech */}
				{!Speak.supported && (
					<>
						<div className='card-body'>
							<p className='text-justify card-text'>
								Oh no, it looks like your browser doesn&#39;t support Speech
								Synthesis.
							</p>
							<button
								className='btn btn-custom-color5 text-custom-color1'
								onClick={disableAudio}
							>
								Skip Settings
							</button>
						</div>
					</>
				)}
				{/* If Browser support Speech */}
				{Speak.supported && (
					<div className='card-body'>
						<p className='text-justify card-text'>{`Do you want to enable the audio during the workout?`}</p>
						<div className='d-flex justify-content-around align-items-center'>
							<button
								className='btn btn-custom-color5 text-custom-color1'
								onClick={enableAudio}
							>
								Yes
							</button>
							<button
								className='btn btn-custom-color5 text-custom-color1'
								onClick={disableAudio}
							>
								No
							</button>
						</div>
						{audio && (
							<form>
								<h5 className='text-center mt-3'>Audio Settings</h5>
								<div className='form-group mb-2'>
									<div className='input-group col-12'>
										<span className='input-group-text col-4 bg-custom-color4 border-custom-color3 text-custom-color1'>
											Select Voice
										</span>
										<select
											id='voice'
											name='voice'
											className='form-control bg-custom-color2 border-custom-color3 text-custom-color6'
											required
											value={voiceIndex || ''}
											onChange={(event) => {
												setVoiceIndex(event.target.value)
											}}
										>
											<option value=''>Default</option>
											{Speak.voices.map((option, index) => (
												<option key={option.voiceURI} value={index}>
													{`${option.lang} - ${option.name}`}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className='form-group mb-2'>
									<div className='input-group col-12'>
										<span className='input-group-text col-2 bg-custom-color4 border-custom-color3 text-custom-color1'>
											Rate:
										</span>
										<span className='input-group-text col-2 bg-custom-color4 border-custom-color3 text-custom-color1'>
											<b>{rate}</b>
										</span>
										<input
											type='range'
											min='0.5'
											max='2'
											defaultValue='1'
											step='0.1'
											id='rate'
											className='form-control bg-custom-color2 border-custom-color3 text-custom-color6'
											required
											onChange={(event) => {
												setRate(event.target.value)
											}}
										/>
									</div>
								</div>
								<div className='form-group mb-2'>
									<div className='input-group col-12'>
										<span className='input-group-text col-2 bg-custom-color4 border-custom-color3 text-custom-color1'>
											Pitch
										</span>
										<span className='input-group-text col-2 bg-custom-color4 border-custom-color3 text-custom-color1'>
											<b>{pitch}</b>
										</span>
										<input
											type='range'
											min='0'
											max='2'
											defaultValue='1'
											step='0.1'
											id='pitch'
											className='form-control bg-custom-color2 border-custom-color3 text-custom-color6'
											required
											onChange={(event) => {
												setPitch(event.target.value)
											}}
										/>
									</div>
								</div>
								<div className='form-group mb-2'>
									<div className='input-group col-12'>
										<span className='input-group-text col-4 bg-custom-color4 border-custom-color3 text-custom-color1'>
											Message
										</span>
										<textarea
											id='message'
											name='message'
											rows={3}
											value={text}
											className='form-control bg-custom-color2 border-custom-color3 text-custom-color6'
											onChange={(event) => {
												setText(event.target.value)
											}}
										/>
									</div>
								</div>
								<div className='d-flex justify-content-around align-items-center'>
									{Speak.speaking ? (
										<button
											type='button'
											className='btn btn-custom-color5 text-custom-color1'
											onClick={Speak.cancel}
										>
											Stop
										</button>
									) : (
										<button
											type='button'
											className='btn btn-custom-color5 text-custom-color1'
											onClick={() => Speak.speak({ text, voice, rate, pitch })}
										>
											Try Audio
										</button>
									)}
									<button
										type='button'
										className='btn btn-custom-color5 text-custom-color1'
										onClick={saveAudioSettings}
									>
										Confirm Audio
									</button>
								</div>
							</form>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default WorkoutAudio
