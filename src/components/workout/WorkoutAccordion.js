import React from 'react'
import BasicExercise from '../exercise/BasicExercise'
import ProgressionExercise from '../exercise/ProgressionExercise'
import SettingExercise from '../exercise/SettingExercise'

const WorkoutAccordion = ({
	id,
	name,
	data,
	type,
	changeQty,
	changeCurProgression,
}) => {
	switch (type) {
		case 'Basic':
			return (
				<div>
					<div className='accordion-item'>
						<h2 className='accordion-header' id={'heading' + id}>
							<button
								className='accordion-button accordion-color-custom-color5 bg-custom-color3 text-custom-color5 collapsed'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target={'#collapse' + id}
								aria-expanded='false'
								aria-controls={'collapse' + id}
							>
								{name}
								<span className='badge bg-custom-color5 text-custom-color1 ms-3'>
									{data.length}
								</span>
							</button>
						</h2>
						<div
							id={'collapse' + id}
							className='accordion-collapse collapse'
							aria-labelledby={'heading' + id}
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body bg-custom-color1 border border-custom-color3 px-2'>
								<ul className='list-group'>
									{data.map((item) => (
										<BasicExercise
											key={item.id}
											data={item}
											changeQty={changeQty}
										/>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)
		case 'Progressive':
			return (
				<div>
					<div className='accordion-item'>
						<h2 className='accordion-header' id={'heading' + id}>
							<button
								className='accordion-button bg-custom-color3 text-custom-color5 collapsed'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target={'#collapse' + id}
								aria-expanded='false'
								aria-controls={'collapse' + id}
							>
								{name}
								<span className='badge bg-custom-color5 text-custom-color1 ms-3'>
									{data.length}
								</span>
							</button>
						</h2>
						<div
							id={'collapse' + id}
							className='accordion-collapse collapse'
							aria-labelledby={'heading' + id}
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body bg-custom-color1 border border-custom-color3 px-2'>
								<ul className='list-group'>
									{data.map((item) => (
										<ProgressionExercise
											key={item.id}
											data={item}
											changeCurProgression={changeCurProgression}
										/>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)

		case 'Settings':
			return (
				<div>
					<div className='accordion-item'>
						<h2 className='accordion-header' id={'heading' + id}>
							<button
								className='accordion-button bg-custom-color3 text-custom-color5 collapsed'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target={'#collapse' + id}
								aria-expanded='false'
								aria-controls={'collapse' + id}
							>
								{name}
								<span className='badge bg-custom-color5 text-custom-color1 ms-3'>
									{data.length}
								</span>
							</button>
						</h2>
						<div
							id={'collapse' + id}
							className='accordion-collapse collapse'
							aria-labelledby={'heading' + id}
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body bg-custom-color1 border border-custom-color3 px-2'>
								<ul className='list-group'>
									{data.map(([key, value]) => (
										<SettingExercise key={key} keyname={key} data={value} />
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)

		default:
			return null
	}
}

export default WorkoutAccordion
