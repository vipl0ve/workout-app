import React, { useEffect, useState } from 'react'

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
	const [audioSettings, setAudioSettings] = useState(false)

	useEffect(() => {
		SetVoice(Speak.voices[voiceIndex])
	}, [Speak.voices, voiceIndex])

	const enableAudioSettings = (e) => {
		setAudioSettings(true)
	}

	const disableAudioSettings = (e) => {
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
		<div className='maincontainer container py-3 d-flex flex-column justify-content-center'>
			<div className='card text-center text-custom-color5 bg-custom-color2 border-custom-color4'>
				<div className='card-header bg-transparent border-custom-color4'>
					<h5 className='text-custom-color6'>Workout Audio</h5>
				</div>
				{/* If Browser don't support Speech */}
				{!Speak.supported && (
					<>
						<div className='card-body'>
							<p className='card-text text-justify'>
								Oh no, it looks like your browser doesn&#39;t support Speech
								Synthesis.
							</p>
							<button
								className='btn btn-custom-color5 text-custom-color1'
								onClick={disableAudioSettings}
							>
								Skip Settings
							</button>
						</div>
					</>
				)}
				{/* If Browser support Speech */}
				{Speak.supported && (
					<div className='card-body'>
						<p className='card-text text-center'>{`Do you want the audio to be enabled during the workout?`}</p>
						<div className='d-flex justify-content-around align-items-center'>
							<button
								className='btn btn-custom-color5 text-custom-color1'
								onClick={enableAudioSettings}
							>
								Yes
							</button>
							<button
								className='btn btn-custom-color5 text-custom-color1'
								onClick={disableAudioSettings}
							>
								No
							</button>
						</div>
						{audioSettings && (
							<form>
								<hr />
								<h5 className='text-center mt-3'>Settings</h5>
								<hr />
								<div className='form-group mb-2'>
									<div className='input-group col-12'>
										<span className='input-group-text col-4 bg-custom-color4 border-custom-color3 text-custom-color1 fs-6'>
											<small>Select Voice</small>
										</span>
										<select
											id='voice'
											name='voice'
											className='form-select small bg-custom-color2 border-custom-color3 text-custom-color6'
											required
											value={voiceIndex || ''}
											onChange={(event) => {
												setVoiceIndex(event.target.value)
											}}
										>
											<option value=''>Default</option>
											{Speak.voices.map((option, index) => (
												<option
													key={option.voiceURI}
													value={index}
													className='small'
												>
													{`${option.lang} - ${option.name}`}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className='form-group mb-2'>
									<div className='input-group col-12'>
										<span className='input-group-text col-2 bg-custom-color4 border-custom-color3 text-custom-color1'>
											<small>Rate</small>
										</span>
										<span className='input-group-text col-2 bg-custom-color4 border-custom-color3 text-custom-color1'>
											<small>
												<b>{rate}</b>
											</small>
										</span>
										<div className='input-group-text col-8 bg-custom-color2 border-custom-color3 text-custom-color6'>
											<input
												type='range'
												min='0.5'
												max='2'
												defaultValue='1'
												step='0.1'
												id='rate'
												className='form-range'
												required
												onChange={(event) => {
													setRate(event.target.value)
												}}
											/>
										</div>
									</div>
								</div>
								<div className='form-group mb-2'>
									<div className='input-group col-12'>
										<span className='input-group-text col-2 bg-custom-color4 border-custom-color3 text-custom-color1'>
											<small>Pitch</small>
										</span>
										<span className='input-group-text col-2 bg-custom-color4 border-custom-color3 text-custom-color1'>
											<small>
												<b>{pitch}</b>
											</small>
										</span>
										<div className='input-group-text col-8 bg-custom-color2 border-custom-color3 text-custom-color6'>
											<input
												type='range'
												min='0'
												max='2'
												defaultValue='1'
												step='0.1'
												id='pitch'
												className='form-range'
												required
												onChange={(event) => {
													setPitch(event.target.value)
												}}
											/>
										</div>
									</div>
								</div>
								<div className='form-group mb-2'>
									<div className='input-group col-12'>
										<span className='input-group-text col-4 bg-custom-color4 border-custom-color3 text-custom-color1'>
											<small>Message</small>
										</span>
										<textarea
											id='message'
											name='message'
											rows={2}
											value={text}
											className='form-control small text-center bg-custom-color2 border-custom-color3 text-custom-color6'
											onChange={(event) => {
												setText(event.target.value)
											}}
										/>
									</div>
								</div>
								<div className='d-flex justify-content-around align-items-center mt-3'>
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
